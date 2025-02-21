import { PhysicalQuantity } from "./physical-quantity"
import { PhysicalLimits } from "./physical-limits"

interface ValidationError {
  code: string
  message: string
  field?: string
  value?: number
  expectedRange?: {
    min?: number
    max?: number
    unit: string
  }
}

interface QuantumFieldMeasurement {
  Ex: number
  ExUnit: string
  Ey: number
  EyUnit: string
  Ez: number
  EzUnit: string
}

export class EnhancedMeasurementValidator {
  validateQuantumField(field: QuantumFieldMeasurement): ValidationError[] {
    const errors: ValidationError[] = []

    try {
      // Validate electric field components
      ;["Ex", "Ey", "Ez"].forEach((component) => {
        const fieldValue = new PhysicalQuantity(
          field[component as keyof QuantumFieldMeasurement],
          field[`${component}Unit` as keyof QuantumFieldMeasurement],
          PhysicalLimits.ELECTROMAGNETIC.ELECTRIC_FIELD.dimensions,
        )

        if (
          !fieldValue.isInRange(
            PhysicalLimits.ELECTROMAGNETIC.ELECTRIC_FIELD.min,
            PhysicalLimits.ELECTROMAGNETIC.ELECTRIC_FIELD.max,
            "V/m",
          )
        ) {
          errors.push({
            code: "ELECTRIC_FIELD_LIMIT",
            message: `Electric field component ${component} exceeds physical limits`,
            field: component,
            value: field[component as keyof QuantumFieldMeasurement],
            expectedRange: {
              min: PhysicalLimits.ELECTROMAGNETIC.ELECTRIC_FIELD.min,
              max: PhysicalLimits.ELECTROMAGNETIC.ELECTRIC_FIELD.max,
              unit: "V/m",
            },
          })
        }
      })

      // Calculate total field strength using dimensional analysis
      const totalField = Math.sqrt(field.Ex * field.Ex + field.Ey * field.Ey + field.Ez * field.Ez)

      const totalFieldQuantity = new PhysicalQuantity(
        totalField,
        "V/m",
        PhysicalLimits.ELECTROMAGNETIC.ELECTRIC_FIELD.dimensions,
      )

      if (!totalFieldQuantity.isInRange(0, PhysicalLimits.ELECTROMAGNETIC.ELECTRIC_FIELD.max, "V/m")) {
        errors.push({
          code: "TOTAL_FIELD_LIMIT",
          message: "Total electric field magnitude exceeds physical limits",
          value: totalField,
          expectedRange: {
            max: PhysicalLimits.ELECTROMAGNETIC.ELECTRIC_FIELD.max,
            unit: "V/m",
          },
        })
      }
    } catch (error) {
      errors.push({
        code: "DIMENSIONAL_ERROR",
        message: error instanceof Error ? error.message : "Unknown error",
      })
    }

    return errors
  }
}

