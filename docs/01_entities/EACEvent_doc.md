# EACEvent Schema

Lifecycle event for certificates, production sources, or physical products.

## TypeScript Interface

See [EACEvent.ts](../../src/entities/EACEvent.ts) for the canonical interface definition.

```typescript
interface EACEvent {
  id: string;
  eType: EACEventType;
  eTypeCustom?: string;
  
  eTarget: EACEventTargetType;
  eTargetId?: string[];
  
  dates: {
    start: string;  // ISO 8601 date or datetime (YYYY-MM-DD or YYYY-MM-DDThh:mm:ss[Z|±hh:mm])
    end?: string;   // ISO 8601 date or datetime (YYYY-MM-DD or YYYY-MM-DDThh:mm:ss[Z|±hh:mm])
  };
  location?: Location;
  
  notes?: string;
  value?: string;
  
  organizations: OrganizationRole[];
  documentIds: string[];
  
  metadata?: MetadataItem[];
}
```

## JSON Example

a REDEMPTION event
```json
{
  "id": "evt-001",
  "eType": "REDEMPTION",
  "eTarget": "EAC",
  "eTargetId": ["cert-001"],
  "dates": {
    "start": "2024-06-15"
  },
  "notes": "retired for 2024 sustainability report",
  "organizations": [
    { "orgId": "org-corp-001", "orgName": "Acme Corp", "role": "EACBENEFICIARY" }
  ],
  "documentIds": ["doc-retirement-001"]
}
```
or a LABELING event
```json
{
  "id": "evt-002",
  "eType": "MRVLABELING",
  "eTarget": "EAC",
  "eTargetId": ["cert-001"],
  "dates": {
    "start": "2024-06-15"
  },
  "notes": "retired for 2024 sustainability report",
  "value": "Green-e",
  "organizations": [
    { "orgId": "org-002", "orgName": "CRS", "role": "MRV_LABEL" }
  ],
  "documentIds": ["doc-retirement-001", "doc-labeling-001"]
}
```
or a PRODUCTION event with hourly matching
```json
{
  "id": "evt-003",
  "eType": "PRODUCTION",
  "eTarget": "EAC",
  "eTargetId": ["cert-solar-001"],
  "dates": {
    "start": "2024-06-15T14:00:00Z",
    "end": "2024-06-15T15:00:00Z"
  },
  "notes": "solar production for hourly matching",
  "value": "1500",
  "organizations": [
    { "orgId": "org-solar-001", "orgName": "SolarFarm Inc", "role": "PRODUCER" }
  ],
  "documentIds": ["doc-meter-reading-001"]
}
```

## Schema Table

| Field | Type | Required | Description | Constraints | Example | Notes |
|-------|------|----------|-------------|-------------|---------|-------|
| `id` | string | ✅ | unique event identifier | | "evt-001" | |
| `eType` | [EACEventType](./Enums_doc.md) | ✅ | type of event | see [Enums](./Enums_doc.md) | "REDEMPTION" | |
| `eTypeCustom` | string | | custom event type | required when eType = OTHER | "CUSTOM_AUDIT" | |
| `eTarget` | [EACEventTargetType](./Enums_doc.md) | ✅ | what this event is about | see [Enums](./Enums_doc.md) | "EAC" | |
| `eTargetId` | string[] | | IDs of affected entities (EACertificate.id or ProductionSource.id) | min 1 item | ["cert-001"] | array for batch operations |
| `dates.start` | string | ✅ | when event started | ISO 8601 date or datetime | "2024-06-15" or "2024-06-15T14:30:00Z" | Use date-only for daily events; use datetime with timezone for hourly matching |
| `dates.end` | string | | when event ended | ISO 8601 date or datetime | "2024-06-15" or "2024-06-15T15:00:00Z" | Optional; for duration events |
| `location` | [Location](./Location_doc.md) | | where event occurred | | | for physical events |
| `notes` | string | | event description or notes | | "retired for 2024 report" | freeform text |
| `value` | string | | quick access to event value | | "A+" (rating) or "Green-E" (label) | ratings, labels, quantities |
| `organizations` | [OrganizationRole[]](./Organization_doc.md) | ✅ | organizations involved | min 1 item | | who did what |
| `documentIds` | string[] | ✅ | references to proof documents | valid Document.docId | ["doc-001"] | |
| `metadata` | [MetadataItem[]](./MetadataItem_doc.md) | | additional event metadata | | | event-specific properties |

