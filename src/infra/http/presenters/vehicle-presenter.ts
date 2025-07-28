import { Vehicle } from '@/domain/rental/enterprise/entities/vehicle'

export class VehiclePresenter {
  static toHTTP(vehicle: Vehicle) {
    return {
      id: vehicle.id.toString(),
      licensePlate: vehicle.licensePlate,
      chassisNumber: vehicle.chassisNumber,
      renavam: vehicle.renavam,
      model: vehicle.model,
      brand: vehicle.brand,
      year: vehicle.year,
      createdAt: vehicle.createdAt,
      updatedAt: vehicle.updatedAt,
    }
  }
}
