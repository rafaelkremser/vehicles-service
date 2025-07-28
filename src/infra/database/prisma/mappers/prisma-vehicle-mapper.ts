import { Prisma, Vehicle as PrismaVehicle } from '@prisma/client'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Vehicle } from '@/domain/rental/enterprise/entities/vehicle'

export class PrismaVehicleMapper {
  static toDomain(raw: PrismaVehicle): Vehicle {
    return Vehicle.create(
      {
        licensePlate: raw.licensePlate,
        chassisNumber: raw.chassisNumber,
        renavam: raw.renavam,
        model: raw.model,
        brand: raw.brand,
        year: raw.year,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id)
    )
  }

  static toPrisma(vehicle: Vehicle): Prisma.VehicleUncheckedCreateInput {
    return {
      id: vehicle.id.toString(),
      licensePlate: vehicle.licensePlate,
      chassisNumber: vehicle.chassisNumber,
      renavam: vehicle.renavam,
      model: vehicle.model,
      brand: vehicle.brand,
      year: vehicle.year,
      createdAt: vehicle.createdAt,
      updatedAt: vehicle.updatedAt,
    }
  }
}
