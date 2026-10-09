# HUB da Fé - Technical Plan

## Project Overview
Verified professional and business services directory for the HUB da Fé community.

## Tech Stack
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript (Strict)
- **Styling:** Tailwind CSS + shadcn/ui
- **Backend:** Supabase (Auth, PostgreSQL, Storage)
- **Validation:** Zod
- **Testing:** Vitest, Playwright

## Database Schema (Planned)
- `user_profiles`: Basic user identity.
- `user_roles`: RBAC (Provider, Administrator).
- `provider_profiles`: Public professional identity and state machine (draft -> pending -> approved).
- `categories`: Service taxonomy.
- `services`: Specific offerings by providers.
- `service_categories`: M:N mapping of services to categories.
- `service_photos`: Media for services.
- `provider_documents`: PDF presentations.
- `quote_requests`: Visitor inquiries.
- `admin_audit_logs`: Tracking administrative actions.

## Security Strategy
- **Supabase RLS:** Every table will have strict Row Level Security policies.
- **State Machine:** Enforce profile visibility based on `status` field.
- **Server-Side Validation:** Zod schemas for all API/Action inputs.
- **Role Protection:** Administrative functions strictly gated by `user_roles`.

## Roadmap
- Phase 1: Foundation (Init, basic layout, Supabase client)
- Phase 2: Auth & Permissions (Login, Role management, RLS)
- Phase 3: Profiles & Services (CRUD, Image uploads, Approval flow)
- Phase 4: Public Directory (Search, Filter, Profile pages)
- Phase 5: Quote Requests (Public form, Provider inbox)
- Phase 6: PWA & Production (Manifest, SEO, Privacy)
- Phase 7: Final Verification (E2E Tests)
