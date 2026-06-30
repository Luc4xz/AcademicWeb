# Chengran Xu Portfolio

Modern React + TypeScript portfolio with a Flask API backend. The visual system intentionally keeps the original portfolio design: serif headings, UW-inspired red accents, quiet rules, flat cards, dark mode, and the existing spacing rhythm.

## Frontend

```bash
npm install
npm run dev
```

The Vite dev server proxies `/api` requests to `http://127.0.0.1:5000`.

## Backend

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python backend/app.py
```

Available API routes:

- `GET /api/profile`
- `GET /api/projects`
- `GET /api/skills`
- `GET /api/research`
- `GET /api/experience`
- `GET /api/education`
- `GET /api/journey`
- `GET /api/github/repos`
- `POST /api/contact`

Set `GITHUB_USERNAME` to change the repository source. Contact form submissions are stored as timestamped text files in `messages/`.
