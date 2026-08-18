# Blackcrest Advisory — Phase 1 Design & Cleanup Audit

**Scope:** read-only audit of the existing application. No product code, styles, routes, or assets were changed as part of this phase.

## 1. Project map

The application is a Next.js 16 App Router project using React 19, TypeScript, Tailwind CSS 4, Framer Motion, Prisma, and Supabase. The root layout imports `app/styles/global.css`; the similarly named `app/styles/globals.css` is currently empty and is not imported.

### Route structure

| Area | Routes |
| --- | --- |
| Public marketing | `/`, `/home`, `/about`, `/contact`, `/engagement`, `/start-project`, and four service routes: `/services/website-development`, `/services/mobile-applications`, `/services/digital-marketing`, `/services/sales-support` |
| Authentication | `/login`, `/signup`, `/select-industry` |
| Client dashboard | `/client/dashboard`, `/overview`, `/files`, `/invoices`, `/invoices/[id]`, `/messages`, `/notifications`, `/payments`, `/project-requests`, `/project-requests/[requestId]`, `/projects`, `/projects/request`, `/projects/[projectId]`, `/settings` |
| Admin dashboard | `/admin/dashboard`, `/clients`, `/files`, `/finance`, `/invoices`, `/leads`, `/leads/new`, `/leads/[id]`, `/messages`, `/notifications`, `/project-requests`, `/project-requests/[id]`, `/projects`, `/projects/[projectId]`, `/reports`, `/resources`, `/sales`, `/services`, `/settings`, `/tasks` |
| Development-only | `/test` |

The public, auth, client, and admin route groups have their own layouts. Both dashboards share `DashboardLayout`, desktop/mobile sidebars, a dashboard navbar, and the common component library.

## 2. Existing design system audit

### Tokens and theme source

`app/styles/global.css` is the single active global theme source. It defines a composed light and dark system rather than relying on isolated component colours:

| Token area | Current approach |
| --- | --- |
| Brand | Deep navy (`#0a1628`) and gold (`#a67c27`; lighter dark-mode gold `#d4b86a`) |
| Surfaces | Warm off-white light background, navy-based dark background, card/popover/muted/border tokens |
| Typography | Foreground, heading, body, and muted-foreground tokens |
| Geometry | `--radius-control: 0.375rem`, `--radius-surface: 0.5rem` |
| Elevation | Card, hover-card, overlay, and gold-glow shadow tokens |
| Interaction | Global focus-visible ring, selection styling, theme transition, smooth scroll, reduced-motion CSS overrides |

The palette is coherent and already distinct from a generic blue SaaS dashboard. It reads as professional B2B: restrained navy structure with gold used as the focused accent.

### Component inventory

All shared UI primitives below have active consumers. The count reflects direct imports outside `components/ui` and is useful for prioritising future changes.

| Component | Direct consumer files | Notes |
| --- | ---: | --- |
| `Avatar` | 7 | Identity display across dashboard areas |
| `Button` | 76 | Primary interaction primitive; highest-impact component |
| `Card` | 83 | Main shared surface primitive |
| `ConfirmationModal` | 5 | Destructive/confirmation actions |
| `Container` | 88 | Page-width/layout primitive |
| `Dropdown` / `DropdownItem` | 7 / 4 | Menus, profile, actions, select composition |
| `Input` / `TextArea` / `Select` | 25 / 8 / 13 | Form control family |
| `Loader` | 6 | Loading states |
| `PageWrapper` / `Section` | 39 / 87 | Page rhythm and section layout |
| `PriorityBadge` / `StatusBadge` | 5 / 14 | Shared status language |
| `Switch` | 3 | Settings and toggle actions |
| `Table` | 17 | Data-dense dashboard pages |

The wider component tree is organised well by domain:

- `components/landing`: public marketing and service-page sections.
- `components/admin-dashboard` and `components/client-dashboard`: domain-specific dashboard compositions.
- `components/shared`: cross-shell pieces such as navigation, pagination, uploads, profile, notifications, and invoice PDF rendering.
- `components/ui`: reusable visual primitives.
- `components/features`: older feature-level components, currently less consistently integrated with the dashboard shell.

### Duplication and fragmentation to resolve later

These are consolidation opportunities, not recommended deletions yet:

| Area | Observation | Safer future direction |
| --- | --- | --- |
| Pagination | Shared `Pagination` is used by the current admin listing pages; `ProjectPagination` is an older local variant. | Migrate any desired project behaviour into the shared component, then remove only after a route-level visual check. |
| Notifications | Current shell includes `NotificationBell`; an older feature notification dropdown also exists. | Choose one data/loading/realtime implementation and migrate deliberately. |
| Status badges | Generic `StatusBadge` and `PriorityBadge` coexist with domain-specific lead, invoice, project, service, and file badges. | Keep domain mappings, but align the base badge anatomy, spacing, and semantic colours. |
| Layout primitives | `components/shared/Section` and `components/ui/Section` overlap by name; there is also a service-local `Container`. | Establish clear ownership and naming before consolidation. |
| Upload controls | `FileSelector` is used by inquiry/request forms; `FileUploader` is used by the admin project page. | They are both live, but their intended responsibilities should be documented before sharing or merging. |

