import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import * as request from 'supertest'
import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { VehicleFactory } from '../../../../test/factories/make-vehicle'

describe('Fetch Recent Vehicles (E2E)', () => {
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

  test('[GET] /vehicles', async () => {
    await Promise.all([
      vehicleFactory.makePrismaVehicle({
        licensePlate: 'ABC-1234',
      }),
      vehicleFactory.makePrismaVehicle({
        licensePlate: 'ABC-0000',
      }),
    ])

    const response = await request(app.getHttpServer()).get('/vehicles')

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      vehicles: expect.arrayContaining([
        expect.objectContaining({ licensePlate: 'ABC-1234' }),
        expect.objectContaining({ licensePlate: 'ABC-0000' }),
      ]),
    })
  })
})
