/**
 * Location - Geographic information
 * 
 * Represents geographic location with multiple levels of specificity.
 * 
 * @see {@link ../../docs/01_entities/Location.md} Full documentation
 */
export interface Location {
  country: string;          // ISO 3166-1 alpha-2 (required) - e.g., "US", "DE", "JP"
  subdivision?: string;     // ISO 3166-2 subdivision code for states or provinces - e.g. "CA", "BY", "ON"
  region?: string;          // Market/grid/network region OR admin region - context-dependent
  
  address?: string;         // street + Nr + City
  zipCode?: string;         // Postal code
  
  latitude?: number;        // Decimal latitude
  longitude?: number;       // Decimal longitude
  
  geoBounds?: string;       // Geospatial boundary data (Shapefile, KML, GeoJSON)
}