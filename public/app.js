/* Olympiad Math Trainer — shared frontend contract (window.App) */
(function () {
  "use strict";

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  async function api(method, path, body) {
    var opts = {
      method: method,
      credentials: "include",
      headers: { "Content-Type": "application/json" }
    };
    if (body !== undefined && body !== null) opts.body = JSON.stringify(body);
    var res = await fetch(path, opts);
    var data = null;
    try { data = await res.json(); } catch (e) { data = null; }
    if (!res.ok) {
      var msg = (data && (data.message || data.error)) || "Request failed";
      throw new Error(msg);
    }
    return data == null ? {} : data;
  }

  async function me() {
    return api("GET", "/api/auth/me");
  }

  async function requireAuth() {
    var data;
    try {
      data = await me();
    } catch (e) {
      location.href = "/login.html";
      return null;
    }
    if (!data || !data.user) {
      location.href = "/login.html";
      return null;
    }
    return data.user;
  }

  async function logout() {
    try { await api("POST", "/api/auth/logout"); } catch (e) { /* ignore */ }
    location.href = "/";
  }

  window.App = { api: api, me: me, requireAuth: requireAuth, logout: logout, esc: esc };
})();
