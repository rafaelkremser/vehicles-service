import { InMemoryVehiclesRepository } from 'test/repositories/in-memory-vehicles-repository'
import { RegisterVehicleUseCase } from './register-vehicle'

let inMemoryVehiclesRepository: InMemoryVehiclesRepository
let sut: RegisterVehicleUseCase

describe('Register Vehicle', () => {
  beforeEach(() => {
    inMemoryVehiclesRepository = new InMemoryVehiclesRepository()
    sut = new RegisterVehicleUseCase(inMemoryVehiclesRepository)
  })

  it('should be able to register a vehicle', async () => {
    const result = await sut.handle({
      licensePlate: 'ABC-1234',
      chassisNumber: '9BWZZZ377VT004251',
      renavam: '12345678901',
      model: 'Onix',
      brand: 'Chevrolet',
      year: 2022,
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      vehicle: inMemoryVehiclesRepository.items[0],
    })
  })

  it('should not be able to register a vehicle with same license plate', async () => {
    await sut.handle({
      licensePlate: 'ABC-1234',
      chassisNumber: '9BWZZZ377VT004251',
      renavam: '12345678901',
      model: 'Onix',
      brand: 'Chevrolet',
      year: 2022,
    })

    const result = await sut.handle({
      licensePlate: 'ABC-1234',
      chassisNumber: '9BWZZZ377VT004252',
      renavam: '12345678902',
      model: 'Onix Plus',
      brand: 'Chevrolet',
      year: 2023,
    })

    expect(result.isLeft()).toBe(true)
    expect(inMemoryVehiclesRepository.items).toHaveLength(1)
    expect(inMemoryVehiclesRepository.items).toEqual([
      expect.objectContaining({
        model: 'Onix',
      }),
    ])
  })

  it('should not be able to register a vehicle with same chasis number', async () => {
    await sut.handle({
      licensePlate: 'ABC-1234',
      chassisNumber: '9BWZZZ377VT004251',
      renavam: '12345678901',
      model: 'Onix',
      brand: 'Chevrolet',
      year: 2022,
    })

    const result = await sut.handle({
      licensePlate: 'ABC-1235',
      chassisNumber: '9BWZZZ377VT004251',
      renavam: '12345678902',
      model: 'Onix Plus',
      brand: 'Chevrolet',
      year: 2023,
    })

    expect(result.isLeft()).toBe(true)
    expect(inMemoryVehiclesRepository.items).toHaveLength(1)
    expect(inMemoryVehiclesRepository.items).toEqual([
      expect.objectContaining({
        model: 'Onix',
      }),
    ])
  })

  it('should not be able to register a vehicle with same renavam', async () => {
    await sut.handle({
      licensePlate: 'ABC-1234',
      chassisNumber: '9BWZZZ377VT004251',
      renavam: '12345678901',
      model: 'Onix',
      brand: 'Chevrolet',
      year: 2022,
    })

    const result = await sut.handle({
      licensePlate: 'ABC-1235',
      chassisNumber: '9BWZZZ377VT004252',
      renavam: '12345678901',
      model: 'Onix Plus',
      brand: 'Chevrolet',
      year: 2023,
    })

    expect(result.isLeft()).toBe(true)
    expect(inMemoryVehiclesRepository.items).toHaveLength(1)
    expect(inMemoryVehiclesRepository.items).toEqual([
      expect.objectContaining({
        model: 'Onix',
      }),
    ])
  })
})
