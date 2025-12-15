/**
 * PEACH Protocol Enums
 * All enumerated types used across entities
 */

export enum EACType {
  REC = "REC",
  RTC = "RTC",
  RNG = "RNG",
  SAF = "SAF",
  CC  = "CC",
}

export enum EACEventTargetType {
  EAC     = "EAC",       // Event happened to the certificate
  PRODUCT = "PRODUCT",   // Event happened to physical product
  PSOURCE = "PSOURCE",   // Event happened to production source
}

export enum EACEventType {
  // Lifecycle events
  CREATION    = "CREATION",
  ACTIVATION  = "ACTIVATION",
  PAUSE       = "PAUSE",
  SUSPENSION  = "SUSPENSION",
  TERMINATION = "TERMINATION",
  PRODUCTION  = "PRODUCTION",
  
  // Certificate events
  ISSUANCE    = "ISSUANCE",
  REDEMPTION  = "REDEMPTION",
  TRANSFER    = "TRANSFER",
  
  // Chain-of-custody events
  TRANSPORT   = "TRANSPORT",
  INJECTION   = "INJECTION",
  
  // MRV events
  MRVAUDIT       = "MRVAUDIT",
  MRVLABTEST     = "MRVLABTEST",
  MRVERIFICATION = "MRVERIFICATION",
  MRVVALIDATION  = "MRVVALIDATION",
  MRVRATING      = "MRVRATING",
  MRVLABELING    = "MRVLABELING",

  OTHER = "OTHER",
}

export enum OrgRoleType {
  REGISTRY    = "REGISTRY",
  ISSUER      = "ISSUER",
  PRODUCER    = "PRODUCER",
  SELLER      = "SELLER",
  BROKER      = "BROKER",
  EACBUYER    = "EACBUYER",
  EACBENEFICIARY = "EACBENEFICIARY",
  FUEL_USER      = "FUEL_USER",
  TRANSPORT      = "TRANSPORT",
  GRID_OPERATOR  = "GRID_OPERATOR",
  
  MRV_AUDITOR       = "MRV_AUDITOR",
  MRV_RATING_AGENCY = "MRV_RATING_AGENCY",
  MRV_LABEL         = "MRV_LABEL",
  MRV_VERIFIER      = "MRV_VERIFIER",
  MRV_VALIDATOR     = "MRV_VALIDATOR",
  MRV_LAB           = "MRV_LAB",
  
  OTHER = "OTHER",
}

export enum FileType {
  CERTIFICATE = "CERTIFICATE",
  POS         = "POS",          //Proof of Sustainability
  CONTRACT    = "CONTRACT",
  AUDIT       = "AUDIT",
  LABTEST     = "LABTEST",
  CONSIGNMENT = "CONSIGNMENT",
  IMAGE       = "IMAGE",
}

