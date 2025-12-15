# G01: Understanding EAC Challenges

_This guide explains the complex landscape of Environmental Attribute Certificates and the foundational challenges that PEACH Protocol addresses._

---

## 1. The Fragmented Landscape

**The Problem:**

When organizations try to manage sustainability claims across different Environmental Attribute Certificates (EACs), they encounter a fundamental challenge: **every certificate type speaks its own language**.

A company purchasing RECs from a wind farm, RNG from a dairy digester, and carbon credits from a reforestation project receives three completely different document formats. Each certificate organizes information differently, uses different terminology, and requires different verification processes. What should be straightforward—tracking environmental claims—becomes a complex translation exercise.

**Why This Happens:**

- Each EAC market evolved independently with its own registries, standards, and conventions
- Different industries developed their own terminology and documentation practices
- Regional regulations shaped how certificates are structured and issued
- No universal standard existed to harmonize across these markets

This fragmentation creates friction: manual data entry, custom integrations for each certificate type, and increased risk of errors when aggregating sustainability claims for reporting.

---

## 2. Cross-EAC Type Challenges

### Same Patterns, Different Implementations

**The Problem:**

All EACs share fundamental characteristics—they all represent an environmental claim with quantities, dates, organizations, and production sources. Yet each EAC type implements these shared concepts in completely different ways.

**Real-World Example:**

Consider how different EAC types represent **amounts**:

- **RECs** use a single number: `1,000 MWh`
- **RNG** requires three different units with conversion factors:
  - `1,000 MMBTU` (primary unit)
  - `293 MWh` (with conversion: 0.293 MWh/MMBTU)
  - `28,317 m³` (with conversion: 28.317 m³/MMBTU)
- **SAF** measures in liters or gallons, often with density conversions to energy equivalents

When Company X buys all three types for their sustainability program, they must handle three different measurement systems, manually calculate conversions, and reconcile units for corporate reporting.

### The Naming Problem

**The Problem:**

The same concept appears under different names across EAC types, making automation and harmonization nearly impossible.

**Common Examples:**

| Concept | REC Term | RNG Term | SAF Term | Carbon Credit Term |
|---------|----------|----------|----------|-------------------|
| **When it was produced** | Vintage | Production Period | Batch Date | Vintage Year |
| **Where it came from** | Technology (Solar, Wind) | Feedstock (Dairy Manure) | Fuel Type (Waste Oils) | Project Type (Reforestation) |
| **Production location** | Facility ID | Digester ID | Refinery Code | Project Site |

If you're building a system to track "when the environmental attribute was produced," you need custom logic for each certificate type. What RECs call "vintage," RNG certificates call "production period," and SAF certificates call "batch date." They're the same concept with different labels.

### Events: The Universal Pattern Nobody Standardized

**The Problem:**

Every EAC represents one or more sustainability **events** that happened over time. But each certificate type tracks these events differently—or doesn't track them comprehensively at all.

**What Events Look Like Across EAC Types:**

**RECs** (simple timeline):
- Generation event (when electricity was produced)
- Issuance event (when registry created the certificate)
- Retirement event (when claim was made)

**RNG** (complex supply chain):
- Feedstock production (biogas from dairy manure)
- Processing event (conversion to biomethane)
- Transport event (trucking to grid injection point)
- Injection event (entering natural gas pipeline)
- Issuance event (sustainability proof created)
- Redemption event (environmental claim made)

**Carbon Credits** (project-based):
- Project registration
- Baseline establishment
- Monitoring/verification visits
- Credit issuance
- Credit retirement

Each event involves different organizations, happens at different locations, and is supported by different documentation. Yet traditional certificates often collapse this timeline into a single issuance date, losing critical chain-of-custody information.

### Storage and Timing Complexity

**The Problem:**

Not all environmental products behave the same way. Some can be stored; others disappear instantly. This fundamental difference affects how certificates must be structured and how claims can be made.

**Non-Storable Products (Electricity):**
- Generated and consumed instantaneously
- Cannot be saved for later use (except with battery storage)
- Requires time-matching: you must prove your REC was generated during the same period you used electricity
- Hourly matching is becoming the gold standard for corporate claims

**Storable Products (Fuels, Removed Carbon):**
- Can be produced at one time and consumed later
- Physical inventory can accumulate over days, months, or years
- Creates complexity around when claims can be made
- Different products have different "shelf life" regulations

