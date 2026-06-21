# Happy Father's Day 2026 💛

A little scroll-story keepsake — 13 favorite moments, ending in a hidden message.
Built as a plain static site (HTML/CSS/JS, no build step) and hosted on GitHub Pages.

**Live site:** https://beaumontetse.github.io/papa-fathers-day-2026/

## How to personalize the words

Everything ships with warm, ready-to-go defaults, but it's easy to make it yours.
Open `index.html` and edit the text — look for the `EDIT:` comments as a guide:

- **The greeting** — the hero `<h1>` near the top (swap "Dad" for "Papa", "Pops", etc.).
- **Each photo's title + caption** — inside every `<section class="chapter">`, edit the
  `<h2 class="chapter__title">` and `<p class="chapter__caption">`.
- **The hidden letter** — the most important part. It's the `<article class="letter">`
  near the bottom. Rewrite it in your own words and sign it (the `letter__sign` line).

## Swapping or reordering photos

- The web-ready photos live in `images/` as `01.jpg … 13.jpg`, shown in that order.
- To reorder, rename the files (or change the `src` in `index.html`).
- The raw camera originals (HEIC/JPG) are git-ignored on purpose — only the optimized
  `images/` are published. To regenerate an optimized copy from an original (macOS):

  ```sh
  sips -s format jpeg -s formatOptions 72 -Z 1800 INPUT.HEIC --out images/NN.jpg
  ```

## Preview locally

```sh
python3 -m http.server
# then open http://localhost:8000
```

## Hosting (GitHub Pages)

Pushed to the `main` branch. Enable once in **Settings → Pages → Source: `main` / root**.
The site goes live ~30–60s after enabling.

---
*Made with love · Father's Day 2026*
