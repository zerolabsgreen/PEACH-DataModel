import { EACEventType, EACEventTargetType } from './Enums';
import { Location } from './Location';
import { OrganizationRole } from './Organization';
import { MetadataItem } from './MetadataItem';

/**
 * EACEvent - Certificate lifecycle event
 * 
 * Represents something that happened related to a certificate, production source,
 * or physical product. Events reference documents by ID to avoid duplication.
 * 
 * @see {@link ../../docs/entities/EACEvent.md} Full documentation
 */
export interface EACEvent {
  id: string;                            // Unique event identifier
  eType: EACEventType;                   // Type of event (eg "REDEMPTION")
  
  eTarget: EACEventTargetType;               // What this event is about (certificate, product, or source) eg ("EAC")
  eTargetId?: string[];                  // ID of what this event is about, based on EACEventTarget types. is an array because a REDEMPTION event could point to multiple certificates (EACertificate.id)
  
  /** When and where the event occurred */
  dates: {
    start: Date;                         // ISO 8601 datetime	"2024-06-15T14:30:00Z"
    end?: Date;
  };
  location?: Location;                  
  
  notes?: string;                        // optional notes or description of the event (e.g., redemption reason)
  value?: string;                        // where to quickly store the value of the event, eg the rating or label

  organizations: OrganizationRole[];     // Organizations involved in this event
  documentIds: string[];                 // Documents that prove this event. References Document.docId in EACertificate.documents[]
  
  metadata?: MetadataItem[];             // optional Additional event metadata
}