**Future Delivery:**
- Some certificates represent **commitments for future delivery** (especially carbon removal contracts)
- An organization might purchase a carbon removal credit in 2024 for delivery in 2027
- Current certificate formats struggle to represent this "FuturEAC" concept clearly

---

## 3. Within EAC Types: Even More Inconsistency

Even certificates of the **same type** (like RECs) vary significantly depending on who issued them and where they come from.

### Different Registries, Different Formats

**The Problem:**

When a company sources RECs from multiple regions, they receive certificates with different structures:

- **M-RETS RECs** (North America) → Include detailed facility information, fuel type classifications, eligibility codes
- **I-RECs** (International) → Use different terminology, often include country-specific attributes
- **European GOs** (Guarantees of Origin) → Follow AIB standards but have regional variations
- **Regional Renewable Energy Registries** (US states) → Each has its own data fields and formats

**Real-World Impact:**

A global corporation with operations across North America, Europe, and Asia might manage RECs from 5-10 different registries. Each registry provides data in a unique format. Aggregating this for a single sustainability report requires custom data mapping for every source.

### Language Barriers

**The Problem:**

Sustainability is global, but certificates are often issued in local languages.

**Common Scenarios:**

- An RNG certificate from China arrives entirely in Mandarin
- A European GO includes both the local language and English translations
- Field names themselves are translated: "Technology" becomes "Technología" (Spanish), "Generador" (Generator), or "设备" (Device in Chinese)

Without standardized field naming and multi-language support, automation becomes impossible. Every certificate requires manual review and translation.

### Incomplete Information

**The Problem:**

Not all certificates include the same level of detail, even within the same EAC type and registry.

**Examples:**

- Some REC certificates include the generator's commissioning date; others omit it
- RNG certificates vary in GHG emissions detail—some provide full lifecycle analysis, others only provide totals
- Older certificates may lack modern data fields added in recent years
- Self-issued sustainability proofs vary wildly in comprehensiveness depending on the issuer

**Why This Happens:**

- Different vintage years follow different standards
- Registries evolve their data requirements over time
- Voluntary vs. compliance markets have different disclosure rules
- Self-issued certificates depend on the issuer's internal practices

---

## 4. Physical vs. Virtual Products

One of the most significant structural differences in EAC types comes down to whether the underlying product is **physical** (like fuel) or **virtual** (like electricity or emissions reductions).

### Electricity: Here and Gone

**The Nature of Electricity:**

Electricity cannot be stored (outside of batteries) or transported long distances without losses. When electrons flow through a grid, they're immediately consumed. This creates unique challenges:

- **Matching Requirements:** You must prove the renewable electricity was generated during the time period you consumed electricity
- **Grid Mixing:** Once renewable electrons enter the grid, they're indistinguishable from conventional electrons
- **Time Granularity Matters:** Annual matching is easier but less rigorous than hourly matching

**Bundled vs. Unbundled:**
- **Bundled REC:** You buy both the electricity and the environmental claim from the same source (often through a green power purchase agreement)
- **Unbundled REC:** You buy the environmental attribute separately from your electricity supply

### Fuels: Physical Chain-of-Custody

**The Nature of Physical Products:**

RNG, SAF, hydrogen, and other sustainable fuels are **physical commodities** that can be stored, transported, mixed with conventional fuels, and sold through complex supply chains. This creates a "double tracking" challenge:

1. **Physical product tracking:** Where is the fuel? Who transported it? Was it mixed with conventional fuel?
2. **Environmental attribute tracking:** Who can claim the sustainability benefit? Can it be sold separately from the fuel?

**Three Chain-of-Custody Methods:**

#### Mass Balance (Physical Link Required)

Think of mass balance like a **bank account for sustainability attributes** within a shared infrastructure system.

**How It Works:**
- Sustainable fuel (e.g., biomethane) is mixed with conventional fuel in shared infrastructure like a gas pipeline
- Careful accounting tracks how much certified fuel enters and exits the system
- Only organizations with physical access to withdrawal points can claim the attributes
- The amount claimed cannot exceed the amount of certified fuel that entered the system

