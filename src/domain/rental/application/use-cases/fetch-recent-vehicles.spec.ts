import { makeVehicle } from 'test/factories/make-vehicle'
import { InMemoryVehiclesRepository } from 'test/repositories/in-memory-vehicles-repository'
import { FetchRecentVehiclesUseCase } from './fetch-recent-vehicles'

let inMemoryVehiclesRepository: InMemoryVehiclesRepository
let sut: FetchRecentVehiclesUseCase

describe('Fetch Recent Vehicles', () => {
  beforeEach(() => {
    inMemoryVehiclesRepository = new InMemoryVehiclesRepository()
    sut = new FetchRecentVehiclesUseCase(inMemoryVehiclesRepository)
  })

  it('should be able to fetch recent vehicles', async () => {
    await inMemoryVehiclesRepository.create(
      makeVehicle({ createdAt: new Date(2022, 0, 20) })
    )
    await inMemoryVehiclesRepository.create(
      makeVehicle({ createdAt: new Date(2022, 0, 18) })
    )
    await inMemoryVehiclesRepository.create(
      makeVehicle({ createdAt: new Date(2022, 0, 23) })
    )

    const result = await sut.handle({
      page: 1,
    })

    expect(result.value?.vehicles).toEqual([
      expect.objectContaining({ createdAt: new Date(2022, 0, 23) }),
      expect.objectContaining({ createdAt: new Date(2022, 0, 20) }),
      expect.objectContaining({ createdAt: new Date(2022, 0, 18) }),
    ])
  })

  it('should be able to fetch paginated vehicles', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryVehiclesRepository.create(makeVehicle())
    }

    const result = await sut.handle({
      page: 2,
    })

    expect(result.value?.vehicles).toHaveLength(2)
  })
})
