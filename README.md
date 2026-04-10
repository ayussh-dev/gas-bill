<div align="center">

# 🔥 Gas Bill Tracker

> **A sleek, no-login web app for tracking monthly gas bill payments across 60 society flats.**

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white&style=flat-square)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white&style=flat-square)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38BDF8?logo=tailwindcss&logoColor=white&style=flat-square)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-EF4444?logo=framer&logoColor=white&style=flat-square)
![localStorage](https://img.shields.io/badge/Storage-localStorage-F59E0B?style=flat-square)

</div>

---

## ✨ Features

| Feature | Detail |
|---|---|
| 🏠 **60 Flats** | Blocks 0–9, units 01–06 (labels: `001` → `906`) |
| ✅ **Paid Toggle** | Tap any flat card to mark Paid / Unpaid |
| 📅 **Month History** | Browse any past month — past months are read-only |
| 📊 **Live Summary** | Paid / Unpaid count + animated progress bar |
| 💾 **Offline-first** | All data stored in `localStorage` — no server needed |
| 🎨 **Smooth Animations** | Powered by Framer Motion — staggered grid, fade transitions |
| 🔒 **No Login** | Open and use instantly — zero accounts, zero friction |

---

## 🗂️ Flat Numbering

Flats are organised as **10 blocks × 6 units**:

```
Block 0 → 001  002  003  004  005  006
Block 1 → 101  102  103  104  105  106
  ...
Block 9 → 901  902  903  904  905  906
```

---

## 🚀 Running Locally

> **Prerequisites:** Node.js 18+ and npm

```bash
# 1 — clone the repo
git clone https://github.com/ayussh-dev/gas-bill.git
cd gas-bill

# 2 — install dependencies
npm install

# 3 — start the dev server
npm run dev
```

Then open **http://localhost:5173** in your browser. That's it! 🎉

---

## 🏗️ Build for Production

```bash
npm run build      # outputs to dist/
npm run preview    # preview the production build locally
```

---

## 🛠️ Tech Stack

```
gas-bill/
├── src/
│   ├── components/
│   │   ├── Header.jsx        ← gradient app header
│   │   ├── MonthSelector.jsx ← month dropdown + read-only badge
│   │   ├── SummaryBar.jsx    ← paid / unpaid counters + progress bar
│   │   ├── FlatCard.jsx      ← individual flat toggle card
│   │   └── FlatGrid.jsx      ← animated grid grouped by block
│   ├── hooks/
│   │   └── useBillTracker.js ← core state & localStorage sync
│   ├── lib/
│   │   ├── flats.js          ← flat ID generation (001–906)
│   │   ├── months.js         ← month helpers (format, compare)
│   │   └── storage.js        ← localStorage read/write/toggle
│   ├── App.jsx
│   └── main.jsx
```

---

## 💡 How Data is Stored

Data is persisted in `localStorage` with keys in the format:

```
gasbill:YYYY-MM  →  { "001": true, "102": false, ... }
```

- `true` = **Paid**
- `false` / missing = **Unpaid**

Clearing your browser's localStorage resets all data.

---

## 📸 UI Overview

- **Header** — bold gradient bar with flame icon
- **Month Selector** — dropdown showing all months with data; current month is editable, past months are locked with a 🔒 badge
- **Summary Cards** — animated counters for Total / Paid / Unpaid + a smooth progress bar
- **Flat Grid** — grouped by block, each flat is a tappable card that transitions between green (paid) and dark (unpaid)

---

<div align="center">
Made with ❤️ for the society
</div>
