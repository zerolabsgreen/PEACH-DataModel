/**
 * Amount - Quantity measurement 
 * 
 * Represents a measured quantity with unit and optional conversion info.
 * 
 * @see {@link ../../docs/entities/Amount.md} Full documentation
 */
export interface Amount {
  amount: number;                   /** Numerical quantity (must be > 0) */
  unit: string;                     /** Unit of measurement */

  conversionFactor?: number;        /** Conversion factor from primary unit (if this is secondary unit) */
  conversionFactorUnits?: string;   /** Units of the conversion factor used to convert unit/unit_of_the_primary_amount */
  conversionNotes?: string;         /** Explanation of conversion methodology */
  isPrimary?: boolean;              /** Whether this is the primary unit for this certificate type */
}