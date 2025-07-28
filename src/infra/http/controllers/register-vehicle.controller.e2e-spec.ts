import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import * as request from 'supertest'
import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'

describe('Register Vehicle (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
    }).compile()

    app = moduleRef.createNestApplication()

    prisma = moduleRef.get(PrismaService)

    await app.init()
  })

  test('[POST] /vehicles', async () => {
    const response = await request(app.getHttpServer()).post('/vehicles').send({
      licensePlate: 'abc-1234',
      chassisNumber: '1HGCM82633A123456',
      renavam: '12345678901',
      model: 'Civic',
      brand: 'Honda',
      year: 2020,
    })

    expect(response.statusCode).toBe(201)

    const vehicleOnDatabase = await prisma.vehicle.findFirst({
      where: {
        licensePlate: 'ABC1234',
      },
    })

    expect(vehicleOnDatabase).toBeTruthy()
  })
})
