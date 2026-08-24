# AGENTS.md

## Build & Development

- Use `npm run dev` to start Eleventy dev server
- Use `npm run build-ghpages` to build for production
- Build artifacts go to `_site/` directory
- CSS is built from `_includes/css/` and bundled via `bundle.css`

## Key Commands

- `npm run dev` - Start local development server with live reload
- `npm run build-ghpages` - Build static site for deployment

## Framework Details

- Static site generator: Eleventy (11ty)
- CSS framework: Pico.css (included via @picocss/pico dependency)
- CSS processing: LightningCSS for minification
- Image optimization: @11ty/eleventy-img plugin

## File Structure

- Source files in `_includes/` directory
- CSS files in `_includes/css/`
- JavaScript files in `_includes/js/`
- Templates in root directory (`.njk` or `.html` files)
- Generated site output in `_site/` directory

## Important Notes

- Site uses CSS variables for theming (light/dark mode support)
- Theme switching implemented with localStorage persistence
- All CSS is processed through Eleventy's CSS minification filter
- Assets are copied through passthrough copy mechanism

## Design Guidelines

For design-related information, see `.opencode/charte-graphique.md`
For development rules and conventions, see `.opencode/regles-developpement.md`