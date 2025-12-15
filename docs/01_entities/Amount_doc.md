# Amount Schema

Quantity measurement with unit and optional conversion information.

## TypeScript Interface

See [Amount.ts](../../src/entities/Amount.ts) for the canonical interface definition.

```typescript
interface Amount {
  amount: number;
  unit: string;
  conversionFactor?: number;
  conversionFactorUnits?: string;
  conversionNotes?: string;
  isPrimary?: boolean;
}
```

## JSON Example

```json
[
  {
    "amount": 1000,
    "unit": "MWh",
    "isPrimary": true
  },
  {
    "amount": 3412000,
    "unit": "MMBTU",
    "conversionFactor": 3.412,
    "conversionFactorUnits": "MMBTU/MWh",
    "conversionNotes": "standard thermal conversion",
    "isPrimary": false
  }
]
```

## Schema Table

| Field | Type | Required | Description | Constraints | Example | Notes |
|-------|------|----------|-------------|-------------|---------|-------|
| `amount` | number | ✅ | numerical quantity | must be > 0 | 1000 | |
| `unit` | string | ✅ | unit of measurement | | "MWh" | see EACTypeSettings for valid units |
| `conversionFactor` | number | | factor that multiplied by the primary unit produced the `amount` | | 3.412 | |
| `conversionFactorUnits` | string | | units of conversion factor | | "MMBTU/MWh" | explicit for clarity |
| `conversionNotes` | string | | conversion methodology | | "standard thermal conversion" | |
| `isPrimary` | boolean | | whether this is the primary unit | | true | first amount is typically primary |

## Business Rules

**BR-1: Minimum one amount**\
Certificates must have at least one Amount. The first amount in the array is typically the primary unit.

\
**BR-2: Conversion factor requirement**\
If `isPrimary` is false, `conversionFactor` and `conversionFactorUnits` should be provided to explain how this amount relates to the primary unit.

\
**BR-3: Positive values only**\
Amount values must be greater than zero.

## Design Rationale

**Array structure**\
Different EAC types need different units. RNG certificates have MWh, MMBTU, and m³. Using an array accommodates all possible descriptions of the amount for every certificate type.

**Explicit conversion units**\
`conversionFactorUnits` is kept explicit rather than derived so sustainability experts immediately understand the conversion without calculation.

See [ADR-003: Data Model Refinements](../03_design-decisions/ADR-003-Data-Model-Refinements.md) for the decision rationale.

## Related Entities

- [EACertificate](./EACertificate_doc.md): contains amounts array
- [EACTypeSettings](./02_EACType-settings/EACTypeSettings.md): defines valid units per certificate type