**Example:**
A dairy digester injects 1,000 MMBTU of biomethane into the regional gas grid. Three industrial facilities withdraw natural gas from that grid. Together, they can claim up to 1,000 MMBTU of renewable gas attributes—but they must be physically connected to that grid. A company across the country cannot purchase those attributes.

**Why Mass Balance Matters:**
- Required by many regulatory frameworks (EU RED II/III for biomethane)
- Prevents unlimited trading without physical connection
- Provides accountability while allowing shared infrastructure use

#### Book & Claim (Decoupled Trading)

**How It Works:**
- The environmental attribute is completely separated from the physical product
- The attribute is registered ("booked") and can be purchased by any buyer, anywhere
- No physical connection required between producer and claimant

**Example:**
A biorefinery in California produces Sustainable Aviation Fuel (SAF). Airline A, operating entirely in Europe, purchases the SAF certificates for their sustainability claims. Airline B purchases the physical fuel and uses it in California flights. Both airlines benefit, even though the physical delivery and environmental claim went to different organizations.

**Why Book & Claim Exists:**
- Allows flexibility when physical delivery is impractical or impossible
- Enables emerging markets to scale faster (not every airport has local SAF supply)
- Supports voluntary corporate sustainability programs
- Provides financial incentive for producers even when local demand is low

**Trade-Off:**
Book & Claim is seen as less rigorous than Mass Balance because there's no physical connection between the product use and the claim. Some regulatory programs don't accept it.

#### Direct Delivery (Physical Product = Claim)

**How It Works:**
- The physical sustainable product is delivered directly to the end user without mixing
- The organization that receives the physical product makes the environmental claim
- Segregation is maintained throughout the supply chain

**Example:**
A biogas facility delivers compressed biomethane directly to a fleet operator via dedicated trucks. The fleet operator receives the physical fuel and makes the environmental claim. There's no mixing with conventional fuel, no shared infrastructure.

**Why Direct Delivery Matters:**
- Provides the highest level of assurance
- Often used when producer and consumer are geographically close
- Required by some strict regulatory frameworks or customer expectations
- Used for bespoke arrangements (e.g., dedicated hydrogen supply to a manufacturing plant)

### Linked and Chained Certificates

**The Problem:**

Physical products often require **multiple certificates** across their supply chain, creating dependencies between EACs.

**Examples:**

**Green Hydrogen:**
- Requires a REC to prove the electricity used for electrolysis was renewable
- The hydrogen certificate must reference the underlying REC
- If the REC is invalidated, the hydrogen claim becomes questionable

**Biomethane (RNG):**
- Upstream: Feedstock certification proving the manure or waste source is sustainable
- Production: Biogas processing and refinement documentation
- Downstream: Chain-of-custody documents for transport, injection into grid, eventual consumption
- Some feedstocks might also generate carbon credits (e.g., avoiding methane emissions from manure)

**SAF:**
- Feedstock certification (e.g., used cooking oil sourced sustainably)
- Processing certification (biorefinery converting feedstock to jet fuel)
- Chain-of-custody during transport and blending
- End-use verification proving it was actually used in aircraft

**Challenge for Data Systems:**

Traditional certificates don't have standardized ways to reference "upstream" or "downstream" certificates. This linkage must be tracked separately, increasing complexity and error risk.

### End-Use Verification ("Like-for-Like")

**The Problem:**

In Book & Claim systems where the physical product and environmental claim are separated, it's critical to verify the physical product was used **for its intended purpose**.

**Why This Matters:**

Imagine SAF is produced but not used in an airplane—instead, it's sold to a utility and burned to generate electricity. The emissions reduction profile is **completely different**:
- **SAF in aviation:** Replaces highly carbon-intensive jet fuel, significant emissions reduction
- **SAF in power generation:** Might replace natural gas, lower emissions reduction, different claim category

**The Challenge:**

How do you track and verify end-use when the buyer of the physical fuel is different from the buyer of the environmental claim?

**Current State:**
- Some Book & Claim frameworks require end-use verification before claims can be finalized
- This creates timing challenges: the certificate might be sold before end-use verification is available
- Not all frameworks have standardized approaches to this problem

---

## 5. Quality and Trust Factors

Not all certificates are created equal. Several factors affect the **trustworthiness** and perceived quality of an environmental claim.

### Registry-Issued vs. Self-Issued

