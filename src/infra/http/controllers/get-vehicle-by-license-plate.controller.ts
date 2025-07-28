import {
  BadRequestException,
  Controller,
  Get,
  HttpCode,
  NotFoundException,
  Param,
} from '@nestjs/common'
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { GetVehicleByLicensePlateUseCase } from '@/domain/rental/application/use-cases/get-vehicle-by-license-plate'
import { VehiclePresenter } from '../presenters/vehicle-presenter'

@ApiTags('vehicles')
@Controller('/vehicles/:licensePlate')
export class GetVehicleByLicensePlateController {
  constructor(
    private getVehicleByLicensePlate: GetVehicleByLicensePlateUseCase
  ) {}

  @Get()
  @HttpCode(200)
  @ApiParam({
    name: 'licensePlate',
    description: 'License plate of the vehicle to retrieve',
    example: 'ABC1234',
  })
  @ApiOperation({ summary: 'Get vehicle by license plate' })
  @ApiResponse({ status: 200, description: 'Vehicle retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Vehicle not found' })
  async handle(@Param('licensePlate') licensePlate: string) {
    const result = await this.getVehicleByLicensePlate.handle({
      licensePlate,
    })

    if (result.isLeft()) {
      if (result.value instanceof ResourceNotFoundError) {
        throw new NotFoundException('Vehicle not found')
      }

      throw new BadRequestException()
    }

    return {
      vehicle: VehiclePresenter.toHTTP(result.value.vehicle),
    }
  }
}
