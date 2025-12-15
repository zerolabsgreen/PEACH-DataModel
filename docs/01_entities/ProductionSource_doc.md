# ProductionSource Schema

Origin facility or project where the environmental attribute was generated.

## TypeScript Interface

See [ProductionSource.ts](../../src/entities/ProductionSource.ts) for the canonical interface definition.

```typescript
interface ProductionSource {
  id: string;
  externalIDs?: ExternalID[];
  eacTypes: EACType[];
  
  name?: string;
  description?: string;
  location?: Location;
  organizations?: OrganizationRole[];
  
  technology: string[];
  operationStartDate?: string;  // ISO 8601 date YYYY-MM-DD
  labels?: string[];
  
  relatedProductionSources?: string[];
  documentIds?: string[];
  eventIds?: string[]; 
  metadata?: MetadataItem[];
}
```

## JSON Example

```json
{
  "id": "ps-001",
  "externalIDs": [
    {
      "id": "GEN-12345",
      "ownerOrgName": "M-RETS",
      "externalFieldName": "Generator ID"
    }
  ],
  "eacTypes": ["REC"],
  "name": "Sunshine Valley Solar Farm",
  "location": {
    "country": "US",
    "subdivision": "CA",
    "latitude": 35.3733,
    "longitude": -118.9014
  },
  "organizations": [
    { "orgId": "org-001", "orgName": "SolarCo Inc.", "role": "PRODUCER" }
  ],
  "technology": ["Solar PV"],
  "commissioningDate": "2019-03-15",
  "labels": ["Green-e Certified"],
  "relatedProductionSources": ["ps-002", "ps-003"],
  "documentIds": ["doc-facility-001"],
  "eventIds": ["event-001", "event-002"]
}
```

## Schema Table

| Field | Type | Required | Description | Constraints | Example | Notes |
|-------|------|----------|-------------|-------------|---------|-------|
| `id` | string | ✅ | unique identifier | | "ps-001" | |
| `externalIDs` | ExternalID[] | | external registry identifiers | | | generator IDs, facility codes |
| `eacTypes` | EACType[] | ✅ | certificate types this source produces | min 1 item | ["REC"] | some facilities produce multiple types |
| `name` | string | | facility or project name | | "Sunshine Valley Solar" | |
| `description` | string | | facility description | | | |
| `location` | Location |  | facility location | | | see [Location](./Location.md) |
| `organizations` | OrganizationRole[] | | key organizations | | | owner, operator |
| `technology` | string[] | ✅ | technology or feedstock types | min 1 item | ["Solar PV"] | valid values in EACTypeSettings |
| `operationStartDate` | string | | when facility became operational | ISO 8601 date | "2019-03-15" | critical for eligibility |
| `labels` | string[] | | certifications and labels | | ["Green-e Certified"] | |
| `documentIds` | string[] | | references to related documents | valid Document.docId | ["doc-facility-001"] | facility certifications |
| `eventIds` | string[] | | references to EACEvent | valid EACEvent.id | ["event-001"] | facility certification event |
| `metadata` | MetadataItem[] | | additional source metadata | | | facility-specific properties |

## Business Rules

**BR-1: Technology array**
Always use `string[]` even for single technology. Valid values are defined in EACTypeSettings per certificate type.

**BR-2: Date serialization**
`operationStartDate` serializes as ISO 8601 date string (YYYY-MM-DD) in JSON.

**BR-3: references to documents and events**
`documentIds` reference documents in the parent certificate's `EACertificate.documents[]` array, but could have additional Ids that are not included in the list and should be independently queried.

`eventIds` reference events in the parent certificate's `EACertificate.events[]` array, but could have additional Ids that are not included in the list and should be independently queried.

**BR-4: Related production sources**
`relatedProductionSources` should point to other `ProductionSource.id`, not `ExternalID`s.
(needed for carbon credits with connected projects)

## Design Rationale

**references to Events and Documents**: makes it explicit that ProductionSources have events and documents, beyond what the EACertificate can have. but we are presenting only the IDs. Applications should first parse EACErtificate `events` and `documents[]` for the entities relevant to the given certificate.

**Denormalized fields**: `commissioningDate` and `labels` are denormalized from events for simplicity. Sustainability experts want to see these values directly, not navigate to events.

**Technology as array**: Using `string[]` instead of `string | string[]` simplifies frontend iteration—no type checking needed.


See [ADR-003: Data Model Refinements](../design-decisions/ADR-003-data-model-refinements.md) for detailed rationale.

## Related Entities

- [EACertificate](./EACertificate_doc.md): contains productionSource
- [Location](./Location_doc.md): facility location
- [OrganizationRole](./Organization_doc.md): facility owner, operator
- [ExternalID](./ExternalID_doc.md): registry identifiers
- [Document](./Document_doc.md): facility documentation
- [MetadataItem](./MetadataItem_doc.md): custom facility properties
- [Enums](./Enums_doc.md): EACType values
