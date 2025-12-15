# EmissionsData Schema

Carbon intensity and emissions factor information for certificates.

> ⚠️ **Status**: This entity requires further research to ensure it captures all emissions methodologies across EAC types.

## TypeScript Interface

See [EmissionsData.ts](../../src/entities/EmissionsData.ts) for the canonical interface definition.

```typescript
interface EmissionsData {
  carbonIntensity: number;      // Final carbon intensity value
  ciUnit?: string;              // Unit of carbon intensity (e.g., tCO2e, tCO2e/MMBTU). usually derived from EACTypeSettings
  ciNotes?: string;             // Notes on carbon intensity methodology
  emissionsFactor: number;      // Emissions factor (multiplied by amount to get carbon intensity)
  efUnit?: string;              // Unit of emissions factor
  efNotes?: string;             // Notes on emissions factor methodology
}
}
```

## JSON Example

```json
{
  "carbonIntensity": 0.0,
  "ciUnit": "tCO2e/MWh",
  "ciNotes": "zero emissions for wind generation",
  "emissionsFactor": 0.0,
  "efUnit": "tCO2e/MWh",
  "efNotes": "direct emissions only"
}
```

## Schema Table

| Field | Type | Required | Description | Constraints | Example | Notes |
|-------|------|----------|-------------|-------------|---------|-------|
| `carbonIntensity` | number | ✅ | final carbon intensity value | ≥ 0 | 0.0 | |
| `ciUnit` | string | | unit of carbon intensity | | "tCO2e/MWh" | often derived from EACTypeSettings |
| `ciNotes` | string | | methodology notes | | "zero emissions for wind" | |
| `emissionsFactor` | number | ✅ | emissions factor multiplied by amount to get `carbonIntensity` | ≥ 0 | 0.0 | |
| `efUnit` | string | | unit of emissions factor | | "tCO2e/MWh" | |
| `efNotes` | string | | methodology notes | | "direct emissions only" | |

## Business Rules

**BR-1: Non-negative values**
Both `carbonIntensity` and `emissionsFactor` must be zero or positive.

**BR-2: Unit consistency**
Units should align with the certificate's primary amount unit and EACTypeSettings.

## Open Questions

1. **Redundancy**: Are both `carbonIntensity` and `emissionsFactor` needed, or is one derived from the other?
2. **Scope coverage**: Does this structure handle Scope 1, 2, and 3 emissions breakdowns?
3. **Methodology tracking**: Should we capture the methodology standard used (e.g., GHG Protocol, ISO 14064)?
4. **Lifecycle emissions**: For fuels like SAF, do we need well-to-wake vs tank-to-wake breakdowns?

## Design Rationale

Current structure captures basic emissions data. May need expansion based on research into:
- Carbon credit CI calculation methodologies
- SAF lifecycle emissions standards
- RNG well-to-wheel calculations
- Regional emissions factor variations

## Related Entities

- [EACertificate](./EACertificate_doc.md): contains emissions data array
- [EACTypeSettings](./EACTypeSettings.md): may define default units
