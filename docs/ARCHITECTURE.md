# HUB da Fé - Detailed Technical Specification (MVP)

## 1. General Architecture
The application follows a **Modular Feature-Based Architecture** to ensure scalability and separation of concerns.

### Directory Organization
- `src/app`: Next.js App Router. Contains page definitions, layouts, and server-side route handling.
- `src/features`: The core of the business logic. Each feature is a self-contained module:
    - `/api`: Server Actions for data mutation and secure server-side fetching.
    - `/components`: UI components specific to the feature.
    - `/hooks`: Feature-specific React hooks for state and logic.
    - `/types`: TypeScript interfaces and Zod validation schemas.
    - `/services`: Encapsulated Supabase queries.
- `src/components/ui`: Atomic, reusable design system components (based on Tailwind 4).
- `src/lib`: Cross-cutting concerns.
    - `/supabase`: Client and Server clients for Supabase.
    - `/security`: Middleware and authorization helpers.
    - `/validation`: Shared Zod schemas.
    - `/utils`: General purpose helpers.

---

## 2. Authentication & Authorization Strategy
We will use **Supabase Auth** integrated with **PostgreSQL Row Level Security (RLS)** to ensure data integrity and privacy.

### Role-Based Access Control (RBAC)
Roles are stored in the `profiles` table:
- `USER`: Basic authenticated user.
- `PROVIDER`: Professional who has requested to join the directory.
- `ADMIN`: Leadership with moderation and management powers.

### Permission Matrix

| Action | Public (Anon) | Authenticated User | Provider | Administrator |
| :--- | :---: | :---: | :---: | :---: |
| View Home/Directory | ✅ | ✅ | ✅ | ✅ |
| View Approved Profiles | ✅ | ✅ | ✅ | ✅ |
| Create Account | ✅ | - | - | - |
| Request Provider Status | ✅ | ✅ | - | - |
| Edit Own Profile | - | - | ✅ | ✅ |
| Create/Edit Services | - | - | ✅ | ✅ |
| Approve/Suspend Profiles | - | - | - | ✅ |
| Approve/Reject Services | - | - | - | ✅ |
| Manage Categories | - | - | - | ✅ |
| View Own Quotes | - | - | ✅ | ✅ |
| View All Quotes | - | - | - | ✅ |

### RLS Implementation Strategy
- **Profiles**: `SELECT` allowed for all if `status = 'approved'`. `UPDATE` allowed only if `auth.uid() = id`.
- **Services**: `SELECT` allowed for all if `status = 'published'`. `UPDATE` allowed only if `auth.uid() = provider_id`.
- **Quote Requests**: `INSERT` allowed for anyone. `SELECT` allowed only if `auth.uid() = provider_id`.

---

## 3. Data Model (PostgreSQL)

### `profiles`
| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | uuid | PK, FK (auth.users) | Unique user identifier. |
| `email` | text | Unique | User email. |
| `full_name` | text | - | Full name for internal use. |
| `role` | enum | Default: 'USER' | `USER`, `PROVIDER`, `ADMIN`. |
| `created_at` | timestamptz | - | Account creation date. |

### `providers`
| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | uuid | PK | Provider identifier. |
| `profile_id` | uuid | FK (profiles.id) | Link to account. |
| `business_name` | text | Not Null | Public business name. |
| `bio` | text | - | Professional summary. |
| `status` | enum | Default: 'draft' | `draft`, `pending`, `approved`, `suspended`. |
| `location` | text | Optional | City/State or "Remote". |
| `remote_available`| bool | Default: false | If the professional works remotely. |
| `whatsapp` | text | Optional | Public contact number. |
| `email_public` | text | Optional | Public contact email. |
| `instagram` | text | Optional | Social link. |
| `website` | text | Optional | Personal/Business site. |
| `created_at` | timestamptz | - | - |
| `updated_at` | timestamptz | - | - |

### `categories`
| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | uuid | PK | Category identifier. |
| `name` | text | Unique, Not Null | Category name (e.g., "Contabilidade"). |
| `slug` | text | Unique, Not Null | URL-friendly name. |
| `description` | text | - | Category description. |

