import { Injectable } from '@nestjs/common'
import { type Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { VehiclesRepository } from '../repositories/vehicles-repository'

interface DeleteVehicleUseCaseRequest {
  vehicleId: string
}

type DeleteVehicleUseCaseResponse = Either<ResourceNotFoundError, null>

@Injectable()
export class DeleteVehicleUseCase {
  constructor(private vehiclesRepository: VehiclesRepository) {}

  async handle({
    vehicleId,
  }: DeleteVehicleUseCaseRequest): Promise<DeleteVehicleUseCaseResponse> {
    const vehicle = await this.vehiclesRepository.findById(vehicleId)

    if (!vehicle) {
      return left(new ResourceNotFoundError())
    }

    await this.vehiclesRepository.delete(vehicle)

    return right(null)
  }
}
