# EACertificate

The complete Environmental Attribute Certificate with all related data. This represents what the API returns when fetching a certificate.

## Structure Overview

A certificate contains:
- **Identity**: Unique identifiers and type information
- **Quantities**: Amounts and emissions data
- **Production Source**: Where the environmental attribute was generated
- **Documents**: All supporting documentation (certificate PDFs, proofs, receipts)
- **Events**: Lifecycle history (production, transport, issuance, redemption)

**Key Pattern**: Events reference documents by ID to avoid duplication within the response.

## TypeScript Interface

See [EACertificate.ts](../../src/entities/EACertificate.ts) for the canonical definition.
```typescript
interface EACertificate {
  id: string;
  type: EACType;
  type2?: string;  
  
  amounts: [Amount, ...Amount[]];
  emissions?: EmissionsData[];  
  
  productionSource: ProductionSource;
  productionTech: string; 

  documents: [Document, ...Document[]];
  events: [EACEvent, ...EACEvent[]];

  relatedCertificates?: string[];          

  links?: string[];                        
  metadata?: MetadataItem[];               
}
```


## JSON Example #1 - RECs

```json
{
  "id": "cert-2024-001",
  "type": "REC",
  "type2": "I-REC",
  "externalIDs": [
    { "id": "IREC-US-2024-00123", "ownerOrgName": "I-REC Standard" }
  ],
  
  "amounts": [
    { "amount": 1000, "unit": "MWh", "isPrimary": true }
  ],
  
  "productionSource": {
    "id": "ps-001",
    "name": "Sunshine Valley Solar Farm",
    "location": { "country": "US", "subdivision": "CA" },
    "technology": ["Solar"],
  },
  "productionTech": "Solar",
  
  "documents": [
    {
      "docId": "doc-001",
      "url": "https://permanent-storage.example.com/cert-001.pdf",
      "fileType": "REDEMPTION",
      "title": "Certificate of Origin"
    }
  ],
  
  "events": [
    {
      "id": "evt-001",
      "eType": "ISSUANCE",
      "eTarget": "EAC",
      "eTargetId": ["cert-2024-001"],
      "dates": { "start": "2024-01-15T10:00:00Z" },
      "organizations": [
        { "orgId": "org-001", "orgName": "I-REC Standard", "role": "ISSUER" }
      ],
      "documentIds": ["doc-001"]
    }
  ],
  
  "links": ["https://registry.example.com/public/cert-2024-001" ]
}
```


## JSON Example  #2 - RNG
```json
{
  "id": "rng-cert-999",
  "type": "RNG",
  "type2": "Biomethane",
  "amounts": [
    {"amount": 1000, "unit": "MMBTU", "isPrimary": true}
  ],

  "productionSource": {
    "id": "digester-456",
    "name": "BioPower Digester #3",
    "location": {"country": "US", "subdivision": "CA"}
  },
  "productionTech": "Biomass"
  
  "documents": [
    {
      "docId": "doc-cert-pdf",
      "url": "https://...",
      "fileType": "CERTIFICATE",
      "title": "RNG Certificate"
    },
    {
      "docId": "doc-truck-receipt",
      "url": "https://...",
      "fileType": "CONSIGNMENT",
      "title": "Truck Receipt"
    }
  ],
  
  "events": [
    {
      "id": "evt-transport",
      "eType": "TRANSPORT",
      "eTarget": "PRODUCT",
      "dates": {"start": "2024-02-01"},
      "organizations": [
        {
          "organizationId": "org-trucking",
          "orgName": "Green Trucking LLC",
          "role": "TRANSPORT"
        }
      ],
      "documentIds": ["doc-truck-receipt"]
    },
    {
      "id": "evt-issuance",
      "eType": "ISSUANCE",
      "eTarget": "EAC",
      "dates": {"start": "2024-02-10"},
      "organizations": [
        {
          "organizationId": "org-registry",
          "orgName": "M-RETS",
          "role": "ISSUER"
        }
      ],
      "documentIds": ["doc-cert-pdf"]
    }
  ],
  
  
}
```


## Schema Table

