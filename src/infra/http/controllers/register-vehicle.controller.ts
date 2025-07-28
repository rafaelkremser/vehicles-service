import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
} from '@nestjs/common'
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { z } from 'zod'
import { VehicleAlreadyExistsError } from '@/domain/rental/application/use-cases/errors/vehicle-already-exists-error'
import { RegisterVehicleUseCase } from '@/domain/rental/application/use-cases/register-vehicle'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'

const registerVehicleBodySchema = z.object({
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

const bodyValidationPipe = new ZodValidationPipe(registerVehicleBodySchema)

type RegisterVehicleBodySchema = z.infer<typeof registerVehicleBodySchema>

@ApiTags('vehicles')
@Controller('/vehicles')
export class RegisterVehicleController {
  constructor(private registerVehicle: RegisterVehicleUseCase) {}

  @Post()
  @HttpCode(201)
  @ApiBody({
    description: 'Vehicle registration data',
    schema: {
      example: {
        licensePlate: 'ABC1234',
        chassisNumber: '1HGCM82633A123456',
        renavam: '12345678901',
        model: 'Civic',
        brand: 'Honda',
        year: 2020,
      },
    },
  })
  @ApiOperation({ summary: 'Register a new vehicle' })
  @ApiResponse({ status: 201, description: 'Vehicle registered successfully' })
  @ApiResponse({ status: 400, description: 'Invalid request data' })
  @ApiResponse({ status: 409, description: 'The vehicle already exists' })
  async handle(@Body(bodyValidationPipe) body: RegisterVehicleBodySchema) {
    const { licensePlate, chassisNumber, renavam, model, brand, year } = body

    const result = await this.registerVehicle.handle({
      licensePlate,
      chassisNumber,
      renavam,
      model,
      brand,
      year,
    })

    if (result.isLeft()) {
      if (result.value instanceof VehicleAlreadyExistsError) {
        throw new ConflictException('The vehicle already exists')
      }

      throw new BadRequestException()
    }
  }
}
