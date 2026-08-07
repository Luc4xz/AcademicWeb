import { ANALYTICS_API_ORIGIN } from "./analytics-config.js";

const login = document.querySelector("#analytics-login");
const dashboard = document.querySelector("#analytics-dashboard");
const tokenForm = document.querySelector("#token-form");
const tokenInput = document.querySelector("#admin-token");
const rangeSelect = document.querySelector("#date-range");
const status = document.querySelector("#analytics-status");
const numberFormatter = new Intl.NumberFormat();
const regionNames = typeof Intl.DisplayNames === "function"
  ? new Intl.DisplayNames(["en"], { type: "region" })
  : null;

let adminToken = "";

function apiIsConfigured() {
  if (!ANALYTICS_API_ORIGIN) {
    return false;
  }

  try {
    return new URL(ANALYTICS_API_ORIGIN).protocol === "https:";
  } catch {
    return false;
  }
}

function setStatus(message, isError = false) {
  status.textContent = message;
  status.style.color = isError ? "#b42318" : "";
}

function friendlyCountry(code) {
  if (code === "XX") {
    return "Unknown";
  }

  try {
    return regionNames?.of(code) || code;
  } catch {
    return code;
  }
}

function renderBreakdown(elementId, rows, labelFormatter = (label) => label) {
  const container = document.querySelector(`#${elementId}`);
  container.replaceChildren();

  if (!rows.length) {
    const empty = document.createElement("p");
    empty.className = "empty-breakdown";
    empty.textContent = "No data yet.";
    container.append(empty);
    return;
  }

  const maximum = Math.max(...rows.map((row) => row.pageViews), 1);

  rows.forEach((row) => {
    const item = document.createElement("div");
    const label = document.createElement("span");
    const track = document.createElement("span");
    const fill = document.createElement("span");
    const value = document.createElement("span");

    item.className = "breakdown-row";
    label.className = "breakdown-label";
    label.textContent = labelFormatter(row.label);
    label.title = label.textContent;
    track.className = "breakdown-track";
    fill.className = "breakdown-fill";
    fill.style.setProperty("--fill-width", `${(row.pageViews / maximum) * 100}%`);
    track.append(fill);
    value.className = "breakdown-value";
    value.textContent = numberFormatter.format(row.pageViews);
    value.title = `${numberFormatter.format(row.visitors)} unique visitors`;
    item.append(label, track, value);
    container.append(item);
  });
}

function renderTraffic(series) {
  const chart = document.querySelector("#traffic-chart");
  chart.replaceChildren();
  chart.classList.toggle("dense", series.length > 45);
  const maximum = Math.max(...series.map((day) => day.pageViews), 1);

  series.forEach((day) => {
    const bar = document.createElement("div");
    const date = new Date(`${day.date}T00:00:00Z`).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      timeZone: "UTC"
    });
    bar.className = "traffic-bar";
    bar.tabIndex = 0;
    bar.style.setProperty("--bar-height", `${(day.pageViews / maximum) * 100}%`);
    bar.title = `${date}: ${numberFormatter.format(day.pageViews)} page views, ${numberFormatter.format(day.visitors)} visitors`;
    bar.setAttribute("aria-label", bar.title);
    chart.append(bar);
  });
}

function renderDashboard(data) {
  const { totals, series, countries, devices, browsers, pages, range } = data;
  document.querySelector("#range-title").textContent = range.days === 365 ? "Last year" : `Last ${range.days} days`;
  document.querySelector("#visitor-total").textContent = numberFormatter.format(totals.visitors);
  document.querySelector("#page-view-total").textContent = numberFormatter.format(totals.pageViews);
  document.querySelector("#views-per-visitor").textContent = totals.visitors
    ? (totals.pageViews / totals.visitors).toFixed(1)
    : "0";
  renderTraffic(series);
  renderBreakdown("country-list", countries, friendlyCountry);
  renderBreakdown("device-list", devices);
  renderBreakdown("browser-list", browsers);
  renderBreakdown("page-list", pages);
}

async function loadAnalytics() {
  setStatus("Loading analytics…");
  const statsUrl = new URL("/api/stats", ANALYTICS_API_ORIGIN);
  statsUrl.searchParams.set("days", rangeSelect.value);

  try {
    const response = await fetch(statsUrl, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });

    if (response.status === 401) {
      adminToken = "";
      dashboard.hidden = true;
      login.hidden = false;
      tokenInput.value = "";
      tokenInput.focus();
      throw new Error("That admin token is not valid.");
    }

    if (!response.ok) {
      throw new Error("The analytics API could not load the dashboard.");
    }

    renderDashboard(await response.json());
    login.hidden = true;
    dashboard.hidden = false;
    setStatus("");
  } catch (error) {
    setStatus(error.message || "Unable to load analytics.", true);
  }
}

tokenForm.addEventListener("submit", (event) => {
  event.preventDefault();
  adminToken = tokenInput.value.trim();
  if (adminToken) {
    loadAnalytics();
  }
});

rangeSelect.addEventListener("change", loadAnalytics);

if (!apiIsConfigured()) {
  tokenForm.querySelector("button").disabled = true;
  setStatus("Analytics is not configured yet. Add the deployed Worker URL to analytics-config.js.", true);
}
