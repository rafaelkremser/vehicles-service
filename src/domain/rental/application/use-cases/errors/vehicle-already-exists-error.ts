import { UseCaseError } from '@/core/errors/use-case-error'

export class VehicleAlreadyExistsError extends Error implements UseCaseError {
  constructor() {
    super('The vehicle already exists.')
  }
}
