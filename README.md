# BFHL — SRM Full Stack Challenge Round 1

## Structure
```
/
├── backend/
│   ├── index.js        ← Express API (POST /bfhl)
│   └── package.json
└── frontend/
    └── index.html      ← Single-page app (no build step)
```

## Before deploying — edit backend/index.js lines 9-11
```js
const USER_ID            = 'yourname_ddmmyyyy';
const EMAIL_ID           = 'your@college.edu';
const COLLEGE_ROLL_NUMBER = 'XXXXXXXX';
```

---

## Deploy Backend → Render (free, recommended)

1. Push repo to GitHub (public)
2. Go to https://render.com → New → Web Service
3. Root directory: `backend`
4. Build command: `npm install`
5. Start command: `node index.js`
6. Copy the `https://your-app.onrender.com` URL

---

## Deploy Backend → Railway

```bash
cd backend
railway login
railway init
railway up
```

---

## Deploy Frontend → Netlify (drag-and-drop, 30 seconds)

1. Go to https://app.netlify.com/drop
2. Drag the `frontend/` folder onto the page
3. Done — you'll get a `https://xxx.netlify.app` URL

---

## Test locally

```bash
cd backend && npm install && node index.js
# open frontend/index.html in browser
# set API Base URL to http://localhost:3001
```

## Test the API directly

```bash
curl -X POST http://localhost:3001/bfhl \
  -H "Content-Type: application/json" \
  -d '{"data":["A->B","A->C","B->D","hello","X->Y","Y->Z","Z->X","G->H","G->H","G->I"]}'
```

## Submission checklist
- [ ] Edited USER_ID, EMAIL_ID, COLLEGE_ROLL_NUMBER
- [ ] Backend deployed → copy base URL (e.g. https://myapp.onrender.com)
- [ ] Frontend deployed → copy URL
- [ ] Repo is PUBLIC on GitHub
- [ ] Fill the MS Forms submission form
