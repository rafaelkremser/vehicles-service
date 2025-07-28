import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import * as request from 'supertest'
import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { VehicleFactory } from '../../../../test/factories/make-vehicle'

describe('Delete Vehicle (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let vehicleFactory: VehicleFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [VehicleFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    prisma = moduleRef.get(PrismaService)
    vehicleFactory = moduleRef.get(VehicleFactory)

    await app.init()
  })

  test('[DELETE] /vehicles/:id', async () => {
    const createdVehicle = await vehicleFactory.makePrismaVehicle()

    const vehicleId = createdVehicle.id.toString()

    const response = await request(app.getHttpServer()).delete(
      `/vehicles/${vehicleId}`
    )

    expect(response.statusCode).toBe(204)

    const vehicleOnDatabase = await prisma.vehicle.findUnique({
      where: {
        id: vehicleId,
      },
    })

    expect(vehicleOnDatabase).toBeNull()
  })
})
