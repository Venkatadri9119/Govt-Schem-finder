import urllib.parse
import re
from config import Config

class SourceValidator:
    """
    Source Validation Module:
    Enforces strict rules to ensure all scheme sources and application URLs
    originate strictly from verified Indian Government domains (*.gov.in, *.nic.in).
    """

    ALLOWED_PATTERNS = [
        r"^([a-zA-Z0-9-]+\.)+gov\.in$",
        r"^([a-zA-Z0-9-]+\.)+nic\.in$",
        r"^([a-zA-Z0-9-]+\.)+mygov\.in$",
        r"^india\.gov\.in$",
        r"^([a-zA-Z0-9-]+\.)+india\.gov\.in$"
    ]

    BLOCKED_KEYWORDS = [
        "blog", "blogspot", "wordpress", "medium", "news", "timesofindia",
        "ndtv", "youtube", "facebook", "twitter", "instagram", "telegram",
        "sarkariyojana", "yojanalist", "schemeinfo", ".com", ".org", ".net", ".info"
    ]

    @classmethod
    def validate_url(cls, url: str) -> dict:
        """
        Validates if a given URL is from an official verified Indian government domain.
        Returns dict with is_valid (bool), domain (str), reason (str).
        """
        if not url or not isinstance(url, str):
            return {
                "is_valid": False,
                "reason": "URL is empty or invalid type.",
                "domain": None,
                "clean_url": None
            }

        url = url.strip()
        if not (url.startswith("http://") or url.startswith("https://")):
            url = "https://" + url

        try:
            parsed = urllib.parse.urlparse(url)
            hostname = parsed.hostname.lower() if parsed.hostname else ""

            # Check if domain matches official patterns
            is_official = False
            for pattern in cls.ALLOWED_PATTERNS:
                if re.match(pattern, hostname):
                    is_official = True
                    break

            # Explicit check against trusted domain list from config
            if not is_official:
                for domain in Config.TRUSTED_DOMAINS:
                    if hostname == domain or hostname.endswith("." + domain):
                        is_official = True
                        break

            # Check for blocked non-gov extensions/keywords
            for keyword in cls.BLOCKED_KEYWORDS:
                if keyword in hostname and not hostname.endswith(".gov.in") and not hostname.endswith(".nic.in"):
                    return {
                        "is_valid": False,
                        "reason": f"Source rejected: contains unauthorized domain or blog keyword '{keyword}'.",
                        "domain": hostname,
                        "clean_url": None
                    }

            if not is_official:
                return {
                    "is_valid": False,
                    "reason": f"Source domain '{hostname}' is not a verified government domain (*.gov.in / *.nic.in).",
                    "domain": hostname,
                    "clean_url": None
                }

            # Return sanitized URL
            clean_url = urllib.parse.urlunparse((
                parsed.scheme,
                parsed.netloc,
                parsed.path,
                parsed.params,
                parsed.query,
                "" # Strip fragment tracking
            ))

            return {
                "is_valid": True,
                "reason": "Verified official government source.",
                "domain": hostname,
                "clean_url": clean_url
            }

        except Exception as e:
            return {
                "is_valid": False,
                "reason": f"URL parsing error: {str(e)}",
                "domain": None,
                "clean_url": None
            }

    @classmethod
    def filter_official_schemes(cls, schemes: list) -> list:
        """
        Filters out any scheme where the source URL or apply URL fails government domain validation.
        """
        valid_schemes = []
        for scheme in schemes:
            source_val = cls.validate_url(scheme.get("official_source_url", ""))
            apply_val = cls.validate_url(scheme.get("official_apply_url", ""))

            if source_val["is_valid"] and apply_val["is_valid"]:
                scheme["verified_domain"] = source_val["domain"]
                scheme["is_source_verified"] = True
                valid_schemes.append(scheme)
            else:
                # Log rejection
                print(f"[REJECTED UNVERIFIED SCHEME]: {scheme.get('name')} | Reason: {source_val.get('reason')} / {apply_val.get('reason')}")

        return valid_schemes
