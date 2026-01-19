# Changelog

All notable changes to the PEACH Protocol will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Spreadsheet reference for non-technical users
  - Excel file: `docs/PEACH_DataModel_20260114.xlsx` (13 tabs covering all entities)
  - Google Sheets version with view/comment access
  - Features field-by-field documentation with real-world examples for REC, RNG, and SAF certificate types
  - Designed for sustainability professionals without TypeScript/technical backgrounds
  - Documentation updated in README.md with links to both formats

### Changed
- **[BREAKING]** Updated `ProductionSource` field requirements
  - Made `ProductionSource.name` required (was optional)
  - Made `ProductionSource.technology` optional (was required)
  - Migration: 
    - Ensure all ProductionSource objects include a `name` field
    - `technology` field is now optional and may be omitted if not available
  - Rationale: Production source must have an identifier name; technology info may be captured at certificate level via `productionTech` instead
  - Files changed:
    - `src/entities/ProductionSource.ts`
    - `docs/01_entities/ProductionSource_doc.md`
    - `docs/PEACH_DataModel_20260114.xlsx`

- **[BREAKING]** Renamed & changed type `EACertificate.productionSource` to `EACertificate.productionSourceId: string` 
  - Rationale: we don't store the ProductionSource object in the EACertificate but only its normalized id
  - Migration: `EACertificate.productionSourceId` should point to `ProductionSource.id`
  
- **[BREAKING]** changed type `EACertificate.documents: [Document]` to `EACertificate.documents: string[]`
  - Rationale: we don't store the Document object in the EACertificate but only it's id 


---

## [0.1.0] - 2025-11-13

### Added
- Initial PEACH Protocol data model structure
- Core entity documentation framework in `docs/01_core-entities`
- TypeScript source files in `src/core/`
- Repository folder structure:
  - `docs/01_core-entities/` - Universal entity schemas
  - `docs/02_EACType-settings/` - Certificate-specific settings
  - `docs/03_API-extensions/` - API response extensions (DTOs)
  - `docs/04_design-decisions/` - Architecture Decision Records
  - `docs/05_guides/` - Implementation guides
  - `src/core/` - TypeScript interfaces (canonical)
  - `src/eacTypes/` - Certificate type settings
  - `examples/` - JSON example files
- Architecture Decision Record: ADR-001 Normalization Strategy

### Documentation
- Created PEACH Protocol Documentation Standard
- Established changelog maintenance guidelines
- Added internal documentation structure guide

---

**Project Status:** Pre-1.0.0 (In Development)  
**Current Version:** 0.1.0  
**Expected Stable Release:** v1.0.0 targeted for Q1 2026
