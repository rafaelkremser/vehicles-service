import { makeVehicle } from 'test/factories/make-vehicle'
import { InMemoryVehiclesRepository } from 'test/repositories/in-memory-vehicles-repository'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { DeleteVehicleUseCase } from './delete-vehicle'

let inMemoryVehiclesRepository: InMemoryVehiclesRepository
let sut: DeleteVehicleUseCase

describe('Delete Vehicle', () => {
  beforeEach(() => {
    inMemoryVehiclesRepository = new InMemoryVehiclesRepository()
    sut = new DeleteVehicleUseCase(inMemoryVehiclesRepository)
  })

  it('should be able to delete a vehicle', async () => {
    const createdVehicle = makeVehicle({}, new UniqueEntityID('vehicle-1'))

    await inMemoryVehiclesRepository.create(createdVehicle)

    await sut.handle({
      vehicleId: 'vehicle-1',
    })

    expect(inMemoryVehiclesRepository.items).toHaveLength(0)
  })

  it('should not be able to delete if vehicle does not exist', async () => {
    const newVehicle = makeVehicle({}, new UniqueEntityID('vehicle-1'))

    await inMemoryVehiclesRepository.create(newVehicle)

    const result = await sut.handle({
      vehicleId: 'non-existent-id',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
    expect(inMemoryVehiclesRepository.items).toHaveLength(1)
  })
})
