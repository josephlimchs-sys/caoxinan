# caoxinan.com

Static portfolio site for painter Cao Xinan. Plain HTML, CSS and JavaScript with no build step and no dependencies.

## Structure

```
index.html          Home: hero, selected work, About, Themes, Exhibitions
404.html            Not-found page
robots.txt          Search engine rules
sitemap.xml         Sitemap for caoxinan.com
assets/
  css/style.css     All styles. Design tokens are in the :root block at the top
  js/main.js        Painting data, filters, theme accordion, lightbox
  img/              Full-size paintings (used in the lightbox and hero)
  img/thumbs/       900px versions (used in the grid and thumbnails)
  img/og-cover.jpg  Social share image
  img/favicon.svg   Browser tab icon
  fonts/            Cinzel SemiBold (header, headings, artwork titles)
                    Louis George Cafe (body text and labels)
```

## Deploy

Upload the contents of this folder to the web root of caoxinan.com. It works on any static host: Netlify, Vercel, Cloudflare Pages, GitHub Pages, or shared hosting.

- **Netlify / Cloudflare Pages:** drag the `caoxinan.com` folder into the dashboard.
- **Shared hosting:** upload everything to `public_html/` by FTP.

To preview locally, run `python3 -m http.server` inside this folder and open http://localhost:8000.

## Editing content

**Paintings.** Edit the `WORKS` list at the top of `assets/js/main.js`. Each entry has:

- `k`: the image key in `IMG`
- `t`: the title
- `d`: the date shown in the lightbox
- `y`: the year (not currently shown on the site)
- `c`: the category (Portraits, Scenes or Mark-making)
- `a`: the alt text describing the painting

To add a painting:

1. Save a full-size JPG to `assets/img/` and a 900px version to `assets/img/thumbs/`.
2. Add an entry to `IMG` with its width and height.
3. Add the painting to `WORKS`. Newest first is the current order.

**Theme descriptions.** Edit the `ABOUT` object in `assets/js/main.js`.

**Exhibitions.** Edit the `<ol>` list in the `#exhibitions` section of `index.html`. Each `<li>` has the year, the show name and the details. Add new shows at the top.

## Fonts

Both fonts are licensed for commercial web use, so the site can go live as is:

- Cinzel is open source (SIL Open Font License).
- Louis George Cafe (by Yining Chen) is free for personal and commercial use.

## Before going live

1. **Check the painting details.** Confirm the titles, and add dates for the three undated works (Got Banana, Rest in Peace, Red Church).
2. **Re-shoot the paintings if possible.** Straight-on photos in even light will look sharper than crops from wall photos.
