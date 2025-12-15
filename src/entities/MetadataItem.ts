/**
 * MetadataItem - Generic key-value metadata
 * 
 * Extensible metadata for entities that need custom properties.
 * 
 * @see {@link ../../docs/entities/MetadataItem.md} Full documentation
 */
export interface MetadataItem {
  key: string;          // Metadata key
  label: string;        // Human-readable label for display
  value?: string;       // Metadata value
  type?: string;        // Type hint for value (string, number, boolean, date, enum)
  options?: string[];   // Valid options when type is enum/multiple-choice
  required?: boolean;   // Whether this metadata is required
  description?: string; // Description of what this metadata represents
}