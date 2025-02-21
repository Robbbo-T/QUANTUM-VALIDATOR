export class UnitSystem {
  private static readonly conversionFactors: { [unit: string]: number } = {
    "V/m": 1, // Volts per meter (SI unit for electric field)
    T: 1, // Tesla (SI unit for magnetic field)
    K: 1, // Kelvin (SI unit for temperature)
    Pa: 1, // Pascal (SI unit for pressure)
    J·s: 1, // Joule-second (SI unit for action, Planck constant)
    SI: 1, // Represents a value already in SI units
  }

  static convertToSI(value: number, unit: string): number {
    if (!UnitSystem.conversionFactors[unit]) {
      throw new Error(`Unsupported unit: ${unit}`)
    }
    return value * UnitSystem.conversionFactors[unit]
  }

  static convertFromSI(value: number, targetUnit: string): number {
    if (!UnitSystem.conversionFactors[targetUnit]) {
      throw new Error(`Unsupported unit: ${targetUnit}`)
    }
    return value / UnitSystem.conversionFactors[targetUnit]
  }
}

