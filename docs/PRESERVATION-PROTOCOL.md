# CodeBound Preservation Protocol v0.7

Preserve **editable source, legible companion, version and evidence**, not just an attractive screenshot.

## Minimum record

Keep original author and license, source URL or local provenance, semantic revision, purpose and excluded uses, editable source, printable companion, nominal dimensions, actual measurements and units, measurement tool and resolution, tolerances if authoritative, tests (including failures), and a dated next-review owner/role.

## Measurements

NIST SI unit symbols are case-sensitive. Source design dimensions are nominal, not measured fabrication results. Write UNSPECIFIED if no tolerance is known. One inch is defined as exactly 25.4 mm, but changing units does not increase precision. A matching physical dimension is not proof of safety-rated interchangeability.

## Checksum and copies

The builder creates preservation-index.json with source asset paths, SHA-256 values and byte lengths. This detects file alteration within a package; it does not authenticate a publisher or validate technical correctness. The complete ZIP also has SHA256SUMS.txt and a ZIP hash. Preserve two copies in different safe places and occasionally verify that both extract and open.

## Local reproduction matrix

The interactive checklist records whether a person has access to the **named inputs**. An all-checked status says "inputs present, trial unverified," not "safe" or "certified". These records are suitable for low-risk practice only. Specialist review is required for structural, pressure, electrical safety, medical, potable-water, braking or other safety-rated systems.

## Reference sources

Library of Congress Recommended Formats Statement:
https://www.loc.gov/preservation/resources/rfs/format-pref-summary.html

NIST Guide to the SI:
https://www.nist.gov/pml/special-publication-811/nist-guide-si-chapter-6-rules-and-style-conventions-printing-and-using

Third-party sources are external links, not bundled copies. Their licenses remain in force.

## Revision rule

Never silently replace a published versioned technical asset. Keep older versions, add a new revision with a description and a newly computed hash, and review all linked plans before relying on it.

**Release limit:** automated tests prove catalog consistency and archive integrity, not specialist approval or physical performance.
