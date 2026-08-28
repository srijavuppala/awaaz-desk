const form = document.querySelector("[data-lead-form]");
const statusEl = document.querySelector("[data-lead-status]");

const apiBaseUrl =
  window.AWAAZ_API_URL ||
  new URLSearchParams(window.location.search).get("api") ||
  "";

if (form && statusEl) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!apiBaseUrl) {
      statusEl.textContent = "Email us at hello@awaazdesk.in while the pilot backend is being connected.";
      return;
    }

    const data = Object.fromEntries(new FormData(form).entries());
    statusEl.textContent = "Sending...";

    try {
      const response = await fetch(`${apiBaseUrl.replace(/\/$/, "")}/api/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error("Lead request failed.");
      }

      form.reset();
      statusEl.textContent = "Thanks. We received your pilot request.";
    } catch (_error) {
      statusEl.textContent = "Something went wrong. Email hello@awaazdesk.in directly.";
    }
  });
}
