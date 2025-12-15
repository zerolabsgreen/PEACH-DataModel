# Location Schema

Geographic information for facilities, organizations, and events.

## TypeScript Interface

See [Location.ts](../../src/entities/Location.ts) for the canonical interface definition.

```typescript
interface Location {
  country: string;          // ISO 3166-1 alpha-2 (required) - e.g., "US", "DE", "JP"
  subdivision?: string;     // ISO 3166-2 subdivision code for states or provinces - e.g. "CA", "BY", "ON"
  region?: string;          // Market/grid/network region OR admin region - context-dependent
  address?: string;         // street + Nr + City
  zipCode?: string;         // Postal code
  latitude?: number;        // WGS84 Decimal latitude
  longitude?: number;       // WGS84 Decimal longitude
  geoBounds?: string;       // Geospatial boundary data (Shapefile, KML, GeoJSON)
}
```

## JSON Examples

### Example 1: US Electricity REC (Full detail)
```json
{
  "country": "US",
  "subdivision": "CA",
  "region": "WECC",
  "address": "123 Solar Way, San Francisco",
  "zipCode": "94025",
  "latitude": 37.4419,
  "longitude": -122.1430
}
```

### Example 2: European GO (Germany)
```json
{
  "country": "DE",
  "subdivision": "BY",
  "address": "Sonnenstraße 45, München",
  "zipCode": "80331",
  "latitude": 48.1351,
  "longitude": 11.5820
}
```

### Example 3: I-REC International (Minimal data - India)
```json
{
  "country": "IN",
  "subdivision": "MH",
  "latitude": 19.0760,
  "longitude": 72.8777
}
```

### Example 4: Gas Certificate (Natural gas with market hub - Netherlands)
```json
{
  "country": "NL",
  "subdivision": "NH",
  "region": "TTF",
  "latitude": 52.3676,
  "longitude": 4.9041
}
```

### Example 5: Canadian REC
```json
{
  "country": "CA",
  "subdivision": "ON",
  "address": "456 Wind Farm Road, Thunder Bay",
  "zipCode": "P7A 1B1",
  "latitude": 48.3809,
  "longitude": -89.2477
}
```

## Schema Table

| Field | Type | Required | Description | Constraints | Example | Notes |
|-------|------|----------|-------------|-------------|---------|-------|
| `country` | string | ✅ | ISO country code | ISO 3166-1 alpha-2 | "US" | |
| `subdivision` | string | | ISO code for states or provinces | ISO 3166-2 | "CA" for California | |
| `region` | string | | Market/grid/network region OR admin region - context-dependent | | "WECC" | |
| `address` | string | | street address | | "123 Solar Way" | |
| `zipCode` | string | | postal code | | "94025" | |
| `latitude` | number | | decimal latitude | -90 to 90 | 37.4419 | WGS84 datum |
| `longitude` | number | | decimal longitude | -180 to 180 | -122.1430 | WGS84 datum |
| `geoBounds` | string | | geospatial boundary data | valid Shapefile, KML, or GeoJSON | | for facility boundaries |

## Business Rules

**BR-1: Country code format**
Country must be a valid ISO 3166-1 alpha-2 code (2 uppercase letters).

**BR-2: Subdivision code format**
- SHOULD use ISO 3166-2 subdivision code (e.g., "CA" for California, "ON" for Ontario, "BY" for Bavaria)
- MAY use common abbreviations for backward compatibility
- No strict validation to maintain flexibility for various data sources

**BR-3: Region field usage guidelines**
The `region` field is optional and context-dependent based on EAC type:
- **Electricity EACs**: Grid operator region (e.g., WECC, ERCOT, PJM, MISO, SPP, NYISO, NEISO, CAISO)
- **Natural Gas EACs**: Pipeline network or market hub (e.g., Henry Hub, Dawn, TTF, NBP, PSV)
- **Hydrogen EACs**: Distribution network region
- **Thermal EACs**: District heating network area
- MAY also represent administrative regions larger than subdivision
- Freeform string (no enum) for maximum flexibility across energy types

**BR-4: Coordinate precision**
- Latitude and longitude SHOULD have at least 4 decimal places for facility-level precision (~11 meters)
- Latitude range: -90 to 90
- Longitude range: -180 to 180
- WGS84 datum assumed

## Design Rationale

Location is designed with multiple specificity levels to accommodate varying data availability. A certificate from one registry might only have country; another might have precise coordinates.

## Related Entities

- [ProductionSource](./ProductionSource_doc.md): facility location
- [Organization](./Organization_doc.md): organization headquarters
- [EACEvent](./EACEvent_doc.md): where events occurred
