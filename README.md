# Scroll-driven Frame Animation

Place your ordered image frames inside a `frames/` folder at the project root.

Preferred options:
- Name files like `frame-0001.jpg`, `frame-0002.jpg`, ... and set the frame count in the input on the page.
- Or create `frames/frames.json` containing an ordered array of filenames (e.g. `["frame-0001.jpg","frame-0002.jpg"]`).

To run locally (choose one):

Python (built-in):
```
python -m http.server 8000
```
Node (if you have npm):
```
npx http-server -p 8000
```

Then open: http://localhost:8000

Notes:
- The page preloads the listed frames and renders them to a full-viewport canvas.
- Use zero-padded filenames for correct ordering, or supply `frames/frames.json`.

Deployment / GitHub

- This project can be hosted as a static site (Vercel, Netlify, GitHub Pages).
- The repository includes `code.html` (admin dashboard) and `index.html` (demo page). Make sure to update Firebase config in `code.html` before deploying.

Vercel tip:

- Import the repository into Vercel and choose "Framework: Static Site". Use `/` as the output directory.
- Alternatively include `vercel.json` (provided) which instructs Vercel to serve `index.html` as a static entry.