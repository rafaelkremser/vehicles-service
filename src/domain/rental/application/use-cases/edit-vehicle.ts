import { Injectable } from '@nestjs/common'
import { type Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { Vehicle } from '@/domain/rental/enterprise/entities/vehicle'
import { VehiclesRepository } from '../repositories/vehicles-repository'

interface EditVehicleUseCaseRequest {
  vehicleId: string
  licensePlate: string
  chassisNumber: string
  renavam: string
  model: string
  brand: string
  year: number
}

type EditVehicleUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    vehicle: Vehicle
  }
>

@Injectable()
export class EditVehicleUseCase {
  constructor(private vehiclesRepository: VehiclesRepository) {}

  async handle({
    vehicleId,
    licensePlate,
    chassisNumber,
    renavam,
    model,
    brand,
    year,
  }: EditVehicleUseCaseRequest): Promise<EditVehicleUseCaseResponse> {
    const vehicle = await this.vehiclesRepository.findById(vehicleId)

    if (!vehicle) {
      return left(new ResourceNotFoundError())
    }

    vehicle.licensePlate = licensePlate
    vehicle.chassisNumber = chassisNumber
    vehicle.renavam = renavam
    vehicle.model = model
    vehicle.brand = brand
    vehicle.year = year

    await this.vehiclesRepository.save(vehicle)

    return right({ vehicle })
  }
}
