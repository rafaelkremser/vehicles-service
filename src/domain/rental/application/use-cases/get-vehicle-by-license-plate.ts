import { Injectable } from '@nestjs/common'
import { type Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { Vehicle } from '../../enterprise/entities/vehicle'
import { VehiclesRepository } from '../repositories/vehicles-repository'

interface GetVehicleByLicensePlateUseCaseRequest {
  licensePlate: string
}

type GetVehicleByLicensePlateUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    vehicle: Vehicle
  }
>

@Injectable()
export class GetVehicleByLicensePlateUseCase {
  constructor(private vehiclesRepository: VehiclesRepository) {}

  async handle({
    licensePlate,
  }: GetVehicleByLicensePlateUseCaseRequest): Promise<GetVehicleByLicensePlateUseCaseResponse> {
    const vehicle =
      await this.vehiclesRepository.findByLicensePlate(licensePlate)

    if (!vehicle) {
      return left(new ResourceNotFoundError())
    }

    return right({ vehicle })
  }
}
