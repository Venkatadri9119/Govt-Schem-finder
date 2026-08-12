from flask import Blueprint, request, jsonify
from database.storage import storage
from ai.gemini_service import GeminiService
from eligibility.engine import EligibilityEngine
from validator.source_validator import SourceValidator

profile_bp = Blueprint("profile", __name__)

@profile_bp.route("/api/profile", methods=["POST"])
def update_profile():
    try:
        data = request.json or {}
        user_id = data.get("user_id", "default_user")
        
        profile = {
            "user_id": user_id,
            "age": int(data.get("age", 21)) if data.get("age") else None,
            "gender": data.get("gender", "All"),
            "state": data.get("state", "All India"),
            "district": data.get("district", ""),
            "occupation": data.get("occupation", "Student"),
            "student_status": bool(data.get("student_status", False)),
            "education_level": data.get("education_level", "Undergraduate"),
            "income": float(data.get("income", 200000)) if data.get("income") else None,
            "category": data.get("category", "General"),
            "disability_status": bool(data.get("disability_status", False)),
            "farmer_status": bool(data.get("farmer_status", False)),
            "business_status": bool(data.get("business_status", False))
        }

        saved_profile = storage.save_user_profile(profile)
        return jsonify({"success": True, "profile": saved_profile}), 200

    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 400

@profile_bp.route("/api/natural-language-search", methods=["POST"])
def natural_language_search():
    try:
        data = request.json or {}
        query_text = data.get("query", "")

        if not query_text:
            return jsonify({"success": False, "error": "Query text is required"}), 400

        # Step 1: Convert NL input to structured user profile
        parsed_profile = GeminiService.parse_natural_language_query(query_text)
        
        # Step 2: Retrieve all verified official schemes
        all_schemes = storage.get_all_schemes()
        official_schemes = SourceValidator.filter_official_schemes(all_schemes)

        # Step 3: Run Deterministic Eligibility Engine on each scheme
        results = []
        for scheme in official_schemes:
            eval_res = EligibilityEngine.evaluate(parsed_profile, scheme)
            
            # Generate AI Grounded Explanation
            explanation = GeminiService.generate_explanation(
                parsed_profile,
                scheme,
                eval_res["matched_conditions"],
                eval_res["failed_conditions"]
            )

            result_item = dict(scheme)
            result_item["eligibility_eval"] = eval_res
            result_item["match_score"] = eval_res["match_score"]
            result_item["is_eligible"] = eval_res["eligible"]
            result_item["explanation"] = explanation
            results.append(result_item)

        # Step 4: Rank results (Eligible first, then by match_score & status)
        results.sort(key=lambda x: (
            1 if x["is_eligible"] else 0,
            1 if x.get("status") == "OPEN" else 0,
            x["match_score"]
        ), reverse=True)

        return jsonify({
            "success": True,
            "parsed_profile": parsed_profile,
            "total_matches": len(results),
            "results": results
        }), 200

    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500
