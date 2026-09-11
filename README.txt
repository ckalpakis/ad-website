STEEL SCALE SYSTEMS

Static website for ads.steelscalesystems.com. No build step or runtime dependencies.

index.html  — Homepage: offer, system, process, fit, FAQ, and contact.
results.html — Results library with 21 screenshots and category filters.
styles.css  — Shared responsive styles for both pages.
site.js     — Mobile navigation, filters, image preview, and copy-email enhancement.
images/     — Existing screenshots, referenced by explicit filename.

Booking links use https://calendly.com/kalpakisdev/demo-call.
Email: carson@steelscalesystems.com
Phone: (412) 314-2603

Preview: python3 -m http.server 8080
Open http://localhost:8080.

Deploy the repository as a static website, including styles.css and site.js.
No framework preset or build command is needed.

Content, image links, booking links, and FAQs also work without JavaScript.
The removed ad-results-03.jpg image is retained on disk but is not used on either page.
When updating a result, edit its static card and update the relevant filter count.
