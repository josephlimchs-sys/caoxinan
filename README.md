# caoxinan.com

Static portfolio site for painter Cao Xinan. Plain HTML, CSS and JavaScript with no build step and no dependencies.

## Structure

```
index.html          Home: hero, filterable gallery, About, Exhibitions, Contact
404.html            Not-found page
robots.txt          Search engine rules
sitemap.xml         Sitemap for caoxinan.com
assets/
  css/style.css     All styles. Design tokens are in the :root block at the top
  js/main.js        Painting data, filters, lightbox, copy-email button
  img/              Full-size paintings (used in the lightbox)
  img/thumbs/       900px versions (used in the grid and thumbnail strip)
  img/og-cover.jpg  Social share image
  img/favicon.svg   Browser tab icon
  fonts/            Heading Now subsets (letters and punctuation only)
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
- `y`: the year shown on the card
- `c`: the category (Portraits, Scenes or Mark-making)
- `a`: the alt text describing the painting

To add a painting:

1. Save a full-size JPG to `assets/img/` and a 900px version to `assets/img/thumbs/`.
2. Add an entry to `IMG` with its width and height.
3. Add the painting to `WORKS`. Newest first is the current order.

**Exhibitions.** Edit the `<ol class="shows">` list in `index.html`. Remove the `<i class="sample">Sample</i>` tag once a row is real.

**Contact email.** The address `hello@caoxinan.com` is a placeholder, set in `index.html` (`id="email"`).

## Before going live

1. **Buy the font licence.** Heading Now is included as Zetafonts trial files under CC BY-NC: non-commercial use only, with a required credit. The trial digits are watermarked, so numerals currently fall back to Big Shoulders Display. Buy the webfont licence at http://www.zetafonts.com/collection/6237 and replace the two files in `assets/fonts/`. Once the licensed files have real digits, remove the `unicode-range` lines in `style.css`. Keep or remove the footer credit as the licence requires.
2. **Replace the placeholders.** Swap in the real painting titles, the dates for the three undated works, the exhibition rows and the contact email.
3. **Re-shoot the paintings if possible.** Straight-on photos in even light will look sharper than crops from wall photos.