**Registry-Issued Certificates:**
- Created by formal registries (M-RETS, I-REC, Verra, Gold Standard)
- Follow strict issuance protocols and auditing procedures
- Third-party oversight and verification
- Well-established standards and transparent processes
- Generally accepted for regulatory compliance and high-quality voluntary claims

**Self-Issued "Sustainability Proofs":**
- Created by the producer or another organization in the supply chain
- Often used in emerging markets without established registries (RNG, SAF, green hydrogen)
- Verification levels vary significantly
- Some producers are certified by third parties (e.g., ISCC) to self-issue
- May face higher scrutiny in audits or compliance programs

**The Gray Area:**

Some certification bodies (like ISCC) certify that a **company is qualified** to calculate and issue sustainability proofs themselves. Are these "self-issued" or "third-party verified"? The answer affects how buyers perceive quality.

### Formal Certificates vs. Contractual Documents

**The Problem:**

Not all sustainability proof comes in the form of a registry certificate. Some critical documents are simply **contracts** or **receipts**:

- **RNG consignment sheets:** Delivery receipts from transporting biomethane to grid injection points
- **Green tariffs:** Power purchase agreements with utilities providing renewable electricity
- **Carbon removal forward contracts:** Agreements for future delivery of carbon removal credits

These documents serve as proof of sustainability events, but they lack the structure and standardization of registry-issued certificates.

### Bundled vs. Unbundled

**Why Bundling Status Matters:**

Whether an environmental claim is **bundled** (physical product and attribute purchased together) or **unbundled** (purchased separately) affects:

- **Regulatory acceptance:** Some frameworks only accept bundled claims or Mass Balance for compliance
- **Perceived quality:** Bundled claims are often seen as higher quality because of the direct physical connection
- **Corporate preferences:** Some companies have internal policies requiring bundled renewable energy
- **Pricing:** Unbundled attributes are typically cheaper, creating market segmentation

**Tracking Challenge:**

Certificates must clearly indicate bundling status, but terminology varies:
- RECs: "bundled" vs. "unbundled"
- Physical fuels: "Mass Balance" vs. "Book & Claim" vs. "Direct Delivery"
- Carbon credits: "project-linked" vs. "traded"

---

## 6. Why This Matters

These challenges create real costs and risks for organizations pursuing sustainability goals:

**Operational Costs:**
- Manual data entry and translation across certificate types
- Custom integrations for each registry and certificate format
- Increased labor for verification and quality assurance

**Risk Exposure:**
- Errors in data translation or aggregation
- Difficulty auditing claims across diverse certificate sources
- Compliance failures due to incomplete documentation

**Strategic Limitations:**
- Hard to compare costs and quality across different EAC types
- Difficult to optimize sustainability portfolios
- Limited ability to automate reporting and verification

**Market Friction:**
- Buyers and sellers must negotiate data formats and documentation standards
- Lack of transparency makes quality assessment difficult
- Inconsistent standards slow market development for emerging EAC types

---

## 7. What PEACH Does About It

PEACH Protocol addresses these challenges by creating a **universal, extensible data model** that works across all EAC types. Rather than requiring different systems and processes for RECs, RNG, SAF, and carbon credits, PEACH provides a single structure that accommodates the unique requirements of each type while maintaining consistency.

**How PEACH Helps:**

- **Unified terminology** across EAC types (but preserves original registry terms in metadata)
- **Event-based structure** that captures complete chain-of-custody timelines
- **Flexible metadata** for type-specific and registry-specific requirements
- **Multi-language support** with standardized field names
- **Clear quality indicators** (issuer information, bundling status, verification level)
- **Linked certificate support** for complex supply chains

For a complete overview of the PEACH data model and how it addresses these challenges, see the [README](../../README_improved.md).

For implementation details, explore the [Entity Documentation](../01_entities/) and [EACType Settings](../02_EACType-settings/).

---

**Next Steps:**

- Learn about [PEACH's core concepts](../../README_improved.md#key-concepts)
- Explore specific [entity documentation](../01_entities/) to see how PEACH structures certificate data
- Review [EACType settings](../02_EACType-settings/EACTypeSettings.md) to understand type-specific validation

---

_This guide is part of the PEACH Protocol documentation. For questions or feedback, visit the [GitHub repository](https://github.com/zerolabs/PEACH-DataModel)._