| Field | Type | Required | Description | Constraints | Example | Notes |
|-------|------|----------|-------------|-------------|---------|-------|
| `id` | string | ✅ | unique certificate identifier | | "cert-2024-001" | |
| `type` | [EACType](./Enums_doc.md) | ✅ | certificate type | see [Enums](./Enums_doc.md) | "REC" | |
| `type2` | string | | certificate subtype | valid value in[EACTypeSettings] | "I-REC" | e.g., GO, I-REC |
| `externalIDs` | ExternalID[] | | external identifiers | | | registry serial numbers |
| `amounts` | [Amount[]](./Amount_doc.md) | ✅ | quantity measurements | min 1 item | | see [Amount](./Amount_doc.md) |
| `emissions` | [EmissionsData[]](./EmissionsData_doc.md) | | emissions data | | | see [EmissionsData](./EmissionsData_doc.md) |
| `productionSource` | [ProductionSource](./ProductionSource_doc.md) | ✅ | where attribute originated | | | see [ProductionSource](./ProductionSource_doc.md) |
| `productionTech` | string | ✅ | production technology | valid value in [EACTypeSettings] | "Solar" | |
| `documents` | [Document[]](./Document_doc.md) | ✅ | related documents | min 1 item | | see [Document](./Document_doc.md) |
| `events` | [EACEvent[]](./EACEvent_doc.md) | ✅ | lifecycle events | min 1 item | | see [EACEvent](./EACEvent_doc.md) |
| `relatedCertificates` | string[] | | related certificates | array of `EACertificate.id` | | for chain of custody or for connecting a GO (EU Guarantee of Origin) with the relevant Proof-of-Sustainability certificate  |
| `links` | CertificateLink[] | | external URLs | | | proofs, public pages |
| `metadata` | [MetadataItem[]](./MetadataItem_doc.md) | | additional metadata | | | see [MetadataItem](./MetadataItem_doc.md) |


## Business Rules

**BR-1: Events** \
Certificates are documents that inherently 'narrate' events. Typically each certificate represents in the majority of cases two different events :
  1. the event representing the redemption, or creation and issuance of the specific EAC document
  2. more importantly, the event representing the production of the emissions reduction claim (eg the 'vintage' or period of time of generation of renewable energy or other type )

\
**BR-2: Event Ordering**\
Events should be ordered chronologically by `dates.start`. The first event is typically PRODUCTION or CREATION, the last is typically REDEMPTION or current state.

\
**BR-3: Event target consistency**\
Events with `eTarget: "EAC"` should reference this certificate's ID in `eTargetId`.

\
**BR-4: Primary Amount**\
The first item in `amounts[]` is considered the primary unit. Additional items represent converted measurements.

\
**BR-5: Minimum arrays**\
`amounts`, `documents`, and `events` must each contain at least one item. TypeScript enforces this with tuple syntax `[T, ...T[]]`.

\
**BR-6: Document reference integrity**\
All `documentIds` referenced in `events` must exist in the certificate's `documents` array.
But ProductionSource.documentIds and eventIds, don't all need to be referenced in the relevant EACertificate properties: inside of EACertificate, they are mostly for events and documents connected to the specific certificate.

\
**BR-7: Custom types**\
there is no `EACType.OTHER`. There will be a formal process to request and approve EAC types to be added to the data model.


## Design Rationale

**Why embed related entities?**\
Certificates are typically fetched as complete units. Embedding `productionSource`, `documents`, and `events` provides everything needed in a single response (98% use case). See [ADR-002: API Response Model](../03_design-decisions/ADR-002-API-response-model.md).

\
**Why do events use documentIds instead of full objects?**\
Documents appear once in the `documents[]` array at certificate level. Events reference them by ID to avoid duplication when the same document (e.g., truck receipt) is referenced by multiple events. This keeps the response clean and avoids data inconsistency.

See [ADR-002: API Response Model](../03_design-decisions/ADR-002-API-response-model.md) and [ADR-003: Data Model Refinements](../03_design-decisions/ADR-003-Data-Model-Refinements.md).


## Related Entities

- [Amount](./Amount_doc.md) - Quantity specifications
- [EmissionsData](./EmissionsData_doc.md): carbon intensity data
- [ProductionSource](./ProductionSource_doc.md) - Origin of environmental attribute
- [EACEvent](./EACEvent_doc.md) - Certificate lifecycle events
- [Document](./Document_doc.md) - Supporting documentation
- [ExternalID](./ExternalID_doc.md): registry identifiers
- [MetadataItem](./MetadataItem_doc.md): custom properties
- [Enums](./Enums_doc.md): EACType, CertRelationshipType, LinkType values



