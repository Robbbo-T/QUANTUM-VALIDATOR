"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Check } from "lucide-react"
import { EnhancedMeasurementValidator } from "@/lib/validation/measurement-validator"

export function MeasurementValidator() {
  const [field, setField] = useState({
    Ex: 1000,
    ExUnit: "V/m",
    Ey: 1200,
    EyUnit: "V/m",
    Ez: 800,
    EzUnit: "V/m",
  })

  const [validationResults, setValidationResults] = useState<any[]>([])
  const [isValid, setIsValid] = useState(false)

  const validator = new EnhancedMeasurementValidator()

  const handleValidate = () => {
    const results = validator.validateQuantumField(field)
    setValidationResults(results)
    setIsValid(results.length === 0)
  }

  const handleFieldChange = (component: string, value: string) => {
    setField((prev) => ({
      ...prev,
      [component]: Number(value),
    }))
  }

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-6">Quantum Field Measurement Validator</h2>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {["Ex", "Ey", "Ez"].map((component) => (
          <div key={component}>
            <label className="text-sm font-medium mb-2 block">
              {component} ({field[`${component}Unit` as keyof typeof field]})
            </label>
            <Input
              type="number"
              value={field[component as keyof typeof field]}
              onChange={(e) => handleFieldChange(component, e.target.value)}
            />
          </div>
        ))}
      </div>

      <Button onClick={handleValidate} className="mb-6">
        Validate Measurements
      </Button>

      {validationResults.length > 0 ? (
        <div className="space-y-4">
          {validationResults.map((error, index) => (
            <Alert key={index} variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {error.message}
                {error.expectedRange && (
                  <div className="mt-2 text-sm">
                    Expected range: {error.expectedRange.min || 0} to {error.expectedRange.max}{" "}
                    {error.expectedRange.unit}
                  </div>
                )}
              </AlertDescription>
            </Alert>
          ))}
        </div>
      ) : (
        isValid && (
          <Alert className="bg-green-50">
            <Check className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-600">
              All measurements are within valid physical limits
            </AlertDescription>
          </Alert>
        )
      )}
    </Card>
  )
}

