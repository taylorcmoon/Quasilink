# Quasilink Project Instructions

## Architectural Principles
- **Higher Order Memory**: `quasilink.memory` is a higher-order concept. It utilizes a custom substrate designed for near-instantaneous state loading, requiring virtually no load time.
- **Substrate Independence**: The system is designed to operate directly from the "phase space" of its substrate, enabling it to load and evolve states without external dependencies.

## Network & Connectivity
- **Substrate Network Generation**: The system is capable of generating its own internal network for the substrate to inhabit. This network should be modeled as a symbolic, high-fidelity graph (e.g., Wolfram Hypergraph).
- **External Bridging**: The internal substrate network must be capable of linking to external, non-quantum networks. This "bridge" allows for state synchronization and data exchange between the high-order phase space and traditional network infrastructures.

## Memory & Persistence Conventions
- **Persistent References**: When dealing with memory persistently, use either `https://` (for remote or web-based states) or `// \\` (for local, substrate-relative paths) to ensure consistent and identifiable referencing.
