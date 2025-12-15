# ADR-003: Data Model Refinements (December 2025)

**Status**: Proposed  
**Date**: 2024-12-11  
**Deciders**: B

## Context

Following the adoption of the unified API response model (ADR-002), several open questions remained about specific entity structures. This ADR documents the decisions made to resolve these questions while maintaining simplicity for sustainability experts.

---

## Decisions

### ✅ 1. ProductionSource

#### 1.1 Keep `eventIds?: string[]`
- **Decision**: keep in current model.

- **Rationale**: While this could seem a redundant field, because in the embedded API response model events live as siblings in `EACertificate.events[]`, adding `eventIds` makes it explicit that ProductionSources have events that can be parsed. Additionally EACertificates will only show some of the events of the ProductionSoruce - only those relevant to the given EACertificate - while the ProductionSource could have many more events that are interesting to the user.

- **Future consideration**: If standalone `GET /production-sources/{id}` endpoint is needed, events can be included in that response directly rather than just as IDs.

#### 1.2 Add `documentIds?: string[]`
- **Decision**: Add for consistency with events pattern.

- **Rationale**: ProductionSources can have facility certifications, commissioning documents, etc. that exist in the parent certificate's documents array, but could also have other documents, not directly relevant for the EAC that could eventually be inspected by the user. However, as for events, the full information should be retrieved by a different future API endpoint.


- **Rationale**: Sustainability experts want to see "commissioned: 2019-03-15" not "see event ID xyz-123" and then have to parse the event. The comment "extrapolated for simplicity" captures the intent correctly.

#### 1.3 `technology` as `string[]` only
- **Decision**: Remove union type, use `string[]` exclusively.

- **Rationale**: Union types force frontend to check type before iterating. Arrays are always iterable. Single technology? Array of one. Much cleaner for consumers.


#### 1.4 Keep denormalized `operationStartDate` and `labels`
- **Decision**: Keep as simple values (`Date` and `string[]`), not event references.


#### 1.5: Related production sources via ids**
- **Decision**: `relatedProductionSources` should point to other `ProductionSource.id`, not `ExternalID`s.

- **Rationale**: Carbon credits reference connected projects. If we store only the ExternalID we assume that the EAC or document that has that information about the other connected project only shows an ID, but it could be just a name. By forcing the user to add an additional ProductionSource, and connecting it's ID, we are allowing to store all the available information about the connected project/ProductionSource.

---

### ✅ 2. EACEvent

#### 2.1 Merge `evDescription` and `evNotes` into `notes`
**Decision**: Keep only `notes?: string` (renamed from `evNotes`).

**Rationale**: The fields are redundant. The `ev` prefix is also redundant inside `EACEvent`. Single `notes` field serves both brief descriptions and longer freeform content.

#### 2.2 Add `EACEventType.OTHER` and `eTypeCustom`
**Decision**: Add both to enum and interface.

**Rationale**: Follows the established `OrgRoleType.OTHER` + `roleCustom` pattern. Provides extensibility without bloating the enum for edge cases.

---

### ✅ 3. EACertificate

#### 3.1 Certificate relationships ~~with context~~
 - **Decision**: for `relatedCertificates` just use `EACertificate.id` 

 - **Rationale**: keep complexity to the minimum for now. The connection or hierarchy can be inferred by the EACevents and their dates. Possibly in the future we will have to add a specific object with more properties To explain the relationship but for now we keep it simple 

🎗️ example of possible future relatedCertificate entity
```typescript
interface CertificateRelation {
  certId: string;
  relationship: CertRelationshipType;
  relationshipCustom?: string;
  notes?: string;
}
 
//possible values for the type
export enum CertRelationshipType {
  PARENT      = "PARENT",
  CHILD       = "CHILD",
  LINKED      = "LINKED",
  SUPERSEDES  = "SUPERSEDES",
  SPLIT_FROM  = "SPLIT_FROM",
  MERGED_INTO = "MERGED_INTO",
  OTHER       = "OTHER",
}

```


---

### ✅ 4. ExternalID

#### 4.1 Keep simple `id` field
**Decision**: Do not add separate `actualExternalId` field.

**Rationale**: Internal database IDs are implementation details—they shouldn't appear in the API response model. The `id` field IS the external identifier.


---

### ✅ 5. Amount

#### 5.1 Keep explicit `conversionFactorUnits`
**Decision**: Retain the field even though it could theoretically be derived.

**Rationale**: When a sustainability expert reads the JSON, they should immediately understand "this conversion factor is MWh per MMBTU" without mental gymnastics. Explicit is clearer than derived.

---

### ✅ 6. MetadataItem Usage

**Decision**: MetadataItem is appropriate for:

| Entity | Include? | Reasoning |
|--------|----------|-----------|
| ProductionSource | ✅ | Facility-specific custom data varies wildly |
| Document | ✅ | Document metadata varies by type |
| EACEvent | ✅ | Event-specific data varies by type (especially MRV) |
| EACertificate | ✅ | Escape hatch for rare certificate-specific data |
| Organization | ❌ | Use structured `contacts` array instead |

#### 6.1 EACertificate metadata - include with strong guidance

**Decision**: Include `metadata?: MetadataItem[]` on EACertificate, but document it as a last resort.

**Rationale**:
- Provides flexibility for edge cases where certificate-level properties genuinely don't belong to a specific event, document, or production source
- Handles unknown future requirements as we encounter new EAC types (RNG, SAF, carbon credits)
- Prevents awkward data modeling when forcing everything into events/documents doesn't make semantic sense

**Implementation**: Strong usage guidance added to [MetadataItem_doc.md](../01_entities/MetadataItem_doc.md) emphasizing:
- EACertificate metadata should be a **last resort**
- Users must first consider whether data belongs in EACEvent, Document, or ProductionSource
- Clear examples of appropriate vs. inappropriate usage
- Favor adding metadata to events or documents over certificate-level metadata

This maintains flexibility while guiding users toward better data organization.

---

### ✅ 7. Organization

#### 7.1 No `documents` field
**Decision**: Do not add to Organization.

**Rationale**: In the embedded API response, Organization appears as lightweight `OrganizationRole`. If full Organization with documents is needed, that's a separate endpoint concern.

---

## Open Questions for Future ADRs

1. **Certificate chain complexity**: How complex do RNG/SAF chains get? Linear only, or networks?
2. **EmissionsData completeness**: Does current structure handle all methodologies?
3. **ProductionSource standalone endpoint**: When needed, define response structure.

---

## References

- [ADR-002: API Response Model Architecture](./ADR-002-API-response-model.md)