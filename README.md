# 🏛️ AI Government Scheme Finder

A citizen-centric full-stack web platform built using **React, Vite, Tailwind CSS, Python Flask, and Google Gemini AI** that empowers Indian citizens to discover official government schemes tailored to their demographic profile.

---

## 🌟 Key Features

1. **100% Verified Official Sources Only**: Strictly enforces domain validation for `*.gov.in` and `*.nic.in` links. Automatically rejects blogs, news outlets, and unverified commercial links.
2. **Deterministic Eligibility Engine**: Evaluates hard criteria (Age bounds, Income caps, Occupation, Location, Gender, Category, Disability, Farmer status) deterministically in Python.
3. **Gemini AI Natural Language & Voice Search**: Accepts freeform voice or text prompts in **English, Telugu (తెలుగు), or Hindi (हिंदी)** and converts them into structured user profile parameters.
4. **Dynamic Deadline & Status Checker**: Dynamically checks application windows (`OPEN`, `CLOSED`, `NOT_YET_OPEN`, `DEADLINE_NOT_SPECIFIED`).
5. **Multilingual Support**: Real-time language selector for English, Telugu, and Hindi.
6. **7 Full Views + Dashboard**: Home, Find Schemes, Questionnaire Wizard, Results, Scheme Details, Saved Schemes, Dashboard Analytics, and About page.

---

## 📁 Repository Structure

```
government-scheme-finder/
├── backend/
│   ├── app.py                 # Main Flask REST API server
│   ├── config.py              # Configuration & domain whitelist settings
│   ├── requirements.txt       # Python dependencies
│   ├── database/
│   │   ├── seed_data.py       # Verified official Indian government schemes seed data
│   │   └── storage.py         # Storage manager (MongoDB with automatic JSON fallback)
│   ├── eligibility/
│   │   └── engine.py          # Deterministic Python eligibility rule engine
│   ├── validator/
│   │   └── source_validator.py# Domain security validator (*.gov.in / *.nic.in enforcement)
│   ├── deadline/
│   │   └── status_checker.py  # Application deadline & date status evaluator
│   ├── scraper/
│   │   └── gov_scraper.py     # Government portal HTTP live status verification module
│   ├── ai/
│   │   └── gemini_service.py  # Gemini AI NL parser & grounded match explainer
│   └── routes/
│       ├── profile_routes.py  # Profile & NL search API endpoints
│       ├── scheme_routes.py   # Scheme listing, detail, verify & stats endpoints
│       └── saved_routes.py    # Bookmark management endpoints
│
├── frontend/
│   ├── index.html             # HTML entry point with Google Fonts
│   ├── package.json           # Frontend dependencies (React, Vite, Lucide, Tailwind)
│   ├── vite.config.js         # Vite configuration & proxy settings
│   ├── tailwind.config.js     # Custom Indian Government color palette
│   └── src/
│       ├── main.jsx           # React DOM mount point
│       ├── App.jsx            # Router & Providers layout
│       ├── index.css          # Glassmorphism design system & micro-animations
│       ├── components/        # SchemeCard, StatusBadge, VoiceInput, Navbar, Footer
│       ├── pages/             # Home, FindSchemes, Questionnaire, Results, Details, Saved, Dashboard, About
│       ├── context/           # LanguageContext & ProfileContext
│       └── services/          # API REST client
│
├── .env.example
└── README.md
```

---

## 🚀 Quick Setup & How to Run

### 1. Backend Setup (Flask REST API)

```bash
cd backend

# Create virtual environment (optional but recommended)
python -m venv venv
# Windows:
venv\Scripts\activate

# Install requirements
pip install -r requirements.txt

# Start Flask server
python app.py
```
Backend runs at: `http://127.0.0.1:5000`

### 2. Frontend Setup (React Vite)

```bash
cd frontend

# Install Node modules
npm install

# Launch Vite Dev Server
npm run dev
```
Frontend runs at: `http://localhost:3000`

---

## 🛡️ Security & Source Policy

- **Allowed Domains**: `*.gov.in`, `*.nic.in`, `*.mygov.in`, `*.india.gov.in`
- **Rejection Policy**: If an official `.gov.in` / `.nic.in` link cannot be verified, the scheme is omitted from user results.

---

## 💖 Built for Citizens by Bujji & User
