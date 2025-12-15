import { ExternalID } from './ExternalID';
import { Location } from './Location';
import { OrgRoleType } from './Enums';

/**
 * Organization - Entity registry
 * 
 * Full organization details (not typically included in API responses,
 * but available via OrganizationRole references).
 * 
 * @see {@link ../../docs/entities/Organization.md} Full documentation
 */
export interface Organization {
  id: string;                   // Unique identifier
  name: string;                 // Organization name
  nameExpanded?: string;        // Expanded name (e.g., "IBM" → "International Business Machines")
  externalIDs?: ExternalID[];   // External identifiers in other systems
  url?: string;                 // Organization website
  description?: string;         // Description
  contacts?: Array<{            // optional Contact information
    value: string;              // Contact value (email, phone, etc.)
    label?: string;             // Description of contact type
  }>;
  location?: Location;          // Organization location
}

/**
 * OrganizationRole - Lightweight organization context
 * 
 * Used in events to show who was involved without full org details.
 * 
 * @see {@link ../../docs/entities/OrganizationRole.md} Full documentation
 */
export interface OrganizationRole {
  orgId: string;                // Reference to full Organization entity
  orgName: string;              // Organization name (denormalized for display)
  role: OrgRoleType;            // Role in this context
  roleCustom?: string;          // Custom role description (when role = OTHER)
  externalIDs?: ExternalID[];   // Optional: External IDs relevant to this context
}