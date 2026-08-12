from flask import Blueprint, request, jsonify
from database.storage import storage
from eligibility.engine import EligibilityEngine
from validator.source_validator import SourceValidator
from scraper.gov_scraper import GovScraper
from ai.gemini_service import GeminiService

scheme_bp = Blueprint("schemes", __name__)

@scheme_bp.route("/api/find-schemes", methods=["POST"])
def find_schemes():
    """Find schemes matching the explicit user profile provided."""
    try:
        user_profile = request.json or {}
        
        all_schemes = storage.get_all_schemes()
        official_schemes = SourceValidator.filter_official_schemes(all_schemes)

        results = []
        for scheme in official_schemes:
            eval_res = EligibilityEngine.evaluate(user_profile, scheme)
            explanation = GeminiService.generate_explanation(
                user_profile,
                scheme,
                eval_res["matched_conditions"],
                eval_res["failed_conditions"]
            )

            res = dict(scheme)
            res["eligibility_eval"] = eval_res
            res["match_score"] = eval_res["match_score"]
            res["is_eligible"] = eval_res["eligible"]
            res["explanation"] = explanation
            results.append(res)

        # Sorting: Eligible schemes first, then by match score
        results.sort(key=lambda x: (
            1 if x["is_eligible"] else 0,
            1 if x.get("status") == "OPEN" else 0,
            x["match_score"]
        ), reverse=True)

        return jsonify({
            "success": True,
            "count": len(results),
            "results": results
        }), 200

    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@scheme_bp.route("/api/schemes", methods=["GET"])
def get_schemes():
    """Retrieve all official schemes with optional category/state/search query filters."""
    try:
        category = request.args.get("category", "")
        state = request.args.get("state", "")
        query = request.args.get("query", "").lower()
        status_filter = request.args.get("status", "")

        schemes = storage.get_all_schemes()
        official_schemes = SourceValidator.filter_official_schemes(schemes)

        filtered = []
        for s in official_schemes:
            if category and s.get("category") != category:
                continue
            if status_filter and s.get("status") != status_filter:
                continue
            if state and state.lower() != "all" and state.lower() != "all india":
                target_states = [st.lower() for st in s.get("eligibility_rules", {}).get("target_states", [])]
                if "all india" not in target_states and state.lower() not in target_states:
                    continue
            if query:
                text_corpus = (s.get("name", "") + " " + s.get("description", "") + " " + s.get("department", "")).lower()
                if query not in text_corpus:
                    continue
            filtered.append(s)

        return jsonify({"success": True, "count": len(filtered), "schemes": filtered}), 200

    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@scheme_bp.route("/api/schemes/<scheme_id>", methods=["GET"])
def get_scheme_details(scheme_id):
    """Retrieve scheme detail view by ID."""
    scheme = storage.get_scheme_by_id(scheme_id)
    if not scheme:
        return jsonify({"success": False, "error": "Scheme not found"}), 404

    # Enforce source validation
    source_val = SourceValidator.validate_url(scheme.get("official_source_url"))
    apply_val = SourceValidator.validate_url(scheme.get("official_apply_url"))

    if not source_val["is_valid"] or not apply_val["is_valid"]:
        return jsonify({"success": False, "error": "Scheme source could not be verified against official government portals."}), 403

    return jsonify({"success": True, "scheme": scheme}), 200

@scheme_bp.route("/api/schemes/<scheme_id>/verify", methods=["GET"])
def live_verify_scheme(scheme_id):
    """Perform live HTTP verification check of the scheme's official URL."""
    scheme = storage.get_scheme_by_id(scheme_id)
    if not scheme:
        return jsonify({"success": False, "error": "Scheme not found"}), 404

    source_url = scheme.get("official_source_url", "")
    live_result = GovScraper.live_verify_url(source_url)

    return jsonify({
        "success": True,
        "scheme_id": scheme_id,
        "name": scheme.get("name"),
        "live_verification": live_result
    }), 200

@scheme_bp.route("/api/stats", methods=["GET"])
def get_dashboard_stats():
    """Retrieve aggregate statistics for the dashboard."""
    schemes = storage.get_all_schemes()
    official_schemes = SourceValidator.filter_official_schemes(schemes)

    total_schemes = len(official_schemes)
    open_schemes = sum(1 for s in official_schemes if s.get("status") == "OPEN")
    closing_soon = sum(1 for s in official_schemes if s.get("days_remaining") is not None and 0 < s.get("days_remaining") <= 30)
    
    categories = {}
    states = {}
    for s in official_schemes:
        cat = s.get("category", "General")
        categories[cat] = categories.get(cat, 0) + 1
        
        target_states = s.get("eligibility_rules", {}).get("target_states", ["All India"])
        for st in target_states:
            states[st] = states.get(st, 0) + 1

    return jsonify({
        "success": True,
        "stats": {
            "total_schemes": total_schemes,
            "open_schemes": open_schemes,
            "closing_soon": closing_soon,
            "verified_portals_count": total_schemes * 2, # source + apply urls
            "categories_distribution": categories,
            "state_wise_distribution": states
        }
    }), 200
