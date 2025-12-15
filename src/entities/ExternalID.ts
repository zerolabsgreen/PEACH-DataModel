/**
 * ExternalID - External identifier reference
 * 
 * Links to identifiers used by other systems (registries, organizations).
 * 
 * @see {@link ../../docs/entities/ExternalID.md} Full documentation
 */
export interface ExternalID {
  id: string;                   /** The actual external identifier */
  ownerOrgId?: string;          // Organization that uses this ID
  ownerOrgName?: string;        // Organization name (denormalized)
  description?: string;         // Description of what this ID represents
  externalFieldName?: string;   // Field name used by external system
}

