import { EACType } from './Enums';
import { ExternalID } from './ExternalID';
import { Amount } from './Amount';
import { EmissionsData } from './EmissionsData';
import { ProductionSource } from './ProductionSource';
import { Document } from './Document';
import { EACEvent } from './EACEvent';
import { MetadataItem } from './MetadataItem';

/**
 * EACertificate - Environmental Attribute Certificate
 * 
 * Represents a complete certificate with all related data.
 * This is the primary API response structure.
 * 
 * @see {@link ../../docs/01_core-entities/EACertificate.md} Full documentation
 */
export interface EACertificate {
  // === IDENTITY ===
  id: string;
  type: EACType;                          // Certificate type (REC, RNG, SAF, etc.)
  type2?: string;                         // valid subtype available in /src/EACTypes/EACTypeSettings  (eg "GO" or "I-REC")
  externalIDs?: ExternalID[];             // External identifiers for this EAC in the registry or other systems
  
  // === QUANTITIES ===
  amounts: [Amount, ...Amount[]];         // quantities measured. at least one required
  emissions?: EmissionsData[];            // Emissions data (carbon intensity, emissions factor)
  
  // === RELATIONSHIPS (embedded objects) ===
  productionSource: ProductionSource;     // Production source where this certificate originated
  productionTech: string;                 // the technology with which it has been produced (eg "WIND"). valid values in EACTypeSettings
  
  documents: [Document, ...Document[]];   // All documents related to this certificate
  
  /** 
   * Certificate lifecycle events. At least one required.
   * Note: events reference documents via documentIds (see Document.docId)
   */
  events: [EACEvent, ...EACEvent[]];
  
  relatedCertificates?: string[];          // EACertificate.id / links to other EACertificates, useful for Chain-of-custody and more

  links?: string[];                        // Related URLs, eg for public proofs
  metadata?: MetadataItem[];               // optional Additional certificate metadata, but adding info to EACEvent and Document should be favored
}