### `services`
| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | uuid | PK | Service identifier. |
| `provider_id` | uuid | FK (providers.id) | Owner of the service. |
| `category_id` | uuid | FK (categories.id) | Assigned category. |
| `title` | text | Not Null | Service name. |
| `description` | text | - | Detailed offering. |
| `price_type` | enum | - | `fixed`, `from`, `range`, `budget`. |
| `price_value` | text | Optional | The value or range. |
| `status` | enum | Default: 'draft' | `draft`, `pending`, `published`. |
| `pending_data` | jsonb | Optional | Stores proposed changes during review. |
| `created_at` | timestamptz | - | - |
| `updated_at` | timestamptz | - | - |

### `quote_requests`
| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | uuid | PK | Request identifier. |
| `service_id` | uuid | FK (services.id) | Target service. |
| `customer_name` | text | Not Null | Requester name. |
| `customer_email` | text | Not Null | Requester email. |
| `customer_phone` | text | - | Requester phone. |
| `message` | text | Not Null | Request details. |
| `created_at` | timestamptz | - | - |

### `admin_audit_logs`
| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | uuid | PK | Log identifier. |
| `admin_id` | uuid | FK (profiles.id) | Who performed the action. |
| `action` | text | Not Null | Action name (e.g., "APPROVE_PROVIDER"). |
| `target_id` | uuid | - | ID of the affected entity. |
| `old_value` | jsonb | - | Previous state. |
| `new_value` | jsonb | - | New state. |
| `created_at` | timestamptz | - | - |

---

## 4. Routes and State Machine

### Public Routes
- `/` $\rightarrow$ Home.
- `/diretorio` $\rightarrow$ Directory listing (Filters by `services.status = 'published'`).
- `/diretorio/[slug]` $\rightarrow$ Public Provider Profile (Shows `providers.status = 'approved'`).

### Provider Routes (Protected)
- `/perfil` $\rightarrow$ Profile Dashboard.
- `/perfil/servicos` $\rightarrow$ Service Management (CRUD).
- `/perfil/orcamentos` $\rightarrow$ Quote Inbox.

### Admin Routes (Protected)
- `/admin` $\rightarrow$ Overview Dashboard.
- `/admin/aprovações` $\rightarrow$ Moderation Queue (Profiles & Services).
- `/admin/categorias` $\rightarrow$ Taxonomy Management.

### Profile/Service State Machine
1. **Draft**: User is filling in data. Not visible to anyone but owner.
2. **Pending**: User submitted for review. Owner can still edit (might reset to draft).
3. **Approved/Published**: Admin validated. Visible in public directory.
4. **Suspended**: Admin revoked access. Hidden from public, owner notified.

---

## 5. Moderation Logic: Simple vs Significant Changes

When a `published` service is edited:

### Simple Changes (Direct Publication)
- Correcting typos in description.
- Updating contact links (WhatsApp/Instagram).
- Minor wording adjustments that don't change the nature of the service.
- **Action**: `updated_at` is refreshed, content is updated immediately.

### Significant Changes (Require Review)
- Changing the `title` of the service.
- Changing the `category_id`.
- Changing the `price_type` or `price_value`.
- Major rewrite of the service description.
- **Action**: 
    1. Proposed changes are saved in `pending_data` (JSONB).
    2. `status` remains `published` (public sees the old version).
    3. A notification is sent to Admin.
    4. Once Admin approves, `pending_data` is merged into the main columns and `pending_data` is cleared.

---

## 6. Quality and Testing Plan

### Validation
- **Client-side**: `react-hook-form` + `zod`.
- **Server-side**: Zod schemas in Server Actions before any Supabase mutation.

### Testing Levels
1. **Unit**: Testing `src/lib/utils` and Zod schemas.
2. **Integration**: Using a dedicated Supabase test project to verify RLS policies.
3. **E2E**: Playwright flows:
    - `Visit Home` $\rightarrow$ `Search Service` $\rightarrow$ `Request Quote`.
    - `Signup` $\rightarrow$ `Fill Provider Profile` $\rightarrow$ `Submit for Review`.
    - `Admin Login` $\rightarrow$ `Approve Provider` $\rightarrow$ `Verify Public Visibility`.

### Acceptance Criteria (Phase 1)
- Data model covers all business rules from the Master Plan.
- RBAC and RLS strategy is fully documented.
- Route map is complete.
- Moderation logic for simple vs significant changes is defined.
- Testing strategy is established.
