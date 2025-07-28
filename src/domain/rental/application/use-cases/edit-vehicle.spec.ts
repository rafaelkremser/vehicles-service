import { makeVehicle } from 'test/factories/make-vehicle'
import { InMemoryVehiclesRepository } from 'test/repositories/in-memory-vehicles-repository'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { EditVehicleUseCase } from './edit-vehicle'

let inMemoryVehiclesRepository: InMemoryVehiclesRepository
let sut: EditVehicleUseCase

describe('Edit Vehicle', () => {
  beforeEach(() => {
    inMemoryVehiclesRepository = new InMemoryVehiclesRepository()
    sut = new EditVehicleUseCase(inMemoryVehiclesRepository)
  })

  it('should be able to edit a vehicle', async () => {
    const newVehicle = makeVehicle({}, new UniqueEntityID('vehicle-1'))

    await inMemoryVehiclesRepository.create(newVehicle)

    await sut.handle({
      vehicleId: newVehicle.id.toValue(),
      licensePlate: 'XYZ-5678',
      chassisNumber: '9BWZZZ377VT004252',
      renavam: '98765432101',
      model: 'Onix Plus',
      brand: 'Chevrolet',
      year: 2023,
    })

    expect(inMemoryVehiclesRepository.items[0]).toMatchObject({
      licensePlate: 'XYZ-5678',
      chassisNumber: '9BWZZZ377VT004252',
      renavam: '98765432101',
      model: 'Onix Plus',
      brand: 'Chevrolet',
      year: 2023,
    })
  })

  it('should not be able to edit if vehicle does not exist', async () => {
    const newVehicle = makeVehicle(
      {
        licensePlate: 'ABC-1234',
        chassisNumber: '9BWZZZ377VT004252',
        renavam: '98765432101',
        model: 'Onix Plus',
        brand: 'Chevrolet',
        year: 2023,
      },
      new UniqueEntityID('vehicle-1')
    )

    await inMemoryVehiclesRepository.create(newVehicle)

    const result = await sut.handle({
      vehicleId: 'non-existent-id',
      licensePlate: 'XYZ-5678',
      chassisNumber: '9BWZZZ377VT004252',
      renavam: '98765432101',
      model: 'Onix Plus',
      brand: 'Chevrolet',
      year: 2023,
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
    expect(inMemoryVehiclesRepository.items[0]).toMatchObject({
      licensePlate: 'ABC-1234',
      chassisNumber: '9BWZZZ377VT004252',
      renavam: '98765432101',
      model: 'Onix Plus',
      brand: 'Chevrolet',
      year: 2023,
    })
  })
})
