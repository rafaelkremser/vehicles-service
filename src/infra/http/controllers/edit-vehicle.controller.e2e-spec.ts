import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import * as request from 'supertest'
import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { VehicleFactory } from '../../../../test/factories/make-vehicle'

describe('Edit Vehicle (E2E)', () => {
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

  test('[PUT] /vehicles/:id', async () => {
    const createdVehicle = await vehicleFactory.makePrismaVehicle()

    const response = await request(app.getHttpServer())
      .put(`/vehicles/${createdVehicle.id}`)
      .send({
        licensePlate: 'NEW-1234',
        chassisNumber: '12345678901234567',
        renavam: '12345678901',
        model: 'New Model',
        brand: 'New Brand',
        year: 2022,
      })

    expect(response.statusCode).toBe(204)

    const vehicleOnDatabase = await prisma.vehicle.findFirst({
      where: {
        licensePlate: 'NEW1234',
      },
    })

    expect(vehicleOnDatabase).toBeTruthy()
  })
})
