import { Injectable } from '@nestjs/common'
import { DomainEvents } from '@/core/events/domain-events'
import { PaginationParams } from '@/core/repositories/pagination-params'
import { VehiclesRepository } from '@/domain/rental/application/repositories/vehicles-repository'
import { Vehicle } from '@/domain/rental/enterprise/entities/vehicle'
import { PrismaVehicleMapper } from '../mappers/prisma-vehicle-mapper'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaVehiclesRepository implements VehiclesRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string) {
    const vehicle = await this.prisma.vehicle.findUnique({
      where: { id },
    })

    if (!vehicle) {
      return null
    }

    return PrismaVehicleMapper.toDomain(vehicle)
  }

  async findByLicensePlate(licensePlate: string) {
    const vehicle = await this.prisma.vehicle.findUnique({
      where: { licensePlate },
    })

    if (!vehicle) {
      return null
    }

    return PrismaVehicleMapper.toDomain(vehicle)
  }

  async findByChassisNumber(chassisNumber: string) {
    const vehicle = await this.prisma.vehicle.findUnique({
      where: { chassisNumber },
    })

    if (!vehicle) {
      return null
    }

    return PrismaVehicleMapper.toDomain(vehicle)
  }

  async findByRenavam(renavam: string) {
    const vehicle = await this.prisma.vehicle.findUnique({
      where: { renavam },
    })

    if (!vehicle) {
      return null
    }

    return PrismaVehicleMapper.toDomain(vehicle)
  }

  async findManyRecent({ page }: PaginationParams) {
    const vehicles = await this.prisma.vehicle.findMany({
      orderBy: { createdAt: 'desc' },
      take: 20,
      skip: (page - 1) * 20,
    })

    return vehicles.map(PrismaVehicleMapper.toDomain)
  }

  async create(vehicle: Vehicle) {
    const data = PrismaVehicleMapper.toPrisma(vehicle)

    await this.prisma.vehicle.create({
      data,
    })

    DomainEvents.dispatchEventsForAggregate(vehicle.id)
  }

  async save(vehicle: Vehicle) {
    const data = PrismaVehicleMapper.toPrisma(vehicle)

    await this.prisma.vehicle.update({
      where: {
        id: vehicle.id.toString(),
      },
      data,
    })

    DomainEvents.dispatchEventsForAggregate(vehicle.id)
  }

  async delete(vehicle: Vehicle) {
    await this.prisma.vehicle.delete({
      where: { id: vehicle.id.toString() },
    })
  }
}
