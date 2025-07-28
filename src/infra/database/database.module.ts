import { Module } from '@nestjs/common'
import { VehiclesRepository } from '@/domain/rental/application/repositories/vehicles-repository'
import { PrismaService } from './prisma/prisma.service'
import { PrismaVehiclesRepository } from './prisma/repositories/prisma-vehicles-repository'

@Module({
  providers: [
    PrismaService,
    {
      provide: VehiclesRepository,
      useClass: PrismaVehiclesRepository,
    },
  ],
  exports: [PrismaService, VehiclesRepository],
})
export class DatabaseModule {}
