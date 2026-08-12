class EligibilityEngine:
    """
    Deterministic Python Rule-Based Eligibility Engine.
    Evaluates hard demographic, financial, and occupational conditions against official scheme rules.
    """

    @classmethod
    def evaluate(cls, user_profile: dict, scheme: dict) -> dict:
        """
        Compares user_profile against scheme criteria.
        Returns match score (0-100), boolean eligible flag, matched_conditions, failed_conditions, unknown_conditions.
        """
        rules = scheme.get("eligibility_rules", {})
        
        matched_conditions = []
        failed_conditions = []
        unknown_conditions = []
        
        score_weight = 0
        max_weight = 0

        # 1. AGE CHECK
        user_age = user_profile.get("age")
        min_age = rules.get("min_age")
        max_age = rules.get("max_age")

        if min_age is not None or max_age is not None:
            max_weight += 20
            if user_age is None or user_age == "" or user_age == 0:
                unknown_conditions.append("Age required to verify eligibility.")
            else:
                user_age = int(user_age)
                valid_min = True if min_age is None else (user_age >= int(min_age))
                valid_max = True if max_age is None else (user_age <= int(max_age))
                
                if valid_min and valid_max:
                    score_weight += 20
                    range_str = f"{min_age or 0}–{max_age or 'No upper limit'}"
                    matched_conditions.append(f"Age {user_age} falls within scheme requirement ({range_str} years)")
                else:
                    range_str = f"{min_age or 0}–{max_age or 'No upper limit'}"
                    failed_conditions.append(f"Age {user_age} does not meet required range ({range_str} years)")

        # 2. INCOME CHECK
        user_income = user_profile.get("income")
        max_income = rules.get("max_income")

        if max_income is not None:
            max_weight += 25
            if user_income is None or user_income == "":
                unknown_conditions.append("Family annual income details missing.")
            else:
                user_income = float(user_income)
                max_income = float(max_income)
                if user_income <= max_income:
                    score_weight += 25
                    matched_conditions.append(f"Annual family income ₹{user_income:,.0f} is within maximum limit (<= ₹{max_income:,.0f})")
                else:
                    failed_conditions.append(f"Annual family income ₹{user_income:,.0f} exceeds scheme ceiling limit of ₹{max_income:,.0f}")

        # 3. GENDER CHECK
        user_gender = (user_profile.get("gender") or "All").capitalize()
        target_genders = rules.get("target_genders", ["All"])

        if target_genders and "All" not in target_genders:
            max_weight += 15
            if user_gender in target_genders or "All" in target_genders:
                score_weight += 15
                matched_conditions.append(f"Gender ({user_gender}) matches eligible target group")
            else:
                failed_conditions.append(f"Scheme is restricted to {', '.join(target_genders)}")

        # 4. STATE & LOCATION CHECK
        user_state = (user_profile.get("state") or "").strip().lower()
        target_states = [s.strip().lower() for s in rules.get("target_states", ["All India"])]

        max_weight += 15
        if "all india" in target_states or "all" in target_states or not user_state:
            score_weight += 15
            matched_conditions.append("Available for citizens nationwide across India")
        elif any(user_state == ts or ts in user_state for ts in target_states):
            score_weight += 15
            matched_conditions.append(f"State location ({user_profile.get('state')}) matches scheme coverage area")
        else:
            failed_conditions.append(f"Scheme is restricted to {', '.join(rules.get('target_states', []))}")

        # 5. OCCUPATION / STUDENT CHECK
        user_occ = (user_profile.get("occupation") or "").lower()
        user_is_student = user_profile.get("student_status", False)
        target_occs = [o.lower() for o in rules.get("target_occupations", ["All"])]
        req_student = rules.get("required_student", None)

        if req_student is True:
            max_weight += 15
            if user_is_student or "student" in user_occ:
                score_weight += 15
                matched_conditions.append("Verified student status matches education requirement")
            else:
                failed_conditions.append("Requires active student enrollment status")
        elif "all" not in target_occs:
            max_weight += 15
            if any(to in user_occ for to in target_occs) or (user_is_student and "student" in target_occs):
                score_weight += 15
                matched_conditions.append(f"Occupation ({user_profile.get('occupation')}) aligns with target group")
            else:
                failed_conditions.append(f"Targeted at occupations: {', '.join(rules.get('target_occupations', []))}")

        # 6. CATEGORY CHECK (SC / ST / OBC / General / EWS)
        user_category = (user_profile.get("category") or "General").upper()
        target_categories = [c.upper() for c in rules.get("target_categories", ["ALL"])]

        if "ALL" not in target_categories:
            max_weight += 10
            if user_category in target_categories:
                score_weight += 10
                matched_conditions.append(f"Category ({user_category}) matches eligible reservation quota")
            else:
                failed_conditions.append(f"Category {user_category} does not match targeted quotas ({', '.join(target_categories)})")

        # 7. SPECIAL CONDITIONS (Farmer, Disability)
        if rules.get("farmer_required") is True:
            max_weight += 10
            if user_profile.get("farmer_status"):
                score_weight += 10
                matched_conditions.append("Farmer / Agricultural status verified")
            else:
                failed_conditions.append("Requires landholding farmer status")

        if rules.get("disability_required") is True:
            max_weight += 10
            if user_profile.get("disability_status"):
                score_weight += 10
                matched_conditions.append("Person with Benchmark Disability (PwD) criteria met")
            else:
                failed_conditions.append("Requires PwD (Disability) certification")

        # CALCULATE FINAL SCORE
        if max_weight == 0:
            match_score = 100
        else:
            match_score = int(round((score_weight / max_weight) * 100))

        # Hard eligibility rule: if any explicit rule failed, eligible = False
        is_eligible = len(failed_conditions) == 0

        # Adjust score if failed
        if not is_eligible:
            match_score = min(match_score, 45)

        return {
            "eligible": is_eligible,
            "match_score": match_score,
            "matched_conditions": matched_conditions,
            "failed_conditions": failed_conditions,
            "unknown_conditions": unknown_conditions
        }
