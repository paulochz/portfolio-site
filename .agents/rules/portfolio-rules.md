# Paulo Chiozzini Portfolio — Agent Rules

## 1. Strict Fidelity to Figma & Content

- Never invent, infer, or add text, sections, buttons, or components that are not explicitly declared in Figma or requested by the user.
- Use exclusively the copy (text, titles, captions), hierarchies, and layouts visible in the nodes inspected via Figma MCP.
- If any data is missing from the design, point out the gap objectively instead of creating fictional content (such as "Lorem Ipsum" or arbitrary metrics).

## 2. Design System & CSS Tokens

- Hardcoded values (hex codes, arbitrary pixels, or magic properties) for colors, spacing, typography, and border radii are **forbidden**.
- Always consult `DESIGN.md` and `style.css` before writing or proposing HTML/CSS.
- If a new value is identified in Figma with no equivalent token in `style.css`, document the need to expand the Design System before applying it.

## 3. Execution Protocol (Plan-First)

- Before modifying or creating source files, present a concise **Execution Plan** containing:
  1. Files to be created or edited.
  2. BEM classes and semantic structure to be implemented.
  3. `style.css` tokens to be consumed.
- Proceed with applying code only after presenting this plan structure.

## 4. Autonomous Validation & Scripts

- **No Permission for Validations**: All read-only scripts, Python checks (HTML syntax parsing, asset validation, dimensions check, linting), and inspection commands must run immediately and autonomously without requesting user permission or approval.

