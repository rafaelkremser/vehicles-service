import { makeVehicle } from 'test/factories/make-vehicle'
import { InMemoryVehiclesRepository } from 'test/repositories/in-memory-vehicles-repository'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { GetVehicleByLicensePlateUseCase } from './get-vehicle-by-license-plate'

let inMemoryVehiclesRepository: InMemoryVehiclesRepository
let sut: GetVehicleByLicensePlateUseCase

describe('Get Vehicle By License Plate', () => {
  beforeEach(() => {
    inMemoryVehiclesRepository = new InMemoryVehiclesRepository()
    sut = new GetVehicleByLicensePlateUseCase(inMemoryVehiclesRepository)
  })

  it('should be able to get a vehicle by license plate', async () => {
    const newVehicle = makeVehicle(
      { licensePlate: 'ABC1234' },
      new UniqueEntityID('id-01')
    )

    await inMemoryVehiclesRepository.create(newVehicle)

    const result = await sut.handle({
      licensePlate: 'ABC1234',
    })

    expect(result.value).toMatchObject({
      vehicle: expect.objectContaining({
        id: new UniqueEntityID('id-01'),
        licensePlate: 'ABC1234',
      }),
    })
  })

  it('should not be able to get if vehicle does not exist', async () => {
    const result = await sut.handle({
      licensePlate: 'RFK0000',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
