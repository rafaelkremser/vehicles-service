import { faker } from '@faker-js/faker'
import { Injectable } from '@nestjs/common'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  Vehicle,
  type VehicleProps,
} from '@/domain/rental/enterprise/entities/vehicle'
import { PrismaVehicleMapper } from '@/infra/database/prisma/mappers/prisma-vehicle-mapper'
import { PrismaService } from '@/infra/database/prisma/prisma.service'

export function makeVehicle(
  override: Partial<VehicleProps> = {},
  id?: UniqueEntityID
) {
  const vehicle = Vehicle.create(
    {
      licensePlate: faker.vehicle.vrm(),
      chassisNumber: faker.vehicle.vin(),
      renavam: faker.string.numeric(11),
      model: faker.vehicle.model(),
      brand: faker.vehicle.manufacturer(),
      year: faker.number.int({ min: 2000, max: 2023 }),
      ...override,
    },
    id
  )

  return vehicle
}

@Injectable()
export class VehicleFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaVehicle(data: Partial<VehicleProps> = {}): Promise<Vehicle> {
    const vehicle = makeVehicle(data)

    await this.prisma.vehicle.create({
      data: PrismaVehicleMapper.toPrisma(vehicle),
    })

    return vehicle
  }
}
