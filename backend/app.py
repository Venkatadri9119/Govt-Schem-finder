import os
from flask import Flask, jsonify, send_from_directory
from flask_cors import CORS
from config import Config
from routes.profile_routes import profile_bp
from routes.scheme_routes import scheme_bp
from routes.saved_routes import saved_bp

def create_app():
    dist_folder = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "frontend", "dist"))
    
    app = Flask(__name__, static_folder=dist_folder if os.path.exists(dist_folder) else None)
    app.config.from_object(Config)

    # Enable CORS
    CORS(app, resources={r"/api/*": {"origins": "*"}})

    # Register Blueprints
    app.register_blueprint(profile_bp)
    app.register_blueprint(scheme_bp)
    app.register_blueprint(saved_bp)

    @app.route("/api/health", methods=["GET"])
    def health_check():
        return jsonify({
            "status": "HEALTHY",
            "service": "AI Government Scheme Finder API",
            "version": "1.0.0",
            "security_policy": "Strict *.gov.in / *.nic.in Domain Verification Enabled"
        }), 200

    # Unified Production SPA Route Handler
    @app.route('/', defaults={'path': ''})
    @app.route('/<path:path>')
    def serve_frontend(path):
        if dist_folder and os.path.exists(dist_folder):
            file_path = os.path.join(dist_folder, path)
            if path != "" and os.path.exists(file_path):
                return send_from_directory(dist_folder, path)
            return send_from_directory(dist_folder, 'index.html')
        return jsonify({"error": "Frontend build not found. Run 'npm --prefix frontend run build' first."}), 404

    @app.errorhandler(500)
    def server_error(e):
        return jsonify({"error": "Internal server error"}), 500

    return app

if __name__ == "__main__":
    app = create_app()
    print(f"[SERVER]: AI Government Scheme Finder API running on http://127.0.0.1:{Config.PORT}")
    app.run(host="0.0.0.0", port=Config.PORT, debug=Config.DEBUG)
