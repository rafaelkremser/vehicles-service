import {
  BadRequestException,
  Controller,
  Get,
  HttpCode,
  Query,
} from '@nestjs/common'
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger'
import { z } from 'zod'
import { FetchRecentVehiclesUseCase } from '@/domain/rental/application/use-cases/fetch-recent-vehicles'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { VehiclePresenter } from '../presenters/vehicle-presenter'

const pageQueryParamSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema)

type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>

@ApiTags('vehicles')
@Controller('/vehicles')
export class FetchRecentVehiclesController {
  constructor(private fetchRecentVehicles: FetchRecentVehiclesUseCase) {}

  @Get()
  @HttpCode(200)
  @ApiOperation({ summary: 'Fetch recently registered vehicles' })
  @ApiParam({
    name: 'page',
    description: 'Page for pagination',
    example: '1',
  })
  @ApiResponse({ status: 200, description: 'Vehicles retrieved successfully' })
  @ApiResponse({ status: 400, description: 'Invalid request data' })
  async handle(@Query('page', queryValidationPipe) page: PageQueryParamSchema) {
    const result = await this.fetchRecentVehicles.handle({
      page,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    const vehicles = result.value.vehicles

    return { vehicles: vehicles.map(VehiclePresenter.toHTTP) }
  }
}
