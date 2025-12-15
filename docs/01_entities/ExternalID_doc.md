# ExternalID Schema

Links to identifiers used by external systems such as registries and organizations.

## TypeScript Interface

See [ExternalID.ts](../../src/entities/ExternalID.ts) for the canonical interface definition.

```typescript
interface ExternalID {
  id: string;
  ownerOrgId?: string;
  ownerOrgName?: string;
  description?: string;
  externalFieldName?: string;
}
```

## JSON Example

```json
{
  "id": "M-RETS-2024-00123456",
  "ownerOrgId": "org-mrets-001",
  "ownerOrgName": "M-RETS",
  "description": "M-RETS certificate serial number",
  "externalFieldName": "Serial Number"
}
```

## Schema Table

| Field | Type | Required | Description | Constraints | Example | Notes |
|-------|------|----------|-------------|-------------|---------|-------|
| `id` | string | ✅ | the external identifier value | | "M-RETS-2024-00123456" | the actual ID from external system |
| `ownerOrgId` | string | | organization that uses this ID | valid Organization.id | "org-mrets-001" | |
| `ownerOrgName` | string | | organization name | | "M-RETS" | denormalized for display |
| `description` | string | | what this ID represents | | "certificate serial number" | |
| `externalFieldName` | string | | field name in external system | | "Serial Number" | helps with data mapping |

## Business Rules

**BR-1: Unique within context**
The same `id` value can appear multiple times across different `ownerOrgId` values (different registries may use the same ID format).


## Design Rationale

ExternalID captures the identifier value as-is from the external system. The `id` field IS the external identifier—no separate internal ID is needed in the API response model.

- [ADR-003: Data Model Refinements](../03_design-decisions/ADR-003-Data-Model-Refinements.md) - decision on id vs actualExternalId

## Related Entities

- [EACertificate](./EACertificate_doc.md): certificates have external registry IDs
- [ProductionSource](./ProductionSource_doc.md): facilities have external IDs
- [Organization](./Organization_doc.md): organizations have external IDs
