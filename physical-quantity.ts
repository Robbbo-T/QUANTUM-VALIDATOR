import type PhysicalDimensions from "./physical-dimensions"
import { UnitSystem } from "./unit-system"

export class PhysicalQuantity {
  constructor(
    private readonly value: number,
    private readonly unit: string,
    private readonly dimensions: PhysicalDimensions,
  ) {}

  // Add quantities with compatible dimensions
  add(other: PhysicalQuantity): PhysicalQuantity {
    if (!this.dimensions.equals(other.dimensions)) {
      throw new Error(`Cannot add quantities with dimensions ${this.dimensions} and ${other.dimensions}`)
    }

    // Convert both to SI before adding
    const sum = UnitSystem.convertToSI(this.value, this.unit) + UnitSystem.convertToSI(other.value, other.unit)

    return new PhysicalQuantity(sum, "SI", this.dimensions)
  }

  // Multiply quantities by adding their dimensions
  multiply(other: PhysicalQuantity): PhysicalQuantity {
    const product = this.value * other.value
    const newDimensions = this.dimensions.multiply(other.dimensions)

    return new PhysicalQuantity(product, "SI", newDimensions)
  }

  // Get the value in specific units
  getIn(targetUnit: string): number {
    const siValue = UnitSystem.convertToSI(this.value, this.unit)
    return UnitSystem.convertFromSI(siValue, targetUnit)
  }

  // Check if the value is within physical limits
  isInRange(min: number, max: number, unit: string): boolean {
    const valueInUnit = this.getIn(unit)
    return valueInUnit >= min && valueInUnit <= max
  }

  // Get the dimensions
  getDimensions(): PhysicalDimensions {
    return this.dimensions
  }

  // Get the value
  getValue(): number {
    return this.value
  }

  // Get the unit
  getUnit(): string {
    return this.unit
  }
}

