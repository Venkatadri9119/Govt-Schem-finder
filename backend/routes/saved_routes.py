from flask import Blueprint, request, jsonify
from database.storage import storage

saved_bp = Blueprint("saved", __name__)

@saved_bp.route("/api/saved-schemes", methods=["GET"])
def get_saved():
    try:
        user_id = request.args.get("user_id", "default_user")
        schemes = storage.get_saved_schemes(user_id=user_id)
        return jsonify({"success": True, "count": len(schemes), "saved_schemes": schemes}), 200
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@saved_bp.route("/api/saved-schemes", methods=["POST"])
def toggle_save():
    try:
        data = request.json or {}
        scheme_id = data.get("scheme_id")
        user_id = data.get("user_id", "default_user")

        if not scheme_id:
            return jsonify({"success": False, "error": "scheme_id is required"}), 400

        is_now_saved = storage.toggle_saved_scheme(scheme_id, user_id=user_id)
        return jsonify({
            "success": True,
            "scheme_id": scheme_id,
            "is_saved": is_now_saved,
            "message": "Scheme bookmarked" if is_now_saved else "Scheme bookmark removed"
        }), 200

    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500
