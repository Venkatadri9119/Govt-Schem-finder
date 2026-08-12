const API_BASE = "/api";

export const api = {
  async findSchemes(profileData) {
    const res = await fetch(`${API_BASE}/find-schemes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profileData)
    });
    return res.json();
  },

  async naturalLanguageSearch(query) {
    const res = await fetch(`${API_BASE}/natural-language-search`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query })
    });
    return res.json();
  },

  async getAllSchemes(params = {}) {
    const queryStr = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE}/schemes?${queryStr}`);
    return res.json();
  },

  async getSchemeDetails(schemeId) {
    const res = await fetch(`${API_BASE}/schemes/${schemeId}`);
    return res.json();
  },

  async liveVerifyScheme(schemeId) {
    const res = await fetch(`${API_BASE}/schemes/${schemeId}/verify`);
    return res.json();
  },

  async getSavedSchemes(userId = "default_user") {
    const res = await fetch(`${API_BASE}/saved-schemes?user_id=${userId}`);
    return res.json();
  },

  async toggleSaveScheme(schemeId, userId = "default_user") {
    const res = await fetch(`${API_BASE}/saved-schemes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ scheme_id: schemeId, user_id: userId })
    });
    return res.json();
  },

  async getDashboardStats() {
    const res = await fetch(`${API_BASE}/stats`);
    return res.json();
  }
};
