import json
import os
from config import Config
from database.seed_data import OFFICIAL_SCHEMES_DATA
from validator.source_validator import SourceValidator
from deadline.status_checker import DeadlineChecker

class StorageManager:
    """
    Unified Storage Layer.
    Tries MongoDB connection first.
    Falls back gracefully to embedded JSON file database if MongoDB is not active.
    """

    def __init__(self):
        self.use_mongo = False
        self.db = None
        self.data_dir = os.path.join(os.path.dirname(__file__), "..", "data")
        os.makedirs(self.data_dir, exist_ok=True)
        
        self.schemes_file = os.path.join(self.data_dir, "schemes.json")
        self.saved_file = os.path.join(self.data_dir, "saved_schemes.json")
        self.profiles_file = os.path.join(self.data_dir, "profiles.json")

        self._init_db()

    def _init_db(self):
        """Initializes Mongo connection or JSON storage fallback."""
        try:
            from pymongo import MongoClient
            client = MongoClient(Config.MONGO_URI, serverSelectionTimeoutMS=1500)
            client.admin.command('ping')
            self.db = client[Config.DB_NAME]
            self.use_mongo = True
            print("[DATABASE]: Connected to MongoDB successfully.")
        except Exception as e:
            self.use_mongo = False
            print(f"[DATABASE]: MongoDB not available ({str(e)}). Using JSON file persistence layer.")

        # Seed data if empty
        self.seed_initial_schemes()

    def seed_initial_schemes(self):
        """Seeds initial verified official schemes."""
        verified_schemes = SourceValidator.filter_official_schemes(OFFICIAL_SCHEMES_DATA)

        if self.use_mongo:
            collection = self.db["schemes"]
            if collection.count_documents({}) == 0:
                collection.insert_many(verified_schemes)
                print(f"[DATABASE]: Seeded {len(verified_schemes)} official schemes to MongoDB.")
        else:
            if not os.path.exists(self.schemes_file) or os.path.getsize(self.schemes_file) == 0:
                with open(self.schemes_file, "w", encoding="utf-8") as f:
                    json.dump(verified_schemes, f, indent=2, ensure_ascii=False)
                print(f"[DATABASE]: Seeded {len(verified_schemes)} official schemes to JSON file.")

    def get_all_schemes(self) -> list:
        """Returns list of all verified schemes with evaluated statuses."""
        schemes = []
        if self.use_mongo:
            cursor = self.db["schemes"].find({}, {"_id": 0})
            schemes = list(cursor)
        else:
            if os.path.exists(self.schemes_file):
                with open(self.schemes_file, "r", encoding="utf-8") as f:
                    schemes = json.load(f)

        # Re-evaluate statuses dynamically
        for scheme in schemes:
            eval_res = DeadlineChecker.evaluate_status(
                scheme.get("start_date"),
                scheme.get("last_date")
            )
            scheme["status"] = eval_res["status"]
            scheme["status_label"] = eval_res["label"]
            scheme["badge_color"] = eval_res["badge_color"]
            scheme["formatted_last_date"] = eval_res["formatted_last_date"]
            scheme["days_remaining"] = eval_res["days_remaining"]

        return schemes

    def get_scheme_by_id(self, scheme_id: str) -> dict:
        """Finds scheme by scheme_id."""
        schemes = self.get_all_schemes()
        for s in schemes:
            if s.get("scheme_id") == scheme_id:
                return s
        return None

    def save_user_profile(self, profile: dict) -> dict:
        """Saves or updates user profile."""
        if self.use_mongo:
            self.db["profiles"].update_one(
                {"user_id": profile.get("user_id", "default_user")},
                {"$set": profile},
                upsert=True
            )
        else:
            profiles = []
            if os.path.exists(self.profiles_file):
                with open(self.profiles_file, "r", encoding="utf-8") as f:
                    try:
                        profiles = json.load(f)
                    except:
                        profiles = []
            
            # replace or append
            profiles = [p for p in profiles if p.get("user_id") != profile.get("user_id", "default_user")]
            profiles.append(profile)
            
            with open(self.profiles_file, "w", encoding="utf-8") as f:
                json.dump(profiles, f, indent=2)

        return profile

    def get_saved_schemes(self, user_id="default_user") -> list:
        """Retrieves list of scheme_ids saved by user."""
        if self.use_mongo:
            records = self.db["saved"].find({"user_id": user_id}, {"_id": 0})
            saved_ids = [r["scheme_id"] for r in records]
        else:
            if not os.path.exists(self.saved_file):
                return []
            with open(self.saved_file, "r", encoding="utf-8") as f:
                try:
                    records = json.load(f)
                    saved_ids = [r["scheme_id"] for r in records if r.get("user_id") == user_id]
                except:
                    saved_ids = []

        all_schemes = self.get_all_schemes()
        return [s for s in all_schemes if s.get("scheme_id") in saved_ids]

    def toggle_saved_scheme(self, scheme_id: str, user_id="default_user") -> bool:
        """Toggles bookmark for a scheme. Returns True if saved, False if removed."""
        if self.use_mongo:
            existing = self.db["saved"].find_one({"user_id": user_id, "scheme_id": scheme_id})
            if existing:
                self.db["saved"].delete_one({"user_id": user_id, "scheme_id": scheme_id})
                return False
            else:
                self.db["saved"].insert_one({"user_id": user_id, "scheme_id": scheme_id})
                return True
        else:
            records = []
            if os.path.exists(self.saved_file):
                with open(self.saved_file, "r", encoding="utf-8") as f:
                    try:
                        records = json.load(f)
                    except:
                        records = []
            
            is_saved = any(r.get("scheme_id") == scheme_id and r.get("user_id") == user_id for r in records)
            if is_saved:
                records = [r for r in records if not (r.get("scheme_id") == scheme_id and r.get("user_id") == user_id)]
                new_state = False
            else:
                records.append({"user_id": user_id, "scheme_id": scheme_id})
                new_state = True
            
            with open(self.saved_file, "w", encoding="utf-8") as f:
                json.dump(records, f, indent=2)
                
            return new_state

# Global singleton storage instance
storage = StorageManager()
