# EACTypeSettings Schema

Configuration object defining validation rules and field options for each Environmental Attribute Certificate type.

---

## TypeScript Interface

```typescript
interface EACTypeSettings {
  eacType: EACType;
  eacTypeName: string;
  eacSubtypes?: string[];
  
  amounts: {
    defaultUnit: string;
    secondaryUnits?: ConversionUnit[];
  };
  
  emissionsData?: {
    defaultUnit: string;
    secondaryUnits?: ConversionUnit[];
  };
  
  productionSource: {
    displayName?: string;
    technologyTypes: string[];
    allowedLabels?: string[];
    metadata?: MetadataItem[];
  };
  
  document?: {
    metadata?: MetadataItem[];
  };
}

interface ConversionUnit {
  unit: string;
  unitFullName?: string;
  conversionFactor: number;
  conversionFactorUnits?: string;
  notes?: string;
}
```

---

## Schema Table: EACTypeSettings

| Field | Type | Required | Description | Constraints | Example | Notes |
|-------|------|----------|-------------|-------------|---------|-------|
| `eacType` | enum | ✅ | Certificate type identifier | Must match EACType enum | "REC" | Primary identifier |
| `eacTypeName` | string | ✅ | Human-readable name | - | "Renewable Energy Certificate" | For UI display |
| `eacSubtypes` | array |  | Valid subtype values | Min 0 items | ["GO", "I-REC", "REC"] | Used for EACertificate.type2 validation |
| `amounts` | object | ✅ | Quantity measurement config | - | See below | Physical certificate units |
| `    -- defaultUnit` | string | ✅ | Primary unit of measurement | - | "MWh", "tCO2e" | First amount must use this |
| `    -- secondaryUnits` | array |  | Additional unit conversions | - | See ConversionUnit | Optional alternate units |
| `emissionsData` | object |  | Emissions impact config | - | See below | Not all EAC types have this |
| `    -- defaultUnit` | string | ✅ | Primary emissions unit | - | "tCO2e", "gCO2e/MJ" | Standard emissions metric |
| `    -- secondaryUnits` | array |  | Additional emissions units | - | See ConversionUnit | Optional conversions |
| `productionSource` | object | ✅ | Production source config | - | See below | Generator/project settings |
| `    -- displayName` | string |  | Context-specific label | - | "Generator", "Project" | What to call this entity in UI |
| `    -- technologyTypes` | array | ✅ | Valid production technologies | Min 1 item | ["Solar", "Wind"] | Used for validation |
| `    -- allowedLabels` | array |  | Valid MRV certifications | Min 0 items | ["Green-e", "Gold Standard"] | Certification labels |
| `    -- metadata` | array |  | Required/optional metadata fields | Min 0 items | See MetadataItem | Type-specific requirements |
| `document` | object |  | Document metadata config | - | See below | Optional document requirements |
| `    -- metadata` | array |   | Document metadata fields | Min 0 items | See MetadataItem | Document-specific fields |

---

## Schema Table: ConversionUnit

| Field | Type | Required | Description | Constraints | Example | Notes |
|-------|------|----------|-------------|-------------|---------|-------|
| `unit` | string | ✅ | Unit abbreviation | - | "MMBTU", "kWh" | Short form |
| `unitFullName` | string |  | Full unit name | - | "Million British Thermal Units" | For clarity/tooltips |
| `conversionFactor` | number | ✅ | Multiplication factor | Must be > 0 | 3.412 | Multiply defaultUnit by this |
| `conversionFactorUnits` | string |  | Units of the conversion | - | "MMBTU/MWh" | Shows relationship |
| `notes` | string |  | Methodology explanation | - | "Standard conversion per CARB" | Optional context |

---

## Business Rules

**BR-SETTINGS-01: Primary Unit Requirement**  
The `amounts.defaultUnit` must be used for the first item in `EACertificate.amounts[]` array. This is the canonical unit for that certificate type.

**BR-SETTINGS-02: Emissions Data Optional**  
Not all EAC types have `emissionsData`. RECs typically don't include this, while RNG and Carbon Credits do.

**BR-SETTINGS-03: Display Name Usage**  
The `productionSource.displayName` should be used in UI labels. Examples: "Generator Details" for RECs, "Project Details" for Carbon Credits.

---

## Usage Example

### Backend: Loading Settings

```typescript
// Load settings at startup
import RECSettings from './settings/REC.json';
import CCSettings from './settings/CC.json';

const settingsRegistry = new Map<EACType, EACTypeSettings>();
settingsRegistry.set(EACType.REC, RECSettings);
settingsRegistry.set(EACType.CC, CCSettings);

// Validate certificate
function validateCertificate(cert: EACertificate): boolean {
  const settings = settingsRegistry.get(cert.type);
  const primaryUnit = settings.amounts.defaultUnit;
  
  return cert.amounts[0].unit === primaryUnit;
}
```

### Frontend: Dynamic Forms

```typescript
// Generate form fields from metadata templates
function ProductionSourceForm({ eacType }: { eacType: EACType }) {
  const settings = settingsRegistry.get(eacType);
  const fields = settings.productionSource.metadata;
  
  return (
    <div>
      <h2>{settings.productionSource.displayName} Information</h2>
      {fields.map(field => (
        <FormField
          key={field.key}
          label={field.label}
          type={field.type}
          required={field.required}
        />
      ))}
    </div>
  );
}
```
