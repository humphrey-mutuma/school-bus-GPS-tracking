# School Bus GPS Tracking App

## Overview
This is a GPS tracking application designed for school buses. The system enables parents to register, log in, and track their child's real-time location on a map. It also includes an admin role to manage schools, students, and drivers. The backend is built with **NestJS** and **Prisma**, while the mobile client is developed using **React Native with Expo**.

## Features
- **User Authentication**: Parents and admins can register and log in.
- **Real-time GPS Tracking**: See the bus location on a live map.
- **Admin Dashboard**:
  - Manage schools, students, and drivers.
  - Assign drivers to vehicles and routes.
- **Driver Management**:
  - Track driver details (name, car number plate, assigned route).
  - Each driver is assigned to only one car, which follows a single route.
- **No Historical Data**: The app only tracks real-time locations without storing past records.

## Tech Stack
### Backend
- **NestJS** (TypeScript-based Node.js framework)
- **Prisma** (ORM for PostgreSQL)
- **PostgreSQL** (Database)
- **WebSockets** (for real-time tracking)
- **Redis** (for caching live location updates)

### Frontend (Mobile App)
- **React Native with Expo**
- **Zustand** (for state management)
- **React Navigation**
- **Map SDK** (Google Maps or Mapbox)
- **Socket.IO** (for real-time updates)

## Installation
### Prerequisites
- Node.js (v18+)
- PostgreSQL
- Expo CLI
- Redis (optional for caching)

### Backend Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo-url
   cd gps-tracking-app
   ```
2. Install dependencies:
   ```sh
   cd server
   npm install
   ```
3. Set up environment variables in `.env`:
   ```env
   DATABASE_URL=postgresql://user:password@localhost:5432/gps_tracking
   JWT_SECRET=your-secret-key
   REDIS_URL=redis://localhost:6379
   ```
4. Run database migrations:
   ```sh
   npx prisma migrate dev
   ```
5. Start the backend server:
   ```sh
   npm run start:dev
   ```

### Mobile Client Setup
1. Navigate to the mobile directory:
   ```sh
   cd client
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the Expo development server:
   ```sh
   expo start
   ```
4. Scan the QR code with your Expo Go app or use an emulator.

## API Endpoints
 

## Screenshots
Here are some screenshots of the application:

![Screenshot 1](assets/1.png)
![Screenshot 2](assets/2.jpeg)
![Screenshot 3](assets/3.jpeg)
![Screenshot 4](assets/4.jpeg)

## Contributing
Contributions are welcome! Feel free to submit a PR or open an issue.

## License
MIT License
