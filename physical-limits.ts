import PhysicalDimensions from "./physical-dimensions"

export class PhysicalLimits {
  static readonly ELECTROMAGNETIC = {
    ELECTRIC_FIELD: {
      dimensions: PhysicalDimensions.fromObject({
        mass: 1,
        length: 1,
        time: -3,
        current: -1,
      }),
      min: -1e6, // V/m (air breakdown)
      max: 1e6,
      unit: "V/m",
    },
    MAGNETIC_FIELD: {
      dimensions: PhysicalDimensions.fromObject({
        mass: 1,
        time: -2,
        current: -1,
      }),
      min: -100, // Tesla (max sustainable)
      max: 100,
      unit: "T",
    },
  }

  static readonly THERMODYNAMIC = {
    TEMPERATURE: {
      dimensions: PhysicalDimensions.fromObject({
        temperature: 1,
      }),
      min: 0, // Kelvin (absolute zero)
      max: 300, // Kelvin (room temperature)
      unit: "K",
    },
    PRESSURE: {
      dimensions: PhysicalDimensions.fromObject({
        mass: 1,
        length: -1,
        time: -2,
      }),
      min: 0, // Pascal
      max: 1e6, // Pascal (10 bar)
      unit: "Pa",
    },
  }

  static readonly QUANTUM = {
    PLANCK_CONSTANT: {
      dimensions: PhysicalDimensions.fromObject({
        mass: 1,
        length: 2,
        time: -1,
      }),
      value: 6.62607015e-34,
      unit: "J·s",
    },
    REDUCED_PLANCK_CONSTANT: {
      dimensions: PhysicalDimensions.fromObject({
        mass: 1,
        length: 2,
        time: -1,
      }),
      value: 1.054571817e-34,
      unit: "J·s",
    },
  }
}

