import { Injectable } from '@nestjs/common'
import { type Either, right } from '@/core/either'
import { Vehicle } from '@/domain/rental/enterprise/entities/vehicle'
import { VehiclesRepository } from '../repositories/vehicles-repository'

interface FetchRecentVehiclesUseCaseRequest {
  page: number
}

type FetchRecentVehiclesUseCaseResponse = Either<
  null,
  {
    vehicles: Vehicle[]
  }
>

@Injectable()
export class FetchRecentVehiclesUseCase {
  constructor(private vehiclesRepository: VehiclesRepository) {}

  async handle({
    page,
  }: FetchRecentVehiclesUseCaseRequest): Promise<FetchRecentVehiclesUseCaseResponse> {
    const vehicles = await this.vehiclesRepository.findManyRecent({
      page,
    })

    return right({ vehicles })
  }
}
