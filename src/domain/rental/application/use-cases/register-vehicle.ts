import { Injectable } from '@nestjs/common'
import { type Either, left, right } from '@/core/either'
import { Vehicle } from '@/domain/rental/enterprise/entities/vehicle'
import { VehiclesRepository } from '../repositories/vehicles-repository'
import { VehicleAlreadyExistsError } from './errors/vehicle-already-exists-error'

interface RegisterVehicleUseCaseRequest {
  licensePlate: string
  chassisNumber: string
  renavam: string
  model: string
  brand: string
  year: number
}

type RegisterVehicleUseCaseResponse = Either<
  VehicleAlreadyExistsError,
  {
    vehicle: Vehicle
  }
>

@Injectable()
export class RegisterVehicleUseCase {
  constructor(private vehiclesRepository: VehiclesRepository) {}

  async handle({
    licensePlate,
    chassisNumber,
    renavam,
    model,
    brand,
    year,
  }: RegisterVehicleUseCaseRequest): Promise<RegisterVehicleUseCaseResponse> {
    const vehicleWithSameLicensePlate =
      await this.vehiclesRepository.findByLicensePlate(licensePlate)

    if (vehicleWithSameLicensePlate) {
      return left(new VehicleAlreadyExistsError())
    }

    const vehicleWithSameChassisNumber =
      await this.vehiclesRepository.findByChassisNumber(chassisNumber)

    if (vehicleWithSameChassisNumber) {
      return left(new VehicleAlreadyExistsError())
    }

    const vehicleWithSameRenavam =
      await this.vehiclesRepository.findByRenavam(renavam)

    if (vehicleWithSameRenavam) {
      return left(new VehicleAlreadyExistsError())
    }

    const vehicle = Vehicle.create({
      licensePlate,
      chassisNumber,
      renavam,
      model,
      brand,
      year,
    })

    await this.vehiclesRepository.create(vehicle)

    return right({ vehicle })
  }
}
