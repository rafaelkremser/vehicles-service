import { AggregateRoot } from '@/core/entities/aggregate-root'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface VehicleProps {
  licensePlate: string
  chassisNumber: string
  renavam: string
  model: string
  brand: string
  year: number
  createdAt: Date
  updatedAt?: Date | null
}

export class Vehicle extends AggregateRoot<VehicleProps> {
  get licensePlate() {
    return this.props.licensePlate
  }

  set licensePlate(licensePlate: string) {
    this.props.licensePlate = licensePlate
    this.touch()
  }

  get chassisNumber() {
    return this.props.chassisNumber
  }

  set chassisNumber(chassisNumber: string) {
    this.props.chassisNumber = chassisNumber
    this.touch()
  }

  get renavam() {
    return this.props.renavam
  }

  set renavam(renavam: string) {
    this.props.renavam = renavam
    this.touch()
  }

  get model() {
    return this.props.model
  }

  set model(model: string) {
    this.props.model = model
    this.touch()
  }

  get brand() {
    return this.props.brand
  }

  set brand(brand: string) {
    this.props.brand = brand
    this.touch()
  }

  get year() {
    return this.props.year
  }

  set year(year: number) {
    this.props.year = year
    this.touch()
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  static create(
    props: Optional<VehicleProps, 'createdAt'>,
    id?: UniqueEntityID
  ) {
    const vehicle = new Vehicle(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id
    )

    return vehicle
  }
}
