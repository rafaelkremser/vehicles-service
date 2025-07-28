import { Module } from '@nestjs/common'
import { DeleteVehicleUseCase } from '@/domain/rental/application/use-cases/delete-vehicle'
import { EditVehicleUseCase } from '@/domain/rental/application/use-cases/edit-vehicle'
import { FetchRecentVehiclesUseCase } from '@/domain/rental/application/use-cases/fetch-recent-vehicles'
import { GetVehicleByLicensePlateUseCase } from '@/domain/rental/application/use-cases/get-vehicle-by-license-plate'
import { RegisterVehicleUseCase } from '@/domain/rental/application/use-cases/register-vehicle'
import { DatabaseModule } from '../database/database.module'
import { DeleteVehicleController } from './controllers/delete-vehicle.controller'
import { EditVehicleController } from './controllers/edit-vehicle.controller'
import { FetchRecentVehiclesController } from './controllers/fetch-recent-vehicles.controller'
import { GetVehicleByLicensePlateController } from './controllers/get-vehicle-by-license-plate.controller'
import { RegisterVehicleController } from './controllers/register-vehicle.controller'

@Module({
  imports: [DatabaseModule],
  controllers: [
    RegisterVehicleController,
    GetVehicleByLicensePlateController,
    EditVehicleController,
    DeleteVehicleController,
    FetchRecentVehiclesController,
  ],
  providers: [
    RegisterVehicleUseCase,
    GetVehicleByLicensePlateUseCase,
    EditVehicleUseCase,
    DeleteVehicleUseCase,
    FetchRecentVehiclesUseCase,
  ],
})
export class HttpModule {}
