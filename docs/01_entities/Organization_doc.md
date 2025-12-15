# Organization Schema

Entity representing organizations involved in certificate lifecycle.

**OrganizationRole** is a lightweight reference to an organization that appears in Events. It contains only the essential context (orgId, orgName, role) without the full organization details (contacts, location, etc.), keeping event payloads lean. Full Organization entities are retrieved separately when needed.

## TypeScript Interfaces

See [Organization.ts](../../src/entities/Organization.ts) for the canonical interface definitions.

```typescript
interface Organization {
  id: string;
  name: string;
  nameExpanded?: string;
  externalIDs?: ExternalID[];
  url?: string;
  description?: string;
  contacts?: Array<{
    value: string;
    label?: string;
  }>;
  location?: Location;
}

interface OrganizationRole {
  orgId: string;
  orgName: string;
  role: OrgRoleType;
  roleCustom?: string;
  externalIDs?: ExternalID[];
}
```

## JSON Examples

### Full Organization (standalone query)
```json
{
  "id": "org-mrets-001",
  "name": "M-RETS",
  "nameExpanded": "Midwest Renewable Energy Tracking System",
  "url": "https://www.mrets.org",
  "contacts": [
    { "value": "info@mrets.org", "label": "General email" },
    { "value": "+1-651-789-3338", "label": "Phone" }
  ],
  "location": {
    "country": "US",
    "state": "MN"
  }
}
```

### OrganizationRole (embedded in events)
```json
{
  "orgId": "org-mrets-001",
  "orgName": "M-RETS",
  "role": "REGISTRY"
}
```

---

## Organization Schema Table

| Field | Type | Required | Description | Constraints | Example | Notes |
|-------|------|----------|-------------|-------------|---------|-------|
| `id` | string | ✅ | unique identifier | | "org-mrets-001" | |
| `name` | string | ✅ | organization name | | "M-RETS" | |
| `nameExpanded` | string | | expanded name | | "Midwest Renewable Energy Tracking System" | for abbreviations |
| `externalIDs` | ExternalID[] | | external identifiers | | | registry IDs, LEI, etc. |
| `url` | string | | organization website | valid URL | "https://www.mrets.org" | |
| `description` | string | | description | | | |
| `contacts` | Array<{value: string, label?: string}> | | contact information | | see example | flexible contact info |
| `location` | Location | | headquarters location | | | |

---

## OrganizationRole Schema Table

Lightweight organization context used in events.

| Field | Type | Required | Description | Constraints | Example | Notes |
|-------|------|----------|-------------|-------------|---------|-------|
| `orgId` | string | ✅ | reference to Organization.id | | "org-mrets-001" | |
| `orgName` | string | ✅ | organization name | | "M-RETS" | denormalized for display |
| `role` | OrgRoleType | ✅ | role in this context | see [Enums](./Enums.md) | "REGISTRY" | |
| `roleCustom` | string | | custom role description | required when role = OTHER | "Intermediary" | |
| `externalIDs` | ExternalID[] | | context-specific external IDs | | | IDs relevant to this role |

## Business Rules

**BR-1: OrganizationRole name sync**
`orgName` should match the referenced Organization's `name` field. It's denormalized for display performance.

**BR-2: Custom role requirement**
When `role` is `OTHER`, `roleCustom` must be provided.

**BR-3: No documents on Organization**
Organization documents are not included in this model. If an organization's documents are needed, they appear through events where the organization participated.

## Design Rationale

**OrganizationRole vs full Organization**: Events only need who did what, not full org details (address, contacts). This keeps API responses lightweight. Full Organization data is available via separate endpoint.



**Flexible contacts**: Simple inline structure with `value` and optional `label` keeps the model lean while allowing any contact information (email, phone, social, etc.) without requiring type enums.

See [ADR-003: Data Model Refinements](../design-decisions/ADR-003-data-model-refinements.md) for decisions on contacts and documents.

## Related Entities

- [EACEvent](./EACEvent_doc.md): contains OrganizationRole array
- [ProductionSource](./ProductionSource_doc.md): may reference organizations
- [Location](./Location_doc.md): organization location
- [ExternalID](./ExternalID_doc.md): organization identifiers
- [Enums](./Enums.md): OrgRoleType values
