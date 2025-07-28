# Vehicles Service API

API for vehicle registration and management, built with NestJS, Prisma, and TypeScript.
<div align="left">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" height="40" alt="typescript logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" height="40" alt="nodejs logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-original.svg" height="40" alt="nestjs logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg" height="40" alt="jest logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-plain.svg" height="40" alt="docker logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg" height="40" alt="prisma logo"  />
  <img width="12" />
</div>

---

## Features

- Register new vehicles  
- Fetch recent registered vehicles with pagination  
- Retrieve vehicle details by license plate  
- Update vehicle information  
- Delete a vehicle by ID  
- Input validation with Zod  
- Domain-driven design approach  
- Error handling for resource not found and duplicates  
- E2E and unit testing with Jest  

---

## Technologies

- [Node.js](https://nodejs.org/)  
- [NestJS](https://nestjs.com/)  
- [TypeScript](https://www.typescriptlang.org/)  
- [Prisma ORM](https://www.prisma.io/)  
- [Zod](https://zod.dev/) for schema validation  
- [Jest](https://jestjs.io/) for testing  
- [Swagger](https://swagger.io/) for API documentation  

---

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)  
- PostgreSQL (or your preferred database compatible with Prisma)  

### Installation

```bash
git clone https://github.com/rafaelkremser/vehicles-service.git
cd vehicles-service
npm install
```

## Environment Setup

Create a `.env` file based on `.env.example` and update with your database connection string:

```env
DATABASE_URL=postgresql://docker:docker@localhost:5432/vehicles-service
PORT=3333
```

### Database Setup

Run containers:

```bash
docker compose up -d
```

Generate and apply migrations (if you have schema changes):

```bash
npx prisma migrate dev
```
Generate the migrations:

```bash
npx prisma generate
```

You can see the tables with Prisma Studio:

```bash
npx prisma studio
```

### Running the Application

Start the development server:

```bash
npm run dev
```

The server will be available at `http://localhost:3333`.

### Running Tests

Run unit tests:

```bash
npm run test
```
Run e2e tests:

```bash
npm run test:e2e
```

## API Documentation

The API is documented using Swagger. Access the documentation at:

```
http://localhost:3333/api
```

You will find all endpoints, request/response schemas, and example requests there.

## Example API Usage

### Register Vehicle

```http
POST /vehicles
Content-Type: application/json

{
  "licensePlate": "ABC1234",
  "chassisNumber": "1HGCM82633A123456",
  "renavam": "12345678901",
  "model": "Civic",
  "brand": "Honda",
  "year": 2020
}
```

### Fetch Recent Vehicles

```http
GET /vehicles?page=1
```

### Get Vehicle by License Plate

```http
GET /vehicles/ABC1234
```

### Edit Vehicle

```http
PUT /vehicles/{id}
Content-Type: application/json

{
  "licensePlate": "XYZ0000",
  "chassisNumber": "1HGCM826000000000",
  "renavam": "12345600000",
  "model": "Corolla",
  "brand": "Toyota",
  "year": 2022
}
```

### Delete Vehicle

```http
DELETE /vehicles/{id}
```

## Contributing

Contributions are welcome! Feel free to open issues or pull requests.

## License

This project is licensed under the MIT License.
