#  High-Scale Energy Ingestion Engine

A NestJS + PostgreSQL backend service that ingests telemetry from smart meters and EV vehicles, correlates energy streams, and provides fast performance analytics.

This project simulates a real-world fleet platform handling high-frequency IoT telemetry at scale.

---

##  Overview

Each device sends telemetry every minute:

- Smart Meter → AC energy consumed from grid
- Vehicle → DC energy delivered to battery + battery stats

Since AC energy is always higher than DC (conversion loss), the system calculates charging efficiency:

Efficiency = DC Delivered / AC Consumed


This helps detect energy loss or hardware issues.

The goal of this system is to:

- ingest high-volume telemetry  
- store historical data efficiently  
- maintain real-time device state  
- provide fast analytics  

---

##  Architecture Design

The system uses a **Hot + Cold storage architecture**.

###  Cold Storage (History Tables)

Stores all telemetry permanently (append-only).

Tables:

live_vehicle
live_meter


Every heartbeat → UPSERT

Used for dashboards and current status queries.

This avoids scanning millions of history rows just to get the latest data.

---

###  Data Correlation

Vehicle and meter streams are independent.

They are linked using:

fleet_mapping
(vehicleId → meterId)


This allows analytics to match:

vehicle DC energy ↔ meter AC energy
Without this mapping, efficiency cannot be calculated.

---

##  Analytics Endpoint
GET /v1/analytics/performance/:vehicleId


Returns a 24-hour summary:

- total AC energy
- total DC energy
- efficiency ratio
- average battery temperature

The query scans only the last 24 hours using indexed timestamps.

This guarantees fast performance even with large datasets.

---

## Scaling to 14.4 Million Records per Day

Assumptions:

10,000 vehicles
10,000 meters
1 heartbeat per minute

Daily writes:

20,000 per minute
= 1.2M per hour
= 14.4M per day


Why the system scales:

- append-only inserts are fast
- indexed time-window queries
- live tables avoid expensive scans
- analytics reads only 24-hour slice
- no full table scans

This keeps ingestion and analytics efficient.

---

##  Tech Stack

- NestJS (TypeScript backend)
- PostgreSQL
- TypeORM
- Swagger API docs
- Docker

---

##  Project Structure

src/
├── telemetry/ # ingestion endpoints
├── analytics/ # performance analytics
├── entities/ # database entities
├── database/ # database config
└── shared/ # shared utilities


---

##  Running Locally

### 1. Install dependencies

npm install


### 2. Create environment file

cp .env.example .env


Update DB credentials inside `.env`.

---

### 3. Start development server

npm run dev


API runs at:

http://localhost:3000

Swagger docs:

http://localhost:3000/api


---

##  Running with Docker

docker-compose up --build

This starts:

- NestJS API
- PostgreSQL database

Swagger:

http://localhost:3000/api


---

##  Testing the Flow

### Step 1 — Create mapping

```sql
INSERT INTO fleet_mapping("vehicleId","meterId")
VALUES ('V1','M1');

```
### Step 2 — Send vehicle telemetry
```
POST /v1/telemetry/vehicle

Example body:
{
  "vehicleId": "V1",
  "soc": 80,
  "kwhDeliveredDc": 5,
  "batteryTemp": 36,
  "timestamp": "2026-02-04T10:00:00Z"
}

```

### Step 3 — Send meter telemetry
```
POST /v1/telemetry/meter

Example body:
{
  "meterId": "M1",
  "kwhConsumedAc": 6,
  "voltage": 220,
  "timestamp": "2026-02-04T10:00:00Z"
}
```
### Step 4 — Run analytics
```
GET /v1/analytics/performance/V1

Example response:
{
  "totalAc": 6,
  "totalDc": 5,
  "efficiency": 0.83,
  "avgTemp": 36
}
```

### Summary

This project demonstrates a scalable telemetry ingestion backend capable of handling millions of daily records while keeping analytics fast and reliable.

The architecture reflects real-world IoT fleet platform design used in energy and EV systems.