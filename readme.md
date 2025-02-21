# Quantum Validator

A TypeScript library for validating quantum field measurements and physical quantities with dimensional analysis.

## Overview

The Quantum Validator provides a robust system for validating physical measurements in quantum systems, ensuring that values respect physical limits and dimensional consistency. It includes:

- Physical dimension tracking using SI base units
- Unit conversion and validation
- Quantum field measurement validation
- Built-in physical constants and limits

## Features

### Physical Dimensions

- Support for all seven SI base dimensions:
  - Mass [M]
  - Length [L]
  - Time [T]
  - Electric Current [I]
  - Temperature [Θ]
  - Amount of Substance [N]
  - Luminous Intensity [J]
- Dimensional analysis for operations between physical quantities
- Human-readable dimension formatting with proper notation (e.g., [M]¹[L]²[T]⁻³)

### Physical Quantities

- Mathematical operations between compatible quantities
- Automatic unit conversion
- Range validation against physical limits
- Support for common physical units

### Measurement Validation

- Electric field component validation
- Total field strength calculation
- Dimensional consistency checks
- Detailed validation error reporting

## Usage

### Basic Validation

```typescript
import { EnhancedMeasurementValidator } from './lib/validation/measurement-validator'

const validator = new EnhancedMeasurementValidator()

const measurement = {
  Ex: 1000,
  ExUnit: "V/m",
  Ey: 1200,
  EyUnit: "V/m",
  Ez: 800,
  EzUnit: "V/m"
}

const validationResults = validator.validateQuantumField(measurement)
I'll create a comprehensive README.md file for the Quantum Validator project.

```markdown project="GAIA-AIR-AMPEL" file="README.md"
...
```

### Working with Physical Quantities

```typescript
import { PhysicalQuantity } from './lib/validation/physical-quantity'
import PhysicalDimensions from './lib/validation/physical-dimensions'

// Create a physical quantity
const electricField = new PhysicalQuantity(
  1000,
  "V/m",
  PhysicalDimensions.fromObject({
    mass: 1,
    length: 1,
    time: -3,
    current: -1
  })
)

// Check if it's within physical limits
const isValid = electricField.isInRange(-1e6, 1e6, "V/m")
```

## Components

### React Component

The project includes a React component for easy integration into web applications:

```typescript
import { MeasurementValidator } from '@/components/validation/measurement-validator'

function App() {
  return (
    <div>
      <MeasurementValidator />
    </div>
  )
}
```

## Physical Limits

The system includes predefined physical limits for various quantities:

- Electric Field: ±1e6 V/m (air breakdown limit)
- Magnetic Field: ±100 T (maximum sustainable field)
- Temperature: 0 K to 300 K (absolute zero to room temperature)
- Pressure: 0 Pa to 1e6 Pa (vacuum to 10 bar)


## Project Structure

```plaintext
lib/validation/
├── physical-dimensions.ts    # SI base dimension handling
├── physical-quantity.ts      # Physical quantity operations
├── physical-limits.ts        # Physical constants and limits
├── measurement-validator.ts  # Validation logic
└── unit-system.ts           # Unit conversion system

components/validation/
└── measurement-validator.tsx # React validation component
```

## Development

### Prerequisites

- Node.js 18+
- TypeScript 5+
- Next.js 14+


### Installation

```shellscript
npm install
# or
yarn install
# or
pnpm install
```

### Running the Development Server

```shellscript
npm run dev
# or
yarn dev
# or
pnpm dev
```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

```