# Portfolio cleanup and regression protection

Preserve the current appearance, content, responsive breakpoints, print output,
and keyboard/trackpad/touch interactions. Keep unrelated working-tree edits.

1. Establish a passing lint/typecheck baseline. Add a small Node test runner with
   React Testing Library and jsdom for real component interaction tests.
2. Cover coursework expansion, projects/experience disclosure and deep links,
   skill aliases and requested mappings, keyboard selection/dimming, certificate
   navigation and hash links, and paper detail controls before refactoring them.
3. Extract skill layout and connection selection into pure, typed functions.
   Remove the obsolete packing pass while retaining identical row distributions.
4. Share disclosure controls and hash-link event subscription. Keep the distinct
   project and experience layouts, animation timing, and print behavior.
5. Extract the experience card and production icon from page markup. Move repeated
   inline hover styles to CSS. Centralize shared content types and coursework data.
6. Review remaining components, styles, and config; format hand-edited application
   code without redesigning or rewriting unchanged UI primitives.
7. Run regression tests, lint, typecheck, and static production export. Visually
   verify desktop/mobile layouts and representative links in the running server.

Tests should assert user-visible behavior and useful invariants (unique anchors,
   no dropped skills, supported aliases, disclosure/reveal behavior), avoiding
   snapshots of incidental Tailwind classes or component structure.
