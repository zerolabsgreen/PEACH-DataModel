import { ExternalID } from './ExternalID';
import { Location } from './Location';
import { OrganizationRole } from './Organization';
import { MetadataItem } from './MetadataItem';
import { EACType } from './Enums';

/**
 * ProductionSource - Origin of environmental attribute
 * 
 * Represents the facility/project where the environmental attribute was generated.
 * When embedded in certificates, includes only descriptive information.
 * 
 * @see {@link ../../docs/entities/ProductionSource.md} Full documentation
 */
export interface ProductionSource {
  id: string;                           // Unique identifier
  externalIDs?: ExternalID[];           // External identifiers in registries
  eacTypes: EACType[];                  // Certificate types this source produces
  
  name?: string;                        // Facility/project name
  description?: string;
  location?: Location;
  organizations?: OrganizationRole[];   // Key organizations (owner, operator)
  
  /** properties derived from EACertificates, but denormalized for simplicity */
  technology: string[];                 // Technology/feedstock type (e.g., "Solar", "Wind", "Biomass")
  
  /** properties that have an EACEvent but that have been extrapolated (denormalized) for simplicity */
  operationStartDate?: Date;            // When facility became operational. ISO Date YYYY-MM-DD
  labels?: string[];                    // Certifications and labels (e.g., "Green-e")

  relatedProductionSources?: string[];   // ProductionSource.id / references to other ProductionSources, Carbon Credits have information about connected projects
  documentIds?: string[];               // Document.id / references ids of connected documents beyond the EACertificates
  eventIds?: string[];                  // EACEvent.id / references ids of all relevant events of the productionSource
  metadata?: MetadataItem[];            // Additional source metadata
}