## Business Rules

**BR-1: Custom event type**
When `eType` is `OTHER`, `eTypeCustom` must be provided to describe the custom event.

**BR-2: Target ID interpretation and rules**
`eTargetId` contents depend on `eTarget`:
- `EAC`: certificate IDs (EACertificate.id)
- `PRODUCT`: product identifiers (⚠️ future feature, not currently supported by PEACH)
- `PSOURCE`: production source IDs (ProductionSource.id)

**validation-rules**: 
  - when eTarget == "EAC" or "PSOURCE", we should enforce asking for the `eTargetId`, 
  - when eTarget == "PRODUCT" or "OTHER", we should allow to leave eTargetId empty

**BR-3: Document references**
`documentIds` reference documents in the parent certificate's `documents[]` array. This prevents document duplication when multiple events reference the same document.

**BR-4: Date format flexibility**
The `dates.start` and `dates.end` fields accept ISO 8601 strings in two formats:
- **Date only** (`YYYY-MM-DD`): Used for most events where daily precision is sufficient (e.g., "2024-06-15")
- **Datetime with timezone** (`YYYY-MM-DDThh:mm:ss[Z|±hh:mm]`): Required for hourly renewable energy matching where precise timing matters (e.g., "2024-06-15T14:30:00Z" or "2024-06-15T14:30:00+05:30")

When using datetime format, timezone information is **mandatory** (either "Z" for UTC or an explicit offset like "+05:30"). Datetime without timezone (e.g., "2024-06-15T14:30:00") is **not allowed** as it creates ambiguity.

Applications should accept both formats and default to date-only unless hourly precision is needed.

**BR-5: Hourly matching precision**
When `eType` is `PRODUCTION` and the certificate is used for hourly renewable energy matching, `dates.start` and `dates.end` MUST use the datetime format with timezone information. This ensures accurate time-of-use tracking for grid matching requirements. For all other events, date-only format is recommended unless specific hourly tracking is needed.

## Event Type Categories

| Category | Types | Typical Target | Example |
|----------|-------|----------------|---------|
| Lifecycle | CREATION, ACTIVATION, PAUSE, SUSPENSION, TERMINATION | PSOURCE | facility commissioned |
| Production | PRODUCTION | EAC | energy generated |
| Certificate | ISSUANCE, REDEMPTION, TRANSFER | EAC | certificate retired |
| Chain-of-custody | TRANSPORT, INJECTION | PRODUCT | biogas injected to pipeline |
| MRV | MRVAUDIT, MRVLABTEST, MRVERIFICATION, MRVVALIDATION, MRVRATING, MRVLABELING | varies | third-party audit |

## Design Rationale

**OTHER pattern**: Added `EACEventType.OTHER` + `eTypeCustom` following the established pattern for extensibility.

**Document references by ID**: Events reference documents by `docId` rather than embedding full document objects. This prevents duplication and circularity when the same document (e.g., a truck receipt) is referenced by multiple events.

See [ADR-002: API Response Model](../03_design-decisions/ADR-002-API-response-model.md) and [ADR-003: Data Model Refinements](../03_design-decisions/ADR-003-Data-Model-Refinements.md).

## Related Entities

- [EACertificate](./EACertificate_doc.md): contains events array
- [OrganizationRole](./Organization_doc.md): who participated
- [Document](./Document_doc.md): proof documents (referenced by ID)
- [Location](./Location_doc.md): where event occurred
- [MetadataItem](./MetadataItem_doc.md): event-specific properties
- [Enums](./Enums_doc.md): EACEventType, EACEventTargetType values