## 3. Visual consistency findings

### What is working

- The navy/gold brand foundation, light/dark counterpart values, and surface elevations are already significantly more intentional than a stock Tailwind theme.
- The shared dashboard shell now provides a consistent navigation structure across admin and client areas.
- Control and surface radii are modest, which suits a serious B2B application.
- Global focus treatment and a CSS reduced-motion override are present.
- Shared primitives provide a credible foundation for a controlled refresh without redesigning every page independently.

### Weaknesses to address in a later implementation phase

1. **One-off visual values remain in UI code.** Examples include direct hex/RGB values in the footer, sidebar active treatment, overview charts, landing decorative gradients, and arbitrary colour/shadow values in several shared primitives. The email/PDF renderers should be treated separately because they are not browser UI.
2. **Surface hierarchy varies by page.** Some dashboard cards use the shared card system while other panels and tables use independently assembled `border`, `bg`, and shadow class combinations.
3. **Responsive intent is inconsistent.** Dashboard navigation is thoughtfully responsive, but tables, dense filters, and some public hero sections need an explicit small-screen audit rather than only utility-class adjustments.
4. **Motion needs a policy.** Current entry/hover motion is refined, but Framer Motion infinite animations are not automatically covered by the CSS reduced-motion rule. A shared motion preference should govern decorative looping animation.
5. **Semantic states need a common scale.** Success, warning, destructive, status and priority treatments are implemented in several places, making visual drift likely.
6. **Typography hierarchy is not yet systematised.** Tokens cover colour but there is no documented text-style scale for page titles, section titles, labels, supporting copy, table metadata, and metric values.
7. **A few legacy feature files do not follow current shell conventions.** Their inline styles and older rounded-full patterns are visually out of step with the active shared component system.

## 4. Safe cleanup candidates — analysis only

No file has been deleted. Each candidate was checked by two methods: (1) a repository-wide static import/reference scan excluding generated and dependency directories, and (2) file-specific Git history review. Build-level unused-export proof is unavailable because the project currently has unrelated TypeScript errors listed below.

| Candidate | Static-reference result | History review | Confidence | Recommendation |
| --- | --- | --- | --- | --- |
| `components/shared/AnimatedContainer.tsx` | No consumer import/reference found | Present in project history | Medium | Confirm no dynamic use, then remove in a dedicated cleanup change. Its header comment also points to an old source path. |
| `components/client-dashboard/projects/ProjectPagination.tsx` | No consumer import/reference found | Present in project history | Medium | Replace with the live shared `Pagination` only after confirming the client project list has no intended pagination UI. |
| `components/features/message/Message.tsx` | No consumer import/reference found | Present in project history | Medium | Confirm the dashboard navbar’s current message path replaces it, then remove. |
| `components/features/notification/Notification.tsx` | No consumer import/reference found | Present in project history | Medium | Compare required realtime behavior with `NotificationBell` before removal; do not remove solely on appearance. |
| `components/features/search/SearchArea.tsx` | No consumer import/reference found | Present in project history | Medium | Confirm global search is intentionally out of scope, then remove or reintroduce through the shared navbar system. |
| `app/styles/globals.css` | Not imported; currently empty | No meaningful style history signal | High | Remove only in a dedicated cleanup commit after confirming no tooling or documentation expects this filename. |

`FileUploader`, `FileSelector`, `DashboardSidebarItems`, and shared `Pagination` are **not** deletion candidates: each has live imports.

## 5. Verification notes

- The shared UI import scan confirms all current primitives have consumers; no unused shared primitive has been marked for removal.
- The repository type check is presently blocked by pre-existing unresolved mock-data imports, including the client overview and project dashboard/filter modules. These prevent using a whole-project TypeScript pass as an unused-export verifier.
- A production build is also currently unable to complete in this environment because external Google font downloads fail, in addition to the type issues above.

## 6. Proposed next gate

Phase 1 is complete. Before any design modification, approve a written design direction covering:

1. final visual principles for public marketing and dashboard surfaces;
2. a token/naming strategy for the existing navy/gold system;
3. component consolidation priorities;
4. responsive and accessibility rules; and
5. a page-by-page implementation order.

On approval, the next artifact will be `DESIGN_DIRECTION.md`. No visual implementation, dependency changes, or cleanup deletion should begin before that review.
