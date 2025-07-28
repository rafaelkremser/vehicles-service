import { PaginationParams } from '@/core/repositories/pagination-params'
import { Vehicle } from '@/domain/rental/enterprise/entities/vehicle'

export abstract class VehiclesRepository {
  abstract findById(id: string): Promise<Vehicle | null>
  abstract findByLicensePlate(plate: string): Promise<Vehicle | null>
  abstract findByChassisNumber(chassis: string): Promise<Vehicle | null>
  abstract findByRenavam(renavam: string): Promise<Vehicle | null>
  abstract findManyRecent(params: PaginationParams): Promise<Vehicle[]>
  abstract save(vehicle: Vehicle): Promise<void>
  abstract create(vehicle: Vehicle): Promise<void>
  abstract delete(vehicle: Vehicle): Promise<void>
}
