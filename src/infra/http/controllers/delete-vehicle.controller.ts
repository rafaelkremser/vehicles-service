import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  NotFoundException,
  Param,
} from '@nestjs/common'
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { DeleteVehicleUseCase } from '@/domain/rental/application/use-cases/delete-vehicle'

@ApiTags('vehicles')
@Controller('/vehicles/:id')
export class DeleteVehicleController {
  constructor(private deleteVehicle: DeleteVehicleUseCase) {}

  @Delete()
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete a vehicle by ID' })
  @ApiParam({
    name: 'id',
    description: 'ID of the vehicle to be deleted',
  })
  @ApiResponse({ status: 204, description: 'Vehicle deleted successfully' })
  @ApiResponse({ status: 404, description: 'Vehicle not found' })
  @ApiResponse({
    status: 400,
    description: 'Invalid request or deletion error',
  })
  async handle(@Param('id') vehicleId: string) {
    const result = await this.deleteVehicle.handle({
      vehicleId,
    })

    if (result.isLeft()) {
      if (result.value instanceof ResourceNotFoundError) {
        throw new NotFoundException('Vehicle not found')
      }

      throw new BadRequestException()
    }
  }
}
