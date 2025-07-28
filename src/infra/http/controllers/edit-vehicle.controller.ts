import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  NotFoundException,
  Param,
  Put,
} from '@nestjs/common'
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import { z } from 'zod'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { EditVehicleUseCase } from '@/domain/rental/application/use-cases/edit-vehicle'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'

const editVehicleBodySchema = z.object({
  licensePlate: z
    .string()
    .min(7, 'The license plate must have at least 7 characters')
    .max(8, 'The license plate must have at most 8 characters')
    .transform((val) => val.replace(/-/g, '').toUpperCase().trim()),
  chassisNumber: z
    .string()
    .min(17, 'The chassis number must have 17 characters')
    .max(17, 'The chassis number must have 17 characters'),
  renavam: z.string().regex(/^\d+$/, 'Renavam must contain only digits'),
  model: z.string(),
  brand: z.string(),
  year: z.number(),
})

const bodyValidationPipe = new ZodValidationPipe(editVehicleBodySchema)

type EditVehicleBodySchema = z.infer<typeof editVehicleBodySchema>

@ApiTags('vehicles')
@Controller('/vehicles/:id')
export class EditVehicleController {
  constructor(private editVehicle: EditVehicleUseCase) {}

  @Put()
  @HttpCode(204)
  @ApiOperation({ summary: 'Edit vehicle by ID' })
  @ApiParam({
    name: 'id',
    description: 'Vehicle ID to update',
  })
  @ApiBody({
    description: 'Vehicle registration data',
    schema: {
      example: {
        licensePlate: 'ABC1333',
        chassisNumber: '1HGCM82633A111111',
        renavam: '12345678222',
        model: 'Toyota Corolla',
        brand: 'Toyota',
        year: 2022,
      },
    },
  })
  @ApiResponse({ status: 204, description: 'Vehicle updated successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @ApiResponse({ status: 404, description: 'The vehicle not found' })
  async handle(
    @Body(bodyValidationPipe) body: EditVehicleBodySchema,
    @Param('id') vehicleId: string
  ) {
    const { licensePlate, chassisNumber, renavam, model, brand, year } = body

    const result = await this.editVehicle.handle({
      vehicleId,
      licensePlate,
      chassisNumber,
      renavam,
      model,
      brand,
      year,
    })

    if (result.isLeft()) {
      if (result.value instanceof ResourceNotFoundError) {
        throw new NotFoundException('Vehicle not found')
      }

      throw new BadRequestException()
    }
  }
}
