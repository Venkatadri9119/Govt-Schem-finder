import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    PORT = int(os.getenv("PORT", 5000))
    DEBUG = os.getenv("FLASK_DEBUG", "True").lower() in ["true", "1", "t"]
    SECRET_KEY = os.getenv("SECRET_KEY", "bujji-gov-scheme-secret-key-2026")
    
    # Official trusted domains regex/suffixes
    TRUSTED_DOMAINS = [
        "gov.in",
        "nic.in",
        "mygov.in",
        "india.gov.in",
        "myscheme.gov.in",
        "scholarships.gov.in",
        "pmkisan.gov.in",
        "tn.gov.in",
        "ap.gov.in",
        "telangana.gov.in",
        "up.gov.in",
        "maharashtra.gov.in",
        "karnataka.gov.in"
    ]

    GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")
    MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017/gov_scheme_db")
    DB_NAME = "gov_scheme_db"
