import { DomainEvents } from '@/core/events/domain-events'
import { PaginationParams } from '@/core/repositories/pagination-params'
import { VehiclesRepository } from '@/domain/rental/application/repositories/vehicles-repository'
import { Vehicle } from '@/domain/rental/enterprise/entities/vehicle'

export class InMemoryVehiclesRepository implements VehiclesRepository {
  public items: Vehicle[] = []

  async findById(id: string) {
    const vehicle = this.items.find((item) => item.id.toString() === id)

    if (!vehicle) {
      return null
    }

    return vehicle
  }

  async findByLicensePlate(licensePlate: string) {
    const vehicle = this.items.find(
      (item) => item.licensePlate === licensePlate
    )

    if (!vehicle) {
      return null
    }

    return vehicle
  }

  async findByChassisNumber(chassisNumber: string) {
    const vehicle = this.items.find(
      (item) => item.chassisNumber === chassisNumber
    )

    if (!vehicle) {
      return null
    }

    return vehicle
  }

  async findByRenavam(renavam: string) {
    const vehicle = this.items.find((item) => item.renavam === renavam)

    if (!vehicle) {
      return null
    }

    return vehicle
  }

  async findManyRecent({ page }: PaginationParams) {
    const vehicles = this.items
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 20, page * 20)

    return vehicles
  }

  async create(vehicle: Vehicle) {
    this.items.push(vehicle)

    DomainEvents.dispatchEventsForAggregate(vehicle.id)
  }

  async save(vehicle: Vehicle) {
    const itemIndex = this.items.findIndex((item) => item.id === vehicle.id)

    this.items[itemIndex] = vehicle

    DomainEvents.dispatchEventsForAggregate(vehicle.id)
  }

  async delete(vehicle: Vehicle) {
    const itemIndex = this.items.findIndex((item) => item.id === vehicle.id)

    this.items.splice(itemIndex, 1)
  }
}
