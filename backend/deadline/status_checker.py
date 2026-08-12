from datetime import datetime, date

class DeadlineChecker:
    """
    Deadline & Application Status Checker Module.
    Evaluates application status dynamically based on current date and official scheme dates.
    """

    @staticmethod
    def parse_date(date_str: str):
        """Attempts to parse YYYY-MM-DD or return None."""
        if not date_str or not isinstance(date_str, str):
            return None
        date_str = date_str.strip()
        if date_str.lower() in ["none", "null", "n/a", "always open", "deadline not specified", ""]:
            return None
        
        for fmt in ("%Y-%m-%d", "%d-%m-%Y", "%d/%m/%Y", "%Y/%m/%d"):
            try:
                return datetime.strptime(date_str, fmt).date()
            except ValueError:
                continue
        return None

    @classmethod
    def evaluate_status(cls, start_date_str: str, last_date_str: str) -> dict:
        """
        Determines status: OPEN, CLOSED, NOT_YET_OPEN, or DEADLINE_NOT_SPECIFIED.
        Returns detailed status metadata.
        """
        today = date.today()
        start_dt = cls.parse_date(start_date_str)
        last_dt = cls.parse_date(last_date_str)

        if not last_dt and not start_dt:
            return {
                "status": "DEADLINE_NOT_SPECIFIED",
                "label": "Deadline Not Specified",
                "badge_color": "blue",
                "days_remaining": None,
                "formatted_last_date": "Always Open / Ongoing"
            }

        if start_dt and today < start_dt:
            days_until_open = (start_dt - today).days
            return {
                "status": "NOT_YET_OPEN",
                "label": "Not Yet Open",
                "badge_color": "yellow",
                "days_remaining": days_until_open,
                "formatted_last_date": start_dt.strftime("%d %B %Y")
            }

        if last_dt:
            if today > last_dt:
                return {
                    "status": "CLOSED",
                    "label": "Applications Closed",
                    "badge_color": "red",
                    "days_remaining": 0,
                    "formatted_last_date": last_dt.strftime("%d %B %Y")
                }
            else:
                days_left = (last_dt - today).days
                return {
                    "status": "OPEN",
                    "label": "Applications Open",
                    "badge_color": "green",
                    "days_remaining": days_left,
                    "formatted_last_date": last_dt.strftime("%d %B %Y")
                }

        # Fallback if only start date is past and last date isn't set
        return {
            "status": "OPEN",
            "label": "Applications Open",
            "badge_color": "green",
            "days_remaining": None,
            "formatted_last_date": "Ongoing"
        }
