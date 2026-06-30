import os
import re
from datetime import datetime

import requests
from flask import Flask, jsonify, request
from flask_cors import CORS

try:
    from .data import EDUCATION, EXPERIENCE, JOURNEY, PROFILE, PROJECTS, RESEARCH, SKILLS
except ImportError:
    from data import EDUCATION, EXPERIENCE, JOURNEY, PROFILE, PROJECTS, RESEARCH, SKILLS

app = Flask(__name__)
CORS(app)

EMAIL_PATTERN = re.compile(r"^[^\s@]+@[^\s@]+\.[^\s@]+$")


@app.get("/api/profile")
def get_profile():
    return jsonify(PROFILE)


@app.get("/api/projects")
def get_projects():
    return jsonify(PROJECTS)


@app.get("/api/skills")
def get_skills():
    return jsonify(SKILLS)


@app.get("/api/research")
def get_research():
    return jsonify(RESEARCH)


@app.get("/api/experience")
def get_experience():
    return jsonify(EXPERIENCE)


@app.get("/api/education")
def get_education():
    return jsonify(EDUCATION)


@app.get("/api/journey")
def get_journey():
    return jsonify(JOURNEY)


@app.get("/api/github/repos")
def get_github_repositories():
    username = os.getenv("GITHUB_USERNAME", "Luc4xz")
    response = requests.get(
        f"https://api.github.com/users/{username}/repos",
        params={"sort": "updated", "per_page": 8},
        timeout=8,
        headers={"Accept": "application/vnd.github+json"},
    )
    response.raise_for_status()
    repos = response.json()
    return jsonify(
        [
            {
                "id": repo["id"],
                "name": repo["name"],
                "description": repo.get("description"),
                "html_url": repo["html_url"],
                "language": repo.get("language"),
                "stargazers_count": repo.get("stargazers_count", 0),
                "updated_at": repo["updated_at"],
            }
            for repo in repos
            if not repo.get("fork")
        ]
    )


@app.post("/api/contact")
def post_contact():
    payload = request.get_json(silent=True) or {}
    name = str(payload.get("name", "")).strip()
    email = str(payload.get("email", "")).strip()
    subject = str(payload.get("subject", "")).strip()
    message = str(payload.get("message", "")).strip()
    errors = {}

    if len(name) < 2:
        errors["name"] = "Please enter your name."
    if not EMAIL_PATTERN.match(email):
        errors["email"] = "Please enter a valid email address."
    if len(subject) < 3:
        errors["subject"] = "Please include a subject."
    if len(message) < 10:
        errors["message"] = "Please write a message of at least 10 characters."

    if errors:
        return jsonify({"ok": False, "message": "Please fix the highlighted fields.", "errors": errors}), 400

    os.makedirs("messages", exist_ok=True)
    timestamp = datetime.utcnow().strftime("%Y%m%d-%H%M%S")
    with open(os.path.join("messages", f"{timestamp}.txt"), "w", encoding="utf-8") as message_file:
        message_file.write(f"Name: {name}\nEmail: {email}\nSubject: {subject}\n\n{message}\n")

    return jsonify({"ok": True, "message": "Thanks, your message has been received."})


if __name__ == "__main__":
    app.run(debug=True)
