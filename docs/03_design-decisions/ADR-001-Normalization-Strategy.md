# ADR-001: Normalization Strategy

**Status**: Accepted  
**Date**: 2025-11-13

---

## Context

PEACH manages certificates with relationships to Organizations, ProductionSources, and Documents. Need to balance query performance (certificates displayed frequently) with data consistency (orgs/sources used across many certificates).

Database: PostgreSQL with JSONB.

---

## Decision

**Normalize by default. Denormalize only organization names for display performance.**

### Core Pattern: Store IDs, Return Full Objects via DTOs

**In Database**:
```typescript
interface EACertificate {
  productionSourceId: string;  // Just ID
  events: EACEvent[];          // Events have orgId references
}
```

**In API Response**:
```typescript
interface EACertificateDTO extends EACertificate {
  productionSource: ProductionSource;  // Full object joined
  organizations: Organization[];       // Joined from events
}
```

### Two Exceptions (Denormalized)

1. **OrganizationRole.orgName** - for certificate list display
2. **ExternalID.ownerOrgName** - for human-readable IDs

Both written by frontend (not user-editable), ensuring consistency.

---

## Consequences

**Positive**:
- Single source of truth for org/source data
- Storage efficient (no duplicate objects)
- Simple pattern to follow for new entities

**Negative**:
- Updating denormalized `orgName` requires updating multiple records
- Denormalized data could drift if frontend logic fails

**Mitigation**: Frontend enforces correct writing of denormalized fields.

---

## Alternatives Considered

**Full Denormalization**: Store complete objects everywhere.  
Rejected: Wastes storage, update complexity.

**Pure Normalization**: Store only IDs, always JOIN.  
Rejected: Poor UX for lists (need org names constantly).
