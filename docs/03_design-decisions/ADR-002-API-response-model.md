# ADR 002: API Response Model Architecture

**Status**: Accepted  
**Date**: 2024-12-10  
**Deciders**: B.

## Context

PEACH needs a data model that serves two audiences:
1. **Sustainability experts** - Need to understand certificate structure conceptually
2. **Developers** - Need TypeScript definitions for implementation

We considered three approaches:
1. **Pure relational model** - All entities separate, linked by IDs only
2. **Dual model** - Separate "entity model" and "API response model"
3. **Unified API response model** - Single model representing what APIs return

## Decision

We adopt a **unified API response model** where the data model represents what APIs return when querying certificates.

### Structure
- `EACertificate` embeds related entities as full objects (`productionSource`, `documents[]`, `events[]`)
- Events reference documents by ID (`documentIds[]`) to avoid duplication within a single response
- Organizations are embedded in events as `OrganizationRole[]` (lightweight context: ID, name, role) rather tan full Organization objects;(event-specific context)

### Example
```typescript
interface EACertificate {
  id: string;

  // Embedded full objects
  productionSource: ProductionSource;
  documents: Document[];
  events: EACEvent[];
}

interface EACEvent {
  documentIds: string[];  // IDs only (reference certificate.documents[])
  organizations: OrganizationRole[];  // Full objects
}
```

## Rationale

### Why Unified Model?
- **Matches primary use case (98%)**: "get complete certificate with all data"
- **Simpler for sustainability experts**: "certificate has events and documents"
- **Avoids DTO confusion**: one definition serves both audiences
- **Backend flexibility**: we define response structure, not storage implementation

### Why Embed Most Entities?
- **Natural hierarchy**: certificate owns events, documents, and has relationship to source
- **Single API call**: returns everything needed
- **Clear ownership**: certificate → events → document references

### Why Events Use documentIds (Not Full Objects)?
- **Prevents duplication**: same truck receipt referenced by multiple events appears once in `documents[]`
- **Maintains referential integrity**: all document data in one place
- **Prevents inconsistency**: same doc with different data in multiple places)

### Why OrganizationRole (Not Full Organization)?
- **Lightweight context**: Events only need who did what, not full org details (address, contacts, etc.)
- **Event-specific information**: Role is specific to this event
- **Performance**: Smaller responses without unnecessary organization data

## Consequences

### Positive
- ✅ Single model to maintain (`docs/entities/` and `src/entities/`)
- ✅ Clear for non-developers: "Certificate contains events, events reference documents"
- ✅ No context-dependent fields
- ✅ Backend flexibility (can store normalized, return denormalized)

### Negative
- ❌ Event reuse across certificates means duplication in API responses
- ❌ Shared documents (truck receipt for multiple certs) duplicated in each response
- ❌ "Get all events" endpoint needs different structure (future: `docs/implementation/api/`)

### Mitigations
- Document "shared entity" pattern for future endpoints (separate ADR when needed)
- Backend can optimize storage with relational tables + junction tables
- Can add separate endpoint patterns in `docs/implementation/api/` without changing core model

## Alternative Considered

**Dual Model Approach**: Separate "entity definitions" (ID references only) and "API response patterns" (embedded objects).

**Rejected because**:
- More complex to maintain (two models)
- Confusing for sustainability experts: "Which model do I read?"
- Doesn't match stated goal: "Show what APIs return"

## References
- [PEACH Protocol Documentation Standard](../PEACH_Protocol_Documentation_Standard.md)
- [Compositional vs Relational Architecture Analysis](../../research/Compositional-vs-Relational-Architecture.md)

## Future Considerations

If query patterns shift significantly (e.g., 50% of queries are "find all certificates with document X"):
1. Consider adding `docs/implementation/api/query-optimization.md`
2. May add computed indexes or materialized views in backend
3. Core data model remains unchanged (this defines response structure)
```