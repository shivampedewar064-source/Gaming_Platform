# Tech Stack & Deployment Guide

## 📋 Project Overview
A multi-game platform featuring six classic browser games (Tic Tac Toe, Sudoku, Slide Puzzle, Snake, Chrome Dinosaur, Flappy Bird) plus supporting auth/login pages—all structured for static hosting.

---

## 🛠️ Tech Stack

### **Frontend Technologies**
- **HTML5** – semantic markup for pages and games
- **CSS3** – `assets/css/main|games|auth.css` cover global layout, game shells, and auth flows
- **Vanilla JavaScript** – gameplay logic, Firebase auth hooks, and UI helpers
- **Canvas API** – used by Chrome Dinosaur, Flappy Bird, and Snake

### **Architecture**
- **Static-first** – no bundlers or server-side rendering required
- **Firebase Authentication** – shared via `assets/js/auth.js`
- **Deploy-anywhere** – Firebase Hosting, Netlify, Vercel, GitHub Pages, or any CDN

### **Project Structure**
```
gameplay-website-main/
├── index.html                # Landing page & auth widgets
├── assets/
│   ├── css/                  # main.css, games.css, auth.css
│   ├── js/                   # main.js, auth.js, utils.js, firebase-config.js
│   ├── images/               # logo, favicon, thumbnails
│   └── sounds/
├── games/
│   ├── tic-tac-toe/
│   ├── sudoku/
│   ├── slide-puzzle/
│   ├── snake/
│   ├── chrome-dinosaur/
│   ├── flappy-bird/
│   └── catch-the-ball/       # extra game (optional)
├── pages/
│   ├── login.html
│   ├── signup.html
│   ├── profile.html
│   ├── about.html
│   └── game-info/            # legacy info pages
├── config/firebase-config.example.js
├── firebase.json
└── .firebaserc
```

---

## 🚀 Deployment Options

| Platform        | Why use it?                               | Steps |
|-----------------|-------------------------------------------|-------|
| **GitHub Pages**| Free + integrated with Git                | Push to GitHub → Settings → Pages (serve from root) |
| **Netlify**     | Drag-and-drop deploys, preview URLs       | Drag folder or connect repo, publish dir `.`        |
| **Vercel**      | Auto-CDN + Git integrations               | Import repo, no build step needed                   |
| **Firebase**    | Pairs with existing Firebase project      | `firebase init hosting` → `firebase deploy`         |
| **Surge.sh**    | CLI-based quick deploy                    | `npm i -g surge` → `surge ./`                      |
| **Traditional** | Works with cPanel/FTP hosting             | Upload contents of repo root                        |

All hosts should point to the root directory (`.`) because routing is handled by `firebase.json` rewrites (or each host’s equivalent settings).

---

## ⚠️ Pre-Deployment Checklist

1. **Firebase config**
   - Replace placeholders in `assets/js/firebase-config.js`
   - Enable Email/Password auth in Firebase console
2. **Static asset audit**
   - Ensure new thumbnails/logos exist in `assets/images/`
   - Compress additional assets before adding
3. **Path verification**
   - Every HTML file now references `/assets/...` and `/games/...`
   - Confirm `<script>` order: Firebase CDN → config → utils → auth → page script
4. **Game smoke test**
   - Open each `games/<name>/index.html`
   - Check keyboard/mouse controls and ensure there are no console errors
5. **Responsive sweep**
   - Test landing page, login/signup, and profile on <= 400px width
6. **Optional extras**
   - Add a `404.html` mirroring `index.html` for GitHub Pages
   - Swap placeholder images with branded assets before go-live

---

## 🔧 Quick Reference Fixes

- **Broken links:** All legacy paths (`../forall/...`, `home-page-2/...`) were removed. If you add new pages, keep links rooted at `/pages/...` or `/games/...`.
- **Entry point:** `index.html` at repo root is the production landing page. No redirects needed.
- **Naming:** Each game folder contains `index.html`, `<game>.css`, `<game>.js`, plus a local `/assets` folder when needed.

---

## 📝 Deployment Example (Firebase)

```bash
npm install -g firebase-tools   # once
firebase login                  # once
firebase init hosting           # choose existing project, public: .
firebase deploy
```

This respects the included `firebase.json` rewrite:
```json
{
  "hosting": {
    "public": ".",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [{ "source": "**", "destination": "/index.html" }]
  }
}
```

---

## 🌐 Post-Deployment

- Exercise every navigation path (home ↔ games ↔ auth pages)
- Watch the browser console for 404s/mixed-content warnings
- Share the live URL and add monitoring/analytics if desired

---

## 💡 Additional Recommendations

1. Hook up analytics or event tracking for button clicks.
2. Add a `sitemap.xml` plus metadata for better SEO.
3. Consider bundling service worker logic for offline play (optional).
4. Document setup steps for future contributors inside `README.md`.

---

**Estimated deployment time:** 10–20 minutes once Firebase keys are in place.  
**Recommended platforms:** Firebase Hosting for auth-heavy workflows, Netlify/Vercel for pure static hosting.
