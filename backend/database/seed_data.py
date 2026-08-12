"""
Official Verified Indian Government Schemes Seed Data.
All schemes strictly utilize *.gov.in or *.nic.in official domains.
"""

OFFICIAL_SCHEMES_DATA = [
    {
        "scheme_id": "SCH-GOV-001",
        "name": "Central Sector Scheme of Post Matric Scholarship for Students",
        "department": "Ministry of Social Justice & Empowerment / Ministry of Education",
        "category": "Education & Scholarship",
        "description": "Provides financial assistance to eligible economically weaker and category students pursuing higher education post 10th standard in recognized colleges and universities across India.",
        "benefits": [
            "Full tuition fee reimbursement up to ₹2,00,000/year",
            "Monthly maintenance allowance up to ₹1,200/month for hostellers",
            "Book grant allowance of ₹1,500/year"
        ],
        "eligibility_rules": {
            "min_age": 15,
            "max_age": 30,
            "max_income": 250000,
            "target_genders": ["All"],
            "target_states": ["All India"],
            "target_occupations": ["Student"],
            "required_student": True,
            "target_categories": ["SC", "ST", "OBC", "EWS", "General"]
        },
        "documents": [
            "Aadhaar Card",
            "Income Certificate issued by competent Revenue Authority",
            "Caste Certificate (if applicable)",
            "Previous Year Marksheet",
            "Bank Passbook linked with Aadhaar"
        ],
        "start_date": "2026-07-01",
        "last_date": "2026-10-31",
        "status": "OPEN",
        "official_source_url": "https://scholarships.gov.in",
        "official_apply_url": "https://scholarships.gov.in",
        "verified_at": "2026-08-12"
    },
    {
        "scheme_id": "SCH-GOV-002",
        "name": "Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)",
        "department": "Ministry of Agriculture & Farmers Welfare",
        "category": "Agriculture & Rural Development",
        "description": "Income support scheme providing ₹6,00,00 per year in three equal installments directly into bank accounts of landholding farmer families across India.",
        "benefits": [
            "Direct financial transfer of ₹6,000 per year in 3 equal installments of ₹2,000",
            "Direct Benefit Transfer (DBT) via Aadhaar-seeded bank account",
            "Coverage for small and marginal landholding farmers"
        ],
        "eligibility_rules": {
            "min_age": 18,
            "max_age": 80,
            "max_income": None,
            "target_genders": ["All"],
            "target_states": ["All India"],
            "target_occupations": ["Farmer", "Agriculture"],
            "farmer_required": True,
            "target_categories": ["ALL"]
        },
        "documents": [
            "Aadhaar Card",
            "Land ownership record documents (Khatoni/RoR)",
            "Active Savings Bank account details",
            "Mobile number registered with Aadhaar"
        ],
        "start_date": "2026-01-01",
        "last_date": None,
        "status": "OPEN",
        "official_source_url": "https://pmkisan.gov.in",
        "official_apply_url": "https://pmkisan.gov.in",
        "verified_at": "2026-08-12"
    },
    {
        "scheme_id": "SCH-GOV-003",
        "name": "Pradhan Mantri Mudra Yojana (PMMY - Shishu, Kishor, Tarun)",
        "department": "Department of Financial Services, Ministry of Finance",
        "category": "Business & Entrepreneurship",
        "description": "Provides collateral-free institutional loans up to ₹10 Lakhs to micro/small business enterprises and non-farm entrepreneurs.",
        "benefits": [
            "Shishu Loans: Up to ₹50,000 for early stage start-ups",
            "Kishor Loans: ₹50,000 to ₹5,00,000 for established small businesses",
            "Tarun Loans: ₹5,00,000 to ₹10,00,000 for expansion",
            "Zero collateral requirement"
        ],
        "eligibility_rules": {
            "min_age": 18,
            "max_age": 65,
            "max_income": None,
            "target_genders": ["All"],
            "target_states": ["All India"],
            "target_occupations": ["Self-Employed", "Business", "Entrepreneur", "Trader", "Artisan"],
            "target_categories": ["ALL"]
        },
        "documents": [
            "Proof of Identity (Aadhaar / Voter ID / PAN)",
            "Proof of Residence",
            "Business Plan / Proposal details",
            "Quotation of machinery/equipment to be purchased",
            "Applicant recent passport photographs"
        ],
        "start_date": "2026-01-01",
        "last_date": None,
        "status": "OPEN",
        "official_source_url": "https://www.myscheme.gov.in/schemes/pmmy",
        "official_apply_url": "https://www.myscheme.gov.in/schemes/pmmy",
        "verified_at": "2026-08-12"
    },
    {
        "scheme_id": "SCH-GOV-004",
        "name": "Sukanya Samriddhi Yojana (SSY)",
        "department": "Ministry of Women and Child Development / Department of Posts",
        "category": "Women & Child Welfare",
        "description": "A government-backed small deposit savings scheme aimed at building a financial reserve for the higher education and marriage expenses of girl children.",
        "benefits": [
            "High guaranteed interest rate (currently 8.2% per annum)",
            "Section 80C Tax exemption benefits up to ₹1.5 Lakh per year",
            "Account maturity after 21 years or upon marriage after age 18"
        ],
        "eligibility_rules": {
            "min_age": 0,
            "max_age": 10,
            "max_income": None,
            "target_genders": ["Female"],
            "target_states": ["All India"],
            "target_occupations": ["All"],
            "target_categories": ["ALL"]
        },
        "documents": [
            "Birth Certificate of the girl child",
            "Identity and Address Proof of parent/guardian (Aadhaar/PAN)",
            "Passport size photos of guardian and child"
        ],
        "start_date": "2026-01-01",
        "last_date": None,
        "status": "OPEN",
        "official_source_url": "https://www.myscheme.gov.in/schemes/ssy",
        "official_apply_url": "https://www.indiapost.gov.in",
        "verified_at": "2026-08-12"
    },
    {
        "scheme_id": "SCH-GOV-005",
        "name": "Jagananna Vidya Deevena (AP Full Fee Reimbursement)",
        "department": "Higher Education Department, Government of Andhra Pradesh",
        "category": "Education & State Schemes",
        "description": "Provides 100% tuition fee reimbursement to ITI, Polytechnic, Degree, B.Tech, and Post-Graduate students belonging to low-income families in Andhra Pradesh.",
        "benefits": [
            "Complete 100% tuition fee reimbursement",
            "Direct quarterly credit to mother's bank account",
            "Covers professional courses including Engineering, Medicine, and Management"
        ],
        "eligibility_rules": {
            "min_age": 15,
            "max_age": 28,
            "max_income": 250000,
            "target_genders": ["All"],
            "target_states": ["Andhra Pradesh"],
            "target_occupations": ["Student"],
            "required_student": True,
            "target_categories": ["SC", "ST", "BC", "EWS", "Kapunadu", "Minority"]
        },
        "documents": [
            "Rice Card / Integrated Income Certificate",
            "Caste Certificate issued by Meeseva / AP Revenue",
            "College Bonafide Certificate and Fee Structure",
            "Mother's Aadhaar Card and Bank Account details"
        ],
        "start_date": "2026-06-01",
        "last_date": "2026-11-30",
        "status": "OPEN",
        "official_source_url": "https://jnanabhumi.ap.gov.in",
        "official_apply_url": "https://jnanabhumi.ap.gov.in",
        "verified_at": "2026-08-12"
    },
    {
        "scheme_id": "SCH-GOV-006",
        "name": "Ayushman Bharat PM-JAY (Pradhan Mantri Jan Arogya Yojana)",
        "department": "National Health Authority, Ministry of Health and Family Welfare",
        "category": "Health & Social Security",
        "description": "World's largest health assurance scheme providing cashless secondary and tertiary hospitalization coverage up to ₹5 Lakh per family per year.",
        "benefits": [
            "Cashless coverage up to ₹5,00,000 per family per year",
            "Covers pre-hospitalization (3 days) and post-hospitalization (15 days)",
            "Valid across all empaneled public and private hospitals in India"
        ],
        "eligibility_rules": {
            "min_age": 0,
            "max_age": 100,
            "max_income": 180000,
            "target_genders": ["All"],
            "target_states": ["All India"],
            "target_occupations": ["All"],
            "target_categories": ["ALL"]
        },
        "documents": [
            "Aadhaar Card",
            "Ration Card / SECC 2011 listing record",
            "Mobile number"
        ],
        "start_date": "2026-01-01",
        "last_date": None,
        "status": "OPEN",
        "official_source_url": "https://pmjay.gov.in",
        "official_apply_url": "https://beneficiary.nha.gov.in",
        "verified_at": "2026-08-12"
    },
    {
        "scheme_id": "SCH-GOV-007",
        "name": "Pradhan Mantri Awas Yojana - Urban (PMAY-U 2.0)",
        "department": "Ministry of Housing and Urban Affairs",
        "category": "Housing & Infrastructure",
        "description": "Provides financial subsidy and interest subsidy for purchasing, constructing, or enhancing pucca houses for Economically Weaker Sections (EWS) and Low Income Groups (LIG).",
        "benefits": [
            "Direct central assistance up to ₹2.5 Lakh per eligible household",
            "Interest subsidy on home loans under Credit Linked Subsidy Scheme (CLSS)",
            "Special preference for female head of household ownership"
        ],
        "eligibility_rules": {
            "min_age": 21,
            "max_age": 70,
            "max_income": 300000,
            "target_genders": ["All"],
            "target_states": ["All India"],
            "target_occupations": ["All"],
            "target_categories": ["ALL"]
        },
        "documents": [
            "Aadhaar Card of all family members",
            "Income proof (Salary slip / Income Certificate)",
            "Affidavit stating non-ownership of any pucca house in India",
            "Land / Property ownership documents"
        ],
        "start_date": "2026-01-01",
        "last_date": "2026-12-31",
        "status": "OPEN",
        "official_source_url": "https://pmaymis.gov.in",
        "official_apply_url": "https://pmaymis.gov.in",
        "verified_at": "2026-08-12"
    },
    {
        "scheme_id": "SCH-GOV-008",
        "name": "National Means-cum-Merit Scholarship Scheme (NMMSS)",
        "department": "Department of School Education & Literacy, Ministry of Education",
        "category": "Education & Scholarship",
        "description": "Awarded to meritorious students of Class VIII to prevent dropout and encourage them to continue secondary education up to Class XII.",
        "benefits": [
            "Scholarship amount of ₹12,000 per annum (₹1,000 per month)",
            "Direct disbursement into student bank accounts via SBI / Public Sector Banks"
        ],
        "eligibility_rules": {
            "min_age": 12,
            "max_age": 16,
            "max_income": 350000,
            "target_genders": ["All"],
            "target_states": ["All India"],
            "target_occupations": ["Student"],
            "required_student": True,
            "target_categories": ["ALL"]
        },
        "documents": [
            "Class 7 marksheet (Minimum 55% marks required)",
            "Parental Income Certificate",
            "Aadhaar Card linked to Bank Account"
        ],
        "start_date": "2026-08-01",
        "last_date": "2026-11-15",
        "status": "OPEN",
        "official_source_url": "https://scholarships.gov.in",
        "official_apply_url": "https://scholarships.gov.in",
        "verified_at": "2026-08-12"
    }
]
