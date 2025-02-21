// First, we create a class to represent physical dimensions using SI base units
class PhysicalDimensions {
  // We use a Map to store the exponents of each base dimension
  private dimensions: Map<string, number>

  constructor() {
    // Initialize all seven SI base dimensions to zero
    this.dimensions = new Map([
      ["mass", 0], // [M] - kilogram
      ["length", 0], // [L] - meter
      ["time", 0], // [T] - second
      ["current", 0], // [I] - ampere
      ["temperature", 0], // [Θ] - kelvin
      ["amount", 0], // [N] - mole
      ["luminosity", 0], // [J] - candela
    ])
  }

  // Create dimensions from a specification object
  static fromObject(spec: Record<string, number>): PhysicalDimensions {
    const dims = new PhysicalDimensions()
    Object.entries(spec).forEach(([dim, power]) => {
      if (!dims.dimensions.has(dim)) {
        throw new Error(`Invalid dimension: ${dim}`)
      }
      dims.dimensions.set(dim, power)
    })
    return dims
  }

  // Multiply physical quantities by adding their dimensions
  multiply(other: PhysicalDimensions): PhysicalDimensions {
    const result = new PhysicalDimensions()
    this.dimensions.forEach((power, dim) => {
      result.dimensions.set(dim, power + (other.dimensions.get(dim) || 0))
    })
    return result
  }

  // Divide physical quantities by subtracting dimensions
  divide(other: PhysicalDimensions): PhysicalDimensions {
    const result = new PhysicalDimensions()
    this.dimensions.forEach((power, dim) => {
      result.dimensions.set(dim, power - (other.dimensions.get(dim) || 0))
    })
    return result
  }

  // Check if two sets of dimensions are equivalent
  equals(other: PhysicalDimensions): boolean {
    return Array.from(this.dimensions.entries()).every(([dim, power]) => other.dimensions.get(dim) === power)
  }

  // Convert dimensions to a human-readable format
  toString(): string {
    const parts: string[] = []
    this.dimensions.forEach((power, dim) => {
      if (power !== 0) {
        // Use proper notation for powers: [M]¹[L]²[T]⁻³
        const formattedPower =
          power === 1
            ? ""
            : power
                .toString()
                .replace("-", "⁻") // Negative superscript
                .replace(/\d/g, (d) => "⁰¹²³⁴⁵⁶⁷⁸⁹"[Number(d)])
        parts.push(`[${dim}]${formattedPower}`)
      }
    })
    return parts.length > 0 ? parts.join("") : "dimensionless"
  }
}

export default PhysicalDimensions

