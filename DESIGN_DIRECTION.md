# Blackcrest Advisory — Proposed Design Direction

**Status:** proposal only. No implementation work is included in this document.

## 1. Design intent

Blackcrest should feel like a composed, high-trust B2B partner: precise rather than flashy, warm rather than cold, and premium without becoming ornamental.

The experience should use the current navy and gold identity as a recognisable signature:

- **Navy** carries structure, authority, navigation, and editorial depth.
- **Gold** signals focus, progress, and high-value actions—not general decoration.
- **Warm neutral surfaces** keep the light theme calm and practical for long sessions.
- **Deep layered blue surfaces** make the dark theme feel deliberate rather than simply inverted.

The intended result is closer to a refined advisory workspace than a generic SaaS template.

## 2. Core visual principles

### Controlled contrast

Use strong contrast for page hierarchy and key actions, then let secondary content recede. Gold should be reserved for the primary action, active state, selected metric, or meaningful emphasis.

### Quiet surfaces

Cards should be differentiated mostly through tone, a subtle border, and restrained elevation. Avoid stacking borders, heavy shadows, gradients, and glow on the same surface.

### Information before decoration

Dashboards should make status, next action, deadlines, amounts, and ownership immediately scannable. Public pages should make service value, proof, and conversion paths clear before visual embellishment.

### Motion with purpose

Motion should explain hierarchy, state change, or spatial movement. Entrance motion remains short and quiet; looping decorative movement is limited and always respects the user’s reduced-motion preference.

### One component language

Buttons, inputs, badges, tables, dialogs, filters, cards, and dropdowns should all share the same radius, spacing, focus treatment, and interaction grammar.

## 3. Proposed token strategy

The existing global palette remains the source of truth. The implementation will normalise use of those tokens rather than introduce a competing theme.

| Category | Direction |
| --- | --- |
| Brand | Keep navy/gold values and their dark-mode counterparts; use gold sparingly as an action/emphasis colour. |
| Surfaces | Define a clear three-level order: page background, standard card/panel, elevated overlay. |
| Borders | Use one default subtle border token and a single stronger interactive/selected treatment. |
| Typography | Establish named hierarchy for display/page title, section title, metric, body, label, metadata, and helper text. |
| Radius | Preserve modest controls and surfaces: compact controls, gently rounded cards, fully rounded only for pills/avatars/status dots. |
| Shadows | Use elevation only for hoverable cards, popovers, menus, dialogs, and sticky elements. Replace arbitrary shadow RGB values with semantic shadow tokens. |
| Status | Establish semantic success, warning, destructive, info, and neutral tokens; domain badges map to those rather than inventing separate colours. |
| Focus | Keep the visible gold focus ring and ensure every interactive primitive inherits it. |

## 4. Component direction

### Shared primitives first

The first implementation pass should harden the most reused pieces:

1. `Button`
2. `Card`
3. `Input`, `TextArea`, `Select`, and `Switch`
4. `Dropdown`, `ConfirmationModal`, and `Table`
5. status and priority badges
6. shared pagination, navigation, and shell elements

Every higher-level page benefits from those corrections automatically. Component APIs should only change when a real consistency problem requires it; widespread call-site churn is not a goal.

### Dashboard pages

- Use a predictable page frame: title/action row, compact summary metrics where useful, filters, then the primary working surface.
- Treat tables as desktop-first work areas with deliberate narrow-screen fallbacks: horizontal containment, priority columns, or stacked record rows where necessary.
- Keep operational pages visually dense enough for efficiency, while separating destructive actions and alerts from normal status.
- Make empty, loading, and error states feel designed rather than incidental.

### Public marketing pages

- Keep more editorial spacing than dashboard pages.
- Use one strong hero focal point, clear proof/benefit blocks, and a clear action path.
- Use gradients and ambient gold light only as quiet depth layers—not as the content’s main visual language.
- Align service pages so the four offerings feel like one family while retaining their individual messaging.

## 5. Motion and interaction policy

| Interaction | Direction |
| --- | --- |
| Page/section entry | Opacity plus a small vertical movement; 300–500ms, no excessive cascading. |
| Hoverable surfaces | Slight elevation or border shift; no large scaling. |
| Buttons | Fast colour/elevation response and a subtle press state. |
| Menus/dialogs | Short scale-fade or directional transition tied to the trigger location. |
| Loading | Prefer skeletons for content layout and compact loaders for actions. |
| Decorative loops | Use only where they add atmosphere; disable through a shared reduced-motion strategy. |

## 6. Responsive and accessibility baseline

- Keyboard focus must remain visible across all shared controls.
- Minimum interactive target: approximately 40–44px where the context permits.
- Text, badges, charts, and status must not depend on colour alone.
- Light and dark themes must retain readable button labels, especially secondary and gold buttons.
- Sidebars, data tables, filters, modals, and dropdowns will be checked at narrow, medium, and large desktop widths.
- Respect `prefers-reduced-motion` in both CSS and Framer Motion usage.

## 7. Implementation sequence after approval

1. **Foundation:** semantic theme aliases, typography hierarchy, shared motion preference, and removal of one-off colours from shared primitives.
2. **Primitives:** buttons, form controls, cards, dropdowns, modal, table, badges, and pagination.
3. **Shell:** public navbar/footer and client/admin dashboard sidebar/navbar/layout.
4. **Operational pages:** leads, projects, invoices, files, services, reports, settings, and client equivalents.
5. **Marketing pages:** homepage, service pages, contact, engagement, and start-project flow.
6. **Responsive/a11y pass:** keyboard, focus, contrast, reduced motion, loading/empty states, and narrow-screen checks.
7. **Safe cleanup:** only after migration and verification, remove approved unused files in an isolated commit.

## 8. Explicit non-goals

- No generic gradient-heavy “AI SaaS” redesign.
- No new UI library or broad dependency migration.
- No schema, data-model, authentication, or business-logic changes.
- No deletion of legacy files until migration and two-method verification are complete.
- No visual rewrite of every page before the shared foundation is stable.

## Approval requested

Approve this direction to begin Phase 3 implementation, starting with the theme/component foundation and dashboard shell. You can also request a different emphasis—more editorial public pages, denser dashboards, or a more minimal visual tone—before implementation begins.
