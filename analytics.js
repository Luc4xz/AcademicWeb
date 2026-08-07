import { ANALYTICS_API_ORIGIN } from "./analytics-config.js";

const VISITOR_ID_KEY = "academicweb_visitor_id";

function analyticsIsConfigured() {
  if (!ANALYTICS_API_ORIGIN) {
    return false;
  }

  try {
    return new URL(ANALYTICS_API_ORIGIN).protocol === "https:";
  } catch {
    return false;
  }
}

function getVisitorId() {
  try {
    const storedId = localStorage.getItem(VISITOR_ID_KEY);
    if (storedId) {
      return storedId;
    }

    const visitorId = crypto.randomUUID();
    localStorage.setItem(VISITOR_ID_KEY, visitorId);
    return visitorId;
  } catch {
    return crypto.randomUUID();
  }
}

function trackingIsAllowed() {
  return navigator.doNotTrack !== "1" && window.doNotTrack !== "1";
}

function recordPageView() {
  if (!analyticsIsConfigured() || !trackingIsAllowed()) {
    return;
  }

  const eventUrl = new URL("/api/event", ANALYTICS_API_ORIGIN);
  const payload = JSON.stringify({
    visitorId: getVisitorId(),
    path: window.location.pathname
  });

  if (navigator.sendBeacon) {
    const queued = navigator.sendBeacon(eventUrl, new Blob([payload], { type: "text/plain" }));
    if (queued) {
      return;
    }
  }

  fetch(eventUrl, {
    method: "POST",
    body: payload,
    headers: { "Content-Type": "text/plain" },
    keepalive: true,
    mode: "cors"
  }).catch(() => {
    // Analytics must never interfere with the portfolio experience.
  });
}

recordPageView();
