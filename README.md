# Shipments API (Assessment)

Express + MongoDB REST API for managing shipments.

## Features
- CRUD endpoints for shipments:
  - `GET /api/shipments` - list all shipments
  - `GET /api/shipments/:id` - get single shipment
  - `POST /api/shipments` - create shipment
  - `PUT /api/shipments/:id` - update shipment
  - `DELETE /api/shipments/:id` - delete shipment
- Validation using Joi
- Clean error responses
- Project organized for maintainability
- Postman collection included
- Optional tests using Jest + Supertest (using in-memory MongoDB)

## Quick start (local)

1. Install
```bash
git clone <repo>
cd shipments-api
npm install
cp .env.example .env
# set MONGO_URI in .env
```

2. Run
```bash
npm run dev
```

API will run on `http://localhost:3000` by default.

## Deployment
You can deploy this app to any Node-friendly host (Render, Railway, Heroku, Fly.io). Ensure `MONGO_URI` is set in the environment variables.

Example: Deploy to Render
- Create a new Web Service, connect your repo, set the build command `npm install` and start command `npm start`. Add `MONGO_URI` to the environment.

## API documentation
See `postman/Shipments API.postman_collection.json` for detailed request examples and sample payloads.

### Shipment model (minimum fields)
- `trackingNumber` (string, unique)
- `senderName` (string)
- `receiverName` (string)
- `origin` (string)
- `destination` (string)
- `status` (pending | in_transit | delivered | cancelled)
- `createdAt`, `updatedAt` (timestamps)

## Error responses
- 400: Invalid ID
- 404: Shipment not found
- 409: Duplicate trackingNumber
- 422: Validation failed
- 500: Internal Server Error

## Postman
Exported collection included at `postman/Shipments API.postman_collection.json`.

## Tests
We included a basic test:
```bash
npm run test
```

## Notes for assessment submission
- Live base URL: 
- Postman collection: included in repository
- Contact: Oladimeji Ibitoye

