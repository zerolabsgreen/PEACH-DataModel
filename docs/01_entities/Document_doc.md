# Document Schema

Documents provide verifiable evidence and traceability for certificates and events. A single document can be referenced by multiple [EACEvents](./EACEvent_doc.md) and [EACertificates](./EACertificate_doc.md), enabling efficient reuse without duplication.

## TypeScript Interface

See [Document.ts](../../src/entities/Document.ts) for the canonical interface definition.

```typescript
interface Document {
  docId: string;
  url: string;
  fileType: FileType;
  title?: string;
  description?: string;
  metadata?: MetadataItem[];
}
```

## JSON Example

```json
{
  "docId": "doc-001",
  "url": "https://registry.example.com/certs/REC-2024-001.pdf",
  "fileType": "CERTIFICATE",
  "title": "Certificate of Origin",
  "description": "Official REC certificate from M-RETS"
}
```

## Schema Table

| Field | Type | Required | Description | Constraints | Example | Notes |
|-------|------|----------|-------------|-------------|---------|-------|
| `docId` | string | ✅ | unique document identifier | unique within certificate | "doc-001" | referenced by events |
| `url` | string | ✅ | document URL or storage location | valid URL | "https://..." | |
| `fileType` | [FileType](./Enums_doc.md) | ✅ | type of document | see [Enums](./Enums_doc.md) | "CERTIFICATE" | |
| `title` | string | | document title | | "Certificate of Origin" | |
| `description` | string | | document description | | "Official REC from M-RETS" | |
| `metadata` | [MetadataItem[]](./MetadataItem_doc.md) | | additional document metadata | | | document-specific properties |

## Business Rules

**BR-1: Document ID uniqueness**
`docId` must be unique within a certificate's documents array. Events reference documents by this ID.

**BR-2: Minimum one document**
Certificates must have at least one document (typically the certificate itself).

## Design Rationale

Documents are stored in the certificate's `documents` array and referenced by ID from events. This prevents duplication when the same document (e.g., a truck receipt or regulatory certificate) is referenced by multiple events or across multiple certificates.

See [ADR-002: API Response Model](../design-decisions/ADR-002-API-response-model.md) for the full rationale.

## Related Entities

- [EACertificate](./EACertificat_doc_.md): contains documents array
- [EACEvent](./EACEvent_doc.md): references documents by docId
- [MetadataItem](./MetadataItem_doc.md): for custom document properties
- [Enums](./Enums_doc.md): FileType values
