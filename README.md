# PEACH - Data Model

**Protocol for Environmental Attribute Certificate Harmonization**

An open-source, universal data model for Environmental Attribute Certificates (EACs) that brings order to the complexity of sustainability claims across renewable energy, low-carbon fuels, carbon credits and more.
PEACH has an open-source companion Demo App here: https://github.com/zerolabsgreen/PEACH-DemoApp 

![Alt text](https://miro.medium.com/v2/resize:fit:3840/format:webp/1*5MypRNSPgdUI9h09nbvL7w.jpeg)

---

## Quick Links

- [What is PEACH?](#what-is-peach)
- [Core Design Philosophy](#-core-design-philosophy)
- [Key Concepts](#key-concepts)
- [Documentation](#documentation)
- [Spreadsheet Reference](#-spreadsheet-reference)
- [For Sustainability Professionals](#for-sustainability-professionals)
- [License](#license)


---

## 1. What is PEACH?

PEACH is a unified data model that harmonizes how we represent and validate Environmental Attribute Certificates—from Renewable Energy Certificates (RECs) to Sustainable Aviation Fuel (SAF) to Carbon Credits and more.

### The Challenge

Today's sustainability landscape is fragmented. Each EAC type speaks its own language, making harmonization nearly impossible:

- **Different EAC types use different names** for the same concepts (vintage vs. production period vs. batch date).
- **Same EAC types from different registries** have inconsistent data formats (M-RETS RECs vs. I-RECs vs. European GOs).
- **Physical products** (RNG, SAF) require chain-of-custody tracking that virtual products (electricity) don't need.
- **Quality varies widely** between registry-issued certificates and self-issued Proofs-of-Sustainability(PoS) or other proofs.
- **Languages differ** across global markets, making automation difficult.

For a detailed analysis of these challenges, see the guide: [Understanding EAC Patterns & Challenges](docs/04_guides/G01_Understanding-EAC-Challenges.md).

### The PEACH Solution

PEACH provides a **single, extensible data structure** that:

- ✅ **Works universally** across all EAC types (RECs, RNG, SAF, Carbon Credits, and more)
- ✅ **Handles differences gracefully** through flexible metadata and type-specific settings
- ✅ **Tells the complete story** using events to capture production, transport, issuance, and redemption
- ✅ **Supports automation** with machine-readable, validated data structures
- ✅ **Enables compliance** by tracking chain-of-custody, bundling status, and quality indicators

---

## 🎯 2. Core Design Philosophy

> Read the manifesto: ["Climate Action Needs an Open Source Data Model"](https://medium.com/@Zero_Labs/climate-action-needs-an-open-source-data-model-1a3c6ef47820)

PEACH aims to create a universal, extensible data model that harmonizes all Environmental Attribute Certificate (EAC) types while remaining simple enough for rapid adoption and complex enough for regulatory compliance.

### Primary Objectives

- **Universal compatibility** across all EAC types (RECs, RNG, SAF, carbon credits, and emerging types)
- **Machine-readable automation** for corporate sustainability workflows
- **Regulatory compliance** enabling automated verification and reporting
- **Future-proof extensibility** for new certificate types and methodologies
- **Performance at scale** for thousands of organizations and certificates

### Sustainability Professionals: What You Need to Know!

PEACH is designed to be **readable and understandable** without a technical background.

- 💡 **Certificates contain everything you need** </br> 
When you look at a PEACH certificate, you get the complete picture in one place—amounts, events, documents, and production source. No hunting across multiple systems.

- 💡 **Events tell the story** </br>
Every certificate has a timeline showing what happened: when energy was produced, when fuel was transported, when the certificate was issued, when it was retired. Each event shows who was involved and what documents prove it happened.

- 💡 **Documents provide proof** </br>
Every claim is backed by evidence—registry certificates, transport receipts, audit reports, lab tests. PEACH links these documents to the events they support.

- 💡 **Different EAC types work differently** </br>
RECs track electricity that can't be stored. RNG tracks physical fuel with complex supply chains. Carbon credits track project-based emissions reductions. PEACH handles all of these while keeping the core structure consistent.

- 💡 **Quality and traceability are built in** </br>
PEACH captures who issued the certificate, what organizations were involved, what documents support each event, and whether the claim is bundled or unbundled. It even tracks the [`ExternalIDs`](/docs/01_entities/ExternalID_doc.md) used by the EAC source registry or issuer to represent these entities (events, documents, organizations). This transparency helps you assess quality and meet reporting requirements.

#### 📊 Non-Technical Reference: PEACH Spreadsheet

For sustainability professionals who prefer working with spreadsheets over code, we provide a comprehensive spreadsheet version of the PEACH data model:

- **[Google Sheets Version](https://docs.google.com/spreadsheets/d/1FolQUO2MfT4_zDQpb8mjK3BPJyc5ne6l/edit?usp=sharing&ouid=109057906477034480188&rtpof=true&sd=true)** (view/comment access)
- **[Excel Download](docs/PEACH_DataModel_20260114.xlsx)** (local file)

The spreadsheet includes:
- Overview tab explaining PEACH concepts and entity relationships
- Dedicated tabs for each entity (EACertificate, EACEvent, ProductionSource, etc.)
- Real-world examples for REC, RNG, and SAF certificate types
- Complete reference of all valid enumerated values (event types, organization roles, etc.)
- Field definitions with descriptions in plain language

This is an excellent starting point for understanding PEACH before diving into the technical TypeScript documentation.

### Implementation Architecture Principles

PEACH follows clear technical principles that guide every design decision:

- **🌍 Universal Compatibility** → One model works for all EAC types. New types can be added without breaking existing implementations.

- **🧩 Composition Over Inheritance** → Flexible entity relationships enable complex scenarios without rigid type hierarchies.
- **📅 Event-Driven State** → Certificate state is reconstructed from events, creating complete audit trails.
- **🔗 Denormalize for Display** → Store IDs in the database, return full objects in API responses for optimal user experience.
- **📝 Explicit Over Derived** → Make relationships clear in the data structure. Don't force users to calculate or infer information.
- **🔧 Extensible Without Breaking** → MetadataItem and EACTypeSettings allow type-specific fields without schema changes.
- **🎯 Optimize for the Common Case** → 98% of the time, users want complete certificates. PEACH embeds entities to deliver this efficiently.

For detailed reasoning behind specific design decisions, see the entity documentation ([docs/01_entities/](docs/01_entities/)) and Architecture Decision Records ([docs/03_design-decisions/](docs/03_design-decisions/)).

---

## 3. Key Concepts

### 3.1 The Certificate as a Complete Package

 Think of a certificate as a complete package containing its documents, events (what happened), and origin (production source). Everything you need is in one place.
 
You can also think of an EAC certificate like a **passport for environmental claims**:

- **Identity** → Certificate ID, type, and external registry identifiers
- **Quantities** → Amounts (MWh, MMBTU, tCO2e) with unit conversions to Emissions
- **Origin Story** → Production source (where and how it was generated)
- **Proof Documents** → Supporting evidence (certificates, receipts, audit reports)
- **Timeline** → Events that tell what happened and when

When you request a certificate from PEACH, you get **everything in one response**—no need to fetch related data separately.

</br>
### 3.2 EACType Taxonomy

PEACH supports diverse environmental attribute types, organized into major categories. The data model currently implements select examples from each category, with research ongoing for full coverage:

- **⚡️ Energy Certificates**
  - **REC** (Renewable Energy Certificate) → Electricity from renewable sources
  - **RTC** (Renewable Thermal Certificate) → Heat/cooling from renewable sources
  - LDES Long-duration energy storage certificates _(future)_

- **🌱 Carbon & Climate**
	- **CC** (Carbon Credit) → Emission reductions or removal from projects
	- **CR** Carbon Removal certificates (technically a carbon credit but diffentiating the sub-type for convenience
   - CBAM Carbon Border Adjustment Mechanism _(future)_

- **⛽️ Liquid Fuels**
  - **RNG** (Renewable Natural Gas) → Biomethane and other biogas derivatives
  - **SAF** (Sustainable Aviation Fuel) → Renewable jet fuel
  - SMF (Sustainable Marine Fuel) _(future)_
  - Green Hydrogen, _(future)_ 
  - Green Ammonia _(future)_

- **🏭 Green-X (Industrial Products)** </br>
  - Green Steel, Green Aluminum, Green Cement _(future research)_

- **♻️ Circularity Certificates** </br>
  - Recycled materials: paper, water, plastic _(future research)_

**Example: Currently Implemented Types**

| EAC Type | Full Name | Primary Unit | Key Differences |
|----------|-----------|--------------|-----------------|
| **REC** | Renewable Energy Certificate | MWh | Electricity generation, non-storable |
| **RTC** | Renewable Thermal Certificate | MWh thermal | Heat/cooling generation |
| **RNG** | Renewable Natural Gas | MWh (+ MMBTU, m³) | Physical fuel, complex supply chain, multiple unit conversions |
| **SAF** | Sustainable Aviation Fuel | Liters | Chain-of-custody, end-use verification |
| **CC**  | Carbon Credit | tCO2e | Project-based, vintage years, linked sources |

**Why taxonomy matters:**
Each category has unique tracking requirements—electricity can't be stored (requiring immediate or hourly matching), physical fuels need chain-of-custody events, carbon projects need linked source documentation, and industrial products require material provenance tracking. PEACH's flexible structure accommodates all of these through type-specific settings and metadata.

Other certificates will probably be a composite of different ones like a REC+RNG to certify green-steel. 

Learn more: [EACTypeSettings documentation](docs/02_EACType-settings/EACTypeSettings.md)

</br>
### 3.3 Events Tell the Story

> ####💡 useful heuristic: Events tell the story. Documents prove the story.

**All EACs represent sustainability events**—things that happened over time and in specific places. PEACH captures these as structured [EACEvents](docs/01_entities/EACEvent_doc.md).

#### Example: RNG Certificate Event Timeline

```
📅 January 15, 2025 → PRODUCTION
   - Dairy farm produces biogas from manure
   - Organizations: Green Farm LLC (producer)
   - Documents: [Feedstock certification]

📅 January 20, 2025 → TRANSPORT
   - Biogas transported to processing facility
   - Organizations: BioPower Transport (carrier)
   - Documents: [Truck consignment receipt]

📅 January 25, 2025 → INJECTION
   - Biomethane injected into natural gas grid
   - Organizations: Pacific Grid Operator (grid operator)
   - Documents: [Grid injection proof]

📅 February 1, 2025 → ISSUANCE
   - Certificate issued by M-RETS registry
   - Organizations: M-RETS (issuer)
   - Documents: [RNG certificate PDF]

📅 March 15, 2025 → REDEMPTION
   - Certificate retired for corporate claim
   - Organizations: Acme Corp (beneficiary)
   - Documents: [Retirement attestation]
```

**Event Categories:**

- **Lifecycle** → Creation, activation, suspension (for production sources)
- **Production** → When the environmental attribute was generated
- **Certificate actions** → Issuance, transfer, redemption
- **Chain-of-custody** → Transport, injection, storage (for physical products)
- **Verification** → MRV audits, lab tests, ratings, certifications


**Why events matter:**

- Capture the **complete chain-of-custody** for physical products (RNG, SAF)
- Enable **hourly matching** for time-sensitive electricity claims
- Track **future delivery** for carbon removal contracts
- Support different **accounting methods** (Mass Balance, Book & Claim, Direct Delivery)
- Provide **audit trails** showing who did what and when

Learn more:

- [EACEventTypes in Enum documentation](docs/01_entities/Enum_doc.md)
- [EACEvent documentation](docs/01_entities/EACEvent_doc.md)

</br>
### 3.4 Documents as Proof

Every claim needs evidence. PEACH tracks [Documents](docs/01_entities/Document_doc.md) that prove events happened:

- **Certificates** → Registry-issued EAC documents
- **Proofs of Sustainability** → Third-party verification documents
- **Contracts** → offtake agreements, PPAs, green tariffs
- **Audit reports** → Third-party verification results
- **Lab tests** → Emissions testing, fuel quality analysis
- **Consignment sheets** → Transport and delivery receipts
- **Images** → Photos of facilities or equipment

**Key pattern:** Documents are stored once and **referenced by ID** from multiple events. This prevents duplication when the same truck receipt is used by both a transport event and an injection event.

</br>
### 3.5 Production Source: Where It Comes From

The [ProductionSource](docs/01_entities/ProductionSource_doc.md) represents where the environmental attribute originated:

- **For RECs:** the "generator", Solar farm, wind turbine array, hydroelectric dam
- **For RNG:** Anaerobic digester, landfill gas capture facility
- **For Carbon Credits:** the "Project", Reforestation project, carbon capture technology
- **For SAF:** Biorefinery processing waste oils or agricultural residue

**What it captures:**
- Technology or feedstock type (varies by EAC type)
- Location (country, region, coordinates)
- Commissioning/operation start date (critical for eligibility)
- Certifications and labels (Green-e, Gold Standard, ISCC etc)
- Organizations involved (owner, operator)

**Important:** A single production source can generate **multiple EAC types**. A biogas digester might produce both RNG certificates and carbon credits.

</br>
### 3.6 Amounts: Flexible Measurement

Different EACs use different units. PEACH's [Amount](docs/01_entities/Amount_doc.md) structure handles this elegantly:

**RECs** (simple):
```json
[
  { "amount": 1000, "unit": "MWh", "isPrimary": true }
]
```

**RNG** (complex with conversions):
```json
[
  { "amount": 1000, "unit": "MMBTU", "isPrimary": true },
  {
    "amount": 293,
    "unit": "MWh",
    "conversionFactor": 0.293,
    "conversionFactorUnits": "MWh/MMBTU",
    "conversionNotes": "Standard thermal conversion"
  },
  {
    "amount": 28317,
    "unit": "m³",
    "conversionFactor": 28.317,
    "conversionFactorUnits": "m³/MMBTU"
  }
]
```

**Why explicit conversions matter:** Sustainability professionals shouldn't have to calculate conversions. The certificate provides them directly.

</br>
### 3.7 MetadataItem: The Flexibility Engine (Use Sparingly)

[MetadataItem](docs/01_entities/MetadataItem_doc.md) is **the secret to PEACH's universal compatibility**, but should be used judiciously. It allows the core data model to stay simple while accommodating unique requirements when type-specific fields don't exist.
It's a "Meta" object that can hold any information or data point in a structured and consistent way.

**When to use MetadataItem:**
- Type-specific details not in the core model (e.g., RNG feedstock pathways, forest age class for carbon credits)
- Registry-specific fields not standardized across EAC types
- Emerging standards where requirements are still evolving

**Where it's used:**
- ✅ **ProductionSource** → Facility-specific details (nameplate capacity, digester temperature etc)
- ✅ **Document** → Document-specific metadata (verification methodology version)
- ✅ **EACEvent** → Event-specific data (MRV methodology details, lab test parameters)
- ⚠️ **EACertificate** → Only as last resort (prefer adding to EACEvents or documents)

**Future enhancement:** [EACTypeSettings](docs/02_EACType-settings/EACTypeSettings.md) will include **metadata templates** that define expected fields for each EAC type, providing validation while maintaining flexibility.

</br>
### 3.8 Organizations and Roles

[Organizations](docs/01_entities/Organization_doc.md) appear throughout the certificate lifecycle in different roles. Each organization appears in events with their specific role, creating a complete audit trail.

**Examples:**

- **M-RETS** (Registry/Issuer) → Issues an RNG certificate after biomethane injection
- **Green Farm LLC** (Producer) → Produces biogas from dairy manure
- **Acme Corp** (Beneficiary) → Retires the certificate for their sustainability claim

See [OrganizationRole documentation](docs/01_entities/Organization_doc.md) for all role types including production, transaction, verification (MRV), and physical product handling roles.

---

## 4 - Documentation

PEACH documentation is organized to help you find what you need quickly.

### 📊 Spreadsheet Reference

For a non-technical overview of the entire data model in spreadsheet format:

- **[PEACH Data Model Spreadsheet (Google Sheets)](https://docs.google.com/spreadsheets/d/1FolQUO2MfT4_zDQpb8mjK3BPJyc5ne6l/edit?usp=sharing&ouid=109057906477034480188&rtpof=true&sd=true)**
- **[Download Excel (.xlsx)](docs/PEACH_DataModel_20260114.xlsx)**

The spreadsheet provides field-by-field documentation with examples for REC, RNG, and SAF certificates, designed for sustainability professionals without technical backgrounds.

</br>
### 📁 Core Entities ([docs/01_entities/](docs/01_entities/))

The building blocks of PEACH certificates. Each document includes TypeScript interfaces, JSON examples, business rules, and design rationale.

**Essential entities:**

- [EACertificate](docs/01_entities/EACertificate_doc.md) → The complete certificate with all related data
- [EACEvent](docs/01_entities/EACEvent_doc.md) → Lifecycle events (production, transport, issuance, redemption)
- [ProductionSource](docs/01_entities/ProductionSource_doc.md) → Origin facility or project
- [Document](docs/01_entities/Document_doc.md) → Supporting evidence and proof
- [Amount](docs/01_entities/Amount_doc.md) → Quantities with units and conversions
- [EmissionsData](docs/01_entities/EmissionsData_doc.md) → Carbon intensity and avoided emissions
- [ExternalID](docs/01_entities/ExternalID_doc.md) → Registry identifiers and serial numbers
- [MetadataItem](docs/01_entities/MetadataItem_doc.md) → Flexible custom properties

**Supporting entities:**

- [Organization](docs/01_entities/Organization_doc.md) → Companies and institutions involved
- [Location](docs/01_entities/Location_doc.md) → Geographic coordinates and regions
- [Enums](docs/01_entities/Enums_doc.md) → Reference for all enumerated types (EACType, EventType, RoleType, etc.)

</br>
### ⚙️ EACType Settings ([docs/02_EACType-settings/](docs/02_EACType-settings/))

Configuration that defines validation rules, units, and required fields for each certificate type.
Today there are only some drafts but we will soon be realising more detailed implementations.

- [EACTypeSettings](docs/02_EACType-settings/EACTypeSettings.md) → How validation works per EAC type


</br>
### 📐 Design Decisions ([docs/03_design-decisions/](docs/03_design-decisions/))

Architecture Decision Records (ADRs) document the reasoning behind key design choices. These provide context for implementers on why entities are structured the way they are.

Each entity documentation ([docs/01_entities/](docs/01_entities/)) also includes design rationale sections. For foundational architectural decisions, see the [ADR folder](docs/03_design-decisions/).

### 📖 Guides ([docs/04_guides/](docs/04_guides/))

Step-by-step guides for using PEACH.


---

## For Developers

While PEACH prioritizes readability for sustainability professionals, developers need implementation details.

### Quick Technical Overview

**Data Model Type:** API Response Model (not a database schema)
- Defines what APIs should **return** when querying certificates
- Backend storage is flexible (PostgreSQL with JSONB recommended)

**Key Patterns:**
- Certificates **embed** related entities (production source, documents, events)
- Events **reference** documents by ID (prevents duplication)
- Organizations appear as **lightweight roles** within events (not full objects)

**TypeScript Definitions:** See [`src/entities/`](src/entities/) for canonical interfaces

**Validation:** Use [EACTypeSettings](docs/02_EACType-settings/EACTypeSettings.md) to validate type-specific requirements

**Getting Started:**
1. Read [EACertificate](docs/01_entities/EACertificate_doc.md) to understand the top-level structure
2. Review [ADR-002](docs/03_design-decisions/ADR-002-API-response-model.md) for design rationale
3. Check [Enums](docs/01_entities/Enums_doc.md) for valid values
4. Explore entity documentation for detailed field definitions

---

## Roadmap

PEACH is evolving to meet the needs of the sustainability community. Here's what's coming:

### In Progress
- Specific EACTypeSettings implementations (REC, RNG, SAF, Carbon Credit validation rules)
- SemanticMapper documentation (translating registry field names to PEACH)
- User guides (Getting started, Mapping your EAC, Contributing)

### Planned
- JSON examples folder with real-world certificates
- Metadata templates for different EAC types
- Emissions calculation methodologies
- Multi-language support
- Integration guides for major registries

---

## License

PEACH Data Model is licensed under the [Mozilla Public License 2.0](LICENSE).

**Copyright © 2025 [Zero Labs](https://zerolabs.green) - PEACH Protocol**
Repository: https://github.com/zerolabs/PEACH-DataModel

**What this means:**

- ✅ You can use PEACH in commercial products
- ✅ You can modify PEACH for your needs
- ⚠️ Any modifications to PEACH files must be shared under the same license
- 📝 You must preserve copyright notices and attribute the original source
- ℹ️ You can combine PEACH with proprietary code

For questions about licensing, please open an issue in this repository.

---

## Acknoledgments

PEACH has been and continues to be informed by many sustainability professionals both in non-profit organizations, EAC associations, market operators, registries and corporate buyers.
PEACH is generously supported by a grant from the [High Tide Foundation](https://www.hightidefoundation.org/) and aims at becoming open-source technical infrastructure that will enable companies to consistently report their verified climate actions in alignment with the [Task Force for Corporate Action Transparency (TCAT)](https://www.tcataction.org/).


---

## Contributing

PEACH is an open standard that benefits from community input.

**How to contribute:**

- Report issues or suggest improvements via [GitHub Issues](https://github.com/zerolabs/PEACH-DataModel/issues)
- Propose new EAC types or validation rules
- Share example certificates that should be supported
- Improve documentation clarity

**Contact:**

For questions or collaboration opportunities, please reach out through the repository or at peach[at]zerolabs.green.

---

**PEACH: Harmonizing environmental attribute certificates for a sustainable future.**
