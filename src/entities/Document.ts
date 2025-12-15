import { FileType } from './Enums';
import { MetadataItem } from './MetadataItem';

/**
 * Document - File reference
 * 
 * Represents supporting documentation (certificates, receipts, audits, etc.).
 * 
 * @see {@link ../../docs/entities/Document.md} Full documentation
 */
export interface Document {
  docId: string;                // Unique document identifier
  url: string;                  // Document URL or storage location
  fileType: FileType;           // Type of document
  
  title?: string;               // Document title
  description?: string;         // Document description
  metadata?: MetadataItem[];    // Additional document metadata
}