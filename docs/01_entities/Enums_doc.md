# Enums Reference

Enumerated types (predefined lists of allowed values) used across PEACH Protocol entities.

## TypeScript Definitions

See [enums.ts](../../src/entities/enums.ts) for the canonical definitions.

```typescript
export enum EACType {
  REC = "REC",
  RTC = "RTC",
  RNG = "RNG",
  SAF = "SAF",
  CC  = "CC",
  OTHER = "OTHER",
}

export enum EACEventTarget {
  EAC     = "EAC",
  PRODUCT = "PRODUCT",
  PSOURCE = "PSOURCE",
}

export enum EACEventType {
  CREATION    = "CREATION",
  ACTIVATION  = "ACTIVATION",
  PAUSE       = "PAUSE",
  SUSPENSION  = "SUSPENSION",
  TERMINATION = "TERMINATION",
  PRODUCTION  = "PRODUCTION",
  ISSUANCE    = "ISSUANCE",
  REDEMPTION  = "REDEMPTION",
  TRANSFER    = "TRANSFER",
  TRANSPORT   = "TRANSPORT",
  INJECTION   = "INJECTION",
  MRVAUDIT       = "MRVAUDIT",
  MRVLABTEST     = "MRVLABTEST",
  MRVERIFICATION = "MRVERIFICATION",
  MRVVALIDATION  = "MRVVALIDATION",
  MRVRATING      = "MRVRATING",
  MRVLABELING    = "MRVLABELING",
  OTHER = "OTHER",
}

export enum OrgRoleType {
  REGISTRY       = "REGISTRY",
  ISSUER         = "ISSUER",
  PRODUCER       = "PRODUCER",
  SELLER         = "SELLER",
  BROKER         = "BROKER",
  EACBUYER       = "EACBUYER",
  EACBENEFICIARY = "EACBENEFICIARY",
  FUEL_USER      = "FUEL_USER",
  TRANSPORT      = "TRANSPORT",
  GRID_OPERATOR  = "GRID_OPERATOR",
  MRV_AUDITOR       = "MRV_AUDITOR",
  MRV_RATING_AGENCY = "MRV_RATING_AGENCY",
  MRV_LABEL         = "MRV_LABEL",
  MRV_VERIFIER      = "MRV_VERIFIER",
  MRV_VALIDATOR     = "MRV_VALIDATOR",
  MRV_LAB           = "MRV_LAB",
  OTHER = "OTHER",
}

export enum FileType {
  CERTIFICATE = "CERTIFICATE",
  POS         = "POS",
  CONTRACT    = "CONTRACT",
  AUDIT       = "AUDIT",
  LABTEST     = "LABTEST",
  CONSIGNMENT = "CONSIGNMENT",
  IMAGE       = "IMAGE",
}
```

---

## EACType

Certificate type classification.

**Used in:** [EACertificate](EACertificate_doc.md) (`type` field)

| Value | Description |
|-------|-------------|
| `REC` | Renewable Energy Certificate |
| `RTC` | Renewable Thermal Certificate |
| `RNG` | Renewable Natural Gas certificate |
| `SAF` | Sustainable Aviation Fuel certificate |
| `CC` | Carbon Credit |
| `OTHER` | other certificate type (use with `typeCustom`) |

---

## EACEventTarget

What entity an event pertains to.

**Used in:** [EACEvent](EACEvent_doc.md) (`eTarget` field)

| Value | Description |
|-------|-------------|
| `EAC` | event happened to the certificate itself |
| `PRODUCT` | event happened to the physical product |
| `PSOURCE` | event happened to the production source |

---

## EACEventType

Types of events in a certificate lifecycle.

**Used in:** [EACEvent](EACEvent_doc.md) (`eType` field)

| Category | Values | Description |
|----------|--------|-------------|
| Lifecycle | `CREATION`, `ACTIVATION`, `PAUSE`, `SUSPENSION`, `TERMINATION` | production source lifecycle |
| Production | `PRODUCTION` | environmental attribute was generated |
| Certificate | `ISSUANCE`, `REDEMPTION`, `TRANSFER` | certificate registry actions |
| Chain-of-custody | `TRANSPORT`, `INJECTION` | physical product movement |
| MRV | `MRVAUDIT`, `MRVLABTEST`, `MRVERIFICATION`, `MRVVALIDATION`, `MRVRATING`, `MRVLABELING` | measurement, reporting, verification |
| Extension | `OTHER` | custom event type (use with `eTypeCustom`) |

---

## OrgRoleType

Role an organization plays in an event or relationship.

**Used in:** [OrganizationRole](Organization_doc.md) (`role` field)\
which is also used in the used in:\
**Used in:** [EACEvent](EACEvent_doc.md) (`organization` array)


| Category | Values | Description |
|----------|--------|-------------|
| Registry | `REGISTRY`, `ISSUER` | certificate administration |
| Production | `PRODUCER`, `GRID_OPERATOR` | generation and delivery |
| Transaction | `SELLER`, `BROKER`, `EACBUYER`, `EACBENEFICIARY` | certificate ownership |
| Physical | `FUEL_USER`, `TRANSPORT` | physical product handling |
| MRV | `MRV_AUDITOR`, `MRV_RATING_AGENCY`, `MRV_LABEL`, `MRV_VERIFIER`, `MRV_VALIDATOR`, `MRV_LAB` | verification roles |
| Extension | `OTHER` | custom role (use with `roleCustom`) |

---

## FileType

Document classification.

**Used in:** [Document](Document_doc.md) (`fileType` field)

| Value | Description |
|-------|-------------|
| `CERTIFICATE` | certificate document from registry |
| `POS` | Proof of Sustainability |
| `CONTRACT` | purchase or sale agreement |
| `AUDIT` | audit report |
| `LABTEST` | laboratory test results |
| `CONSIGNMENT` | shipping/delivery documentation |
| `IMAGE` | image file |

---

## Usage Notes

**OTHER pattern**: When using `OTHER` values, always populate the corresponding custom field (`typeCustom`, `roleCustom`, `eTypeCustom`).

**Case sensitivity**: enum values are uppercase. JSON serialization preserves case.
