# MetadataItem Schema

Generic key-value metadata for entities that need custom properties.

## Overview

**MetadataItem is the core engine of the PEACH data model's flexibility.** It allows the base entities to be extended with specific properties unique to different EAC types and their sub-components. For example, carbon credit projects require different properties than renewable natural gas digesters, and both differ from solar production facilities. Rather than creating rigid, type-specific schemas, MetadataItem enables the model to adapt to the diverse requirements of different certificate types while maintaining a consistent core structure.

This approach ensures PEACH can support:
- Multiple EAC types (RECs, carbon credits, RNG credits, SAF credits, etc.)
- Registry-specific requirements without schema changes
- Emerging certificate types and methodologies
- Custom facility, document, and event properties

## Entities Using MetadataItem

The following entities include `metadata?: MetadataItem[]` fields:

| Entity | Usage | Reasoning |
|--------|-------|-----------|
| **ProductionSource** | ✅ Recommended | Facility-specific custom data varies wildly across technologies (solar panels, wind turbines, digesters, forests, etc.) |
| **Document** | ✅ Recommended | Document metadata varies by type (audit reports, lab results, commissioning docs, etc.) |
| **EACEvent** | ✅ Recommended | Event-specific data varies by type, especially MRV events with methodology-specific fields |
| **EACertificate** | ⚠️ Use sparingly | Escape hatch for rare certificate-level data that doesn't belong in events or documents. **Favor adding metadata to EACEvents or Documents instead.** |

---


### Usage Guidance for MetadataItems

When first encountering data that cannot be mapped to any other property of the current PEACH data model, you might find yourself having doubts about where that new information should be stored. Here are a few guidelines for you to know which entity to store this information in:

#### 1️⃣ - **can Metadata Templates help?**
Metadata templates for different EAC types and their entities (eg RNG.ProductionSource vs REC.ProductionSource) will be available in [EACTypeSettings](../02_EACType-settings/EACTypeSettings.md). This feature is not currently implemented and will be released in the near future.

If metadata templates are missing certain properties that you think should be added, please reach out or propose a pull request to the repository to add them.


#### 2️⃣ - **⚠️ EACertificate metadata should be a last resort** 
Before adding certificate-level metadata, consider:
- Can this be modeled as an **EACEvent**? (e.g., issuance, verification, status changes)
- Can this be attached to a **Document**? (e.g., supporting evidence, reports)
- Does this data relate to a specific **ProductionSource**? (e.g., facility characteristics)

Only use `EACertificate.metadata` for data that truly applies to the certificate as a whole and cannot be semantically attached to an event, document, or production source.

**Examples of appropriate EACertificate metadata:**
- ✅ Registry processing flags (e.g., `"auto_verified": "true"`)
- ✅ Certificate-level quality scores or ratings
- ✅ Internal workflow status that applies to the whole certificate

**Examples of inappropriate use (use alternatives instead):**
- ❌ Issuance information → create an `EACEvent` with type `ISSUANCE`
- ❌ Supporting documentation details → add to `Document.metadata`
- ❌ Verification data → create an `EACEvent` with type `MRV`
- ❌ Production facility details → add to `ProductionSource.metadata`

## TypeScript Interface

See [MetadataItem.ts](../../src/entities/MetadataItem.ts) for the canonical interface definition.

```typescript
interface MetadataItem {
  key: string;
  label: string;
  value?: string;
  type?: string;
  options?: string[];
  required?: boolean;
  description?: string;
}
```

## JSON Example

```json
{
  "key": "grid_loss_factor",
  "label": "Grid Loss Factor",
  "value": "0.05",
  "type": "number",
  "description": "Transmission and distribution losses"
}
```

## Schema Table

| Field | Type | Required | Description | Constraints | Example | Notes |
|-------|------|----------|-------------|-------------|---------|-------|
| `key` | string | ✅ | machine-readable identifier | lowercase, underscores | "grid_loss_factor" | for programmatic access |
| `label` | string | ✅ | human-readable label | | "Grid Loss Factor" | for display |
| `value` | string | | metadata value | | "0.05" | always string, parse based on type |
| `type` | string | | type hint for value | string, number, boolean, date, enum | "number" | helps with UI rendering |
| `options` | string[] | | valid options when type is enum | | ["low", "medium", "high"] | for dropdown/select UI |
| `required` | boolean | | whether this metadata is required | | true | for validation |
| `description` | string | | description of what this represents | | "Transmission losses" | for tooltips/help text |

## Business Rules

**BR-1: Value serialization**
All values are stored as strings. Consumers parse based on `type` field. This ensures consistent JSON serialization.

**BR-2: Options constraint**
When `type` is "enum" and `options` is provided, `value` must be one of the options.

## Design Rationale

MetadataItem provides extensibility for entities that may need certificate-type-specific or registry-specific custom properties that don't warrant dedicated fields. This enables PEACH to adapt to diverse EAC types (RECs, carbon credits, RNG, SAF) and emerging methodologies without requiring schema changes.

## Usage Guidelines

**When to add a MetadataItem:**

Use metadata when you encounter information on your certificate or supporting documents that:
- Doesn't fit into any existing field in the PEACH model
- Is specific to your certificate type (e.g., carbon methodology fields, RNG pathway data)
- Is required by your registry but not common across all EAC types
- Represents custom facility characteristics (e.g., digester temperature, forest age class)

**Examples of good MetadataItem usage:**
- Adding `"forest_age_class": "mature"` to a carbon credit ProductionSource
- Adding `"pathway": "food_waste_to_RNG"` to an RNG certificate's ProductionSource
- Adding `"methodology_version": "VM0042 v2.0"` to an MRV EACEvent
- Adding `"report_type": "Third_Party_Verification"` to a Document

**When NOT to use metadata:**
- Information already captured in existing fields (use the existing fields!)
- Trying to add contact information (use the structured `contacts` array in Organization)

**See "Entities Using MetadataItem" section above for entity-specific guidance.**

## Related Entities

- [ProductionSource](./ProductionSource_doc.md): has metadata
- [Document](./Document_doc.md): has metadata
- [EACEvent](./EACEvent_doc.md): has metadata
- [EACertificate](./EACertificate_doc.md): has metadata
