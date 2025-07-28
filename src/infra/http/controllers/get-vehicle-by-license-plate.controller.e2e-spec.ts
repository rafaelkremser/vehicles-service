import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import * as request from 'supertest'
import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { VehicleFactory } from '../../../../test/factories/make-vehicle'

describe('Get Vehicle By License Plate (E2E)', () => {
  let app: INestApplication
  let vehicleFactory: VehicleFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [VehicleFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    vehicleFactory = moduleRef.get(VehicleFactory)

    await app.init()
  })

  test('[GET] /vehicles/:licensePlate', async () => {
    await vehicleFactory.makePrismaVehicle({
      licensePlate: 'ABC1234',
    })

    const response = await request(app.getHttpServer())
      .get('/vehicles/ABC1234')
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      vehicle: expect.objectContaining({
        licensePlate: 'ABC1234',
      }),
    })
  })
})
