import json
import re
from config import Config

class GeminiService:
    """
    AI Integration Layer using Google Gemini API.
    Handles Natural Language Input parsing, profile extraction, and grounded match explanations.
    Includes robust fallback regex parser when API key is unconfigured.
    """

    @classmethod
    def _init_gemini(cls):
        """Initializes google.generativeai if key present."""
        if Config.GEMINI_API_KEY:
            try:
                import google.generativeai as genai
                genai.configure(api_key=Config.GEMINI_API_KEY)
                return genai.GenerativeModel('gemini-1.5-flash')
            except Exception as e:
                print(f"[AI SERVICE]: Gemini initialization error: {e}")
        return None

    @classmethod
    def parse_natural_language_query(cls, text_query: str) -> dict:
        """
        Converts natural language input (English, Telugu, Hindi) into a structured user profile JSON.
        Example input: "I am a 21-year-old female student from Andhra Pradesh. My family income is ₹2 lakh per year."
        """
        if not text_query or not text_query.strip():
            return cls._get_default_profile()

        text_query = text_query.strip()
        model = cls._init_gemini()

        if model:
            prompt = f"""
            You are a strict data extraction assistant for an Indian Government Scheme Recommendation engine.
            Extract user profile information from the following user query text (which may be in English, Telugu, or Hindi).

            User Query: "{text_query}"

            Return ONLY a raw JSON object (no markdown, no extra text) with these exact keys:
            {{
              "age": integer or null,
              "gender": "Female" | "Male" | "Transgender" | "All",
              "state": string or "All India",
              "district": string or null,
              "occupation": string (e.g. "Student", "Farmer", "Self-Employed", "Unemployed"),
              "student_status": boolean,
              "education_level": string or null,
              "income": integer annual income in INR or null,
              "category": "SC" | "ST" | "OBC" | "EWS" | "General",
              "disability_status": boolean,
              "farmer_status": boolean,
              "business_status": boolean
            }}
            """
            try:
                response = model.generate_content(prompt)
                raw_text = response.text.strip()
                # Clean codeblock wrappers if any
                clean_json = re.sub(r"^```json\s*", "", raw_text)
                clean_json = re.sub(r"\s*```$", "", clean_json)
                parsed = json.loads(clean_json)
                print("[AI SERVICE]: Gemini parsed NL query successfully.")
                return parsed
            except Exception as e:
                print(f"[AI SERVICE]: Gemini parsing failed ({e}). Falling back to rule-based parser.")

        # Fallback Parser
        return cls._fallback_parse_query(text_query)

    @classmethod
    def _fallback_parse_query(cls, text: str) -> dict:
        """Regex rule-based heuristic parser for offline / keyless mode."""
        text_lower = text.lower()
        profile = cls._get_default_profile()

        # 1. AGE extraction (e.g., "21-year-old", "21 years old", "age 21")
        age_match = re.search(r'(\d{1,2})\s*(?:years|yr|-year|-yr|age)', text_lower)
        if age_match:
            profile["age"] = int(age_match.group(1))

        # 2. INCOME extraction (e.g., "2 lakh", "2,00,000", "200000", "200k")
        lakh_match = re.search(r'(\d+(?:\.\d+)?)\s*(?:lakh|lacs|lac|l)', text_lower)
        if lakh_match:
            profile["income"] = int(float(lakh_match.group(1)) * 100000)
        else:
            num_match = re.search(r'₹?\s*(\d{5,7})', text_lower)
            if num_match:
                profile["income"] = int(num_match.group(1))

        # 3. STUDENT STATUS & OCCUPATION
        if any(w in text_lower for w in ["student", "studying", "college", "school", "degree", "b.tech", "btech", "chadhuvutunnanu", "chaduvu"]):
            profile["student_status"] = True
            profile["occupation"] = "Student"
        elif any(w in text_lower for w in ["farmer", "raaitu", "rythu", "agriculture", "kisan"]):
            profile["farmer_status"] = True
            profile["occupation"] = "Farmer"
        elif any(w in text_lower for w in ["business", "shopkeeper", "trader", "vyapar"]):
            profile["business_status"] = True
            profile["occupation"] = "Business"

        # 4. GENDER
        if any(w in text_lower for w in ["female", "girl", "woman", "aada", "mahila"]):
            profile["gender"] = "Female"
        elif any(w in text_lower for w in ["male", "boy", "man", "abbayi", "purush"]):
            profile["gender"] = "Male"

        # 5. STATE
        if "andhra" in text_lower or "ap" in text_lower:
            profile["state"] = "Andhra Pradesh"
        elif "telangana" in text_lower or "tg" in text_lower or "ts" in text_lower:
            profile["state"] = "Telangana"
        elif "tamil nadu" in text_lower or "tn" in text_lower:
            profile["state"] = "Tamil Nadu"
        elif "maharashtra" in text_lower:
            profile["state"] = "Maharashtra"

        # 6. CATEGORY
        for cat in ["SC", "ST", "OBC", "EWS"]:
            if cat.lower() in text_lower:
                profile["category"] = cat
                break

        return profile

    @classmethod
    def _get_default_profile(cls) -> dict:
        return {
            "age": 21,
            "gender": "All",
            "state": "All India",
            "district": None,
            "occupation": "Student",
            "student_status": True,
            "education_level": "Undergraduate",
            "income": 200000,
            "category": "General",
            "disability_status": False,
            "farmer_status": False,
            "business_status": False
        }

    @classmethod
    def generate_explanation(cls, profile: dict, scheme: dict, matched_conds: list, failed_conds: list) -> str:
        """
        Generates grounded, citizen-friendly explanation of match.
        Strictly refrains from inventing facts or external deadlines.
        """
        if not matched_conds and failed_conds:
            return f"This scheme is currently not recommended for you because: {'; '.join(failed_conds)}."

        summary = f"Match Summary for {scheme.get('name')}:\n"
        if matched_conds:
            summary += "✓ Matched Conditions:\n" + "\n".join([f"  • {c}" for c in matched_conds]) + "\n"
        if failed_conds:
            summary += "✗ Unmet Conditions:\n" + "\n".join([f"  • {c}" for c in failed_conds]) + "\n"

        return summary
