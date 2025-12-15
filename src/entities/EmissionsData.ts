/**
 * EmissionsData - Carbon intensity and emissions factor information
 * 
 * Captures emissions-related calculations and methodologies.
 * 
 * @see {@link ../../docs/entities/EmissionsData.md} Full documentation
 */
export interface EmissionsData {
  carbonIntensity: number;      // Final carbon intensity value
  ciUnit?: string;              // Unit of carbon intensity (e.g., tCO2e, tCO2e/MMBTU). usually derived from EACTypeSettings
  ciNotes?: string;             // Notes on carbon intensity methodology
  emissionsFactor: number;      // Emissions factor (multiplied by amount to get carbon intensity)
  efUnit?: string;              // Unit of emissions factor
  efNotes?: string;             // Notes on emissions factor methodology
}