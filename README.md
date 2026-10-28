# Cabway Videoke Delivery

Cabway Videoke Delivery is an admin application for managing videoke delivery orders, inventory, customers, payments, and sales reporting.

The project contains:

- An Expo/React Native admin client in [`admin/`](./admin)
- An Express API in [`backend/`](./backend)
- A MySQL schema in [`videoke_delivery.sql`](./videoke_delivery.sql)

## Features

- Admin account registration and JWT-based login
- Dashboard metrics for pending orders, today's orders, revenue, and unpaid balances
- Inventory management:
  - Search products
  - Add products
  - Update products
  - Delete products
- Order management:
  - Create, search, filter, update, and delete orders
  - Manage customer details and order items
  - Track delivery schedules and order status
  - Track unpaid, partially paid, and paid orders
- Sales reports:
  - Period performance
  - Top-selling products
  - Most frequent customers
- Android, iOS, and web targets through Expo
- WebSocket service support in the client for future real-time updates

## Technology stack

### Client

- React Native 0.86
- Expo SDK 57
- Expo Router
- NativeWind and Tailwind CSS
- Axios
- AsyncStorage for the access token

### Backend

- Node.js 20 or later
- Express 5
- MySQL with `mysql2`
- JWT authentication
- `bcrypt` password hashing
- CORS
- WebSocket support through `ws`

## Requirements

- Node.js 20 or later
- npm
- MySQL 8 or a compatible MySQL server
- For native mobile development:
  - Android Studio and an Android emulator, or
  - Xcode and an iOS simulator on macOS
- Alternatively, use Expo Go or the Expo web target for development

## Project setup

Clone the repository and install dependencies for both applications:

```bash
git clone https://github.com/JamesJunto/Videoke_Delivery_app.git
cd Videoke_Delivery_app

cd backend
npm install

cd ../admin
npm install
```

### 1. Configure MySQL

Create a database and apply the schema:

```sql
CREATE DATABASE videoke_db;
USE videoke_db;
```

Then run [`videoke_delivery.sql`](./videoke_delivery.sql) using your preferred MySQL client.

> The final `ALTER TABLE` statements in the schema qualify the `orders` table with `videoke_db`. If you use a different database name, update those statements before running the file.

### 2. Configure the backend

Create `backend/.env` with values for your local database and JWT secret:

```env
PORT=3000

MYSQLHOST=127.0.0.1
MYSQLUSER=your_mysql_user
MYSQLPASSWORD=your_mysql_password
MYSQLDATABASE=videoke_db
MYSQLPORT=3306

ACCESS_TOKEN_KEY=replace_with_a_long_random_secret
```

Do not commit `.env` files or real credentials.

Start the API:

```bash
cd backend
npm start
```

For development with Node's file watcher:

```bash
npm run dev
```

The API listens on `http://localhost:3000` by default.

### 3. Configure the client API URL

The client API base URL is defined in [`admin/services/api.js`](./admin/services/api.js). It currently points to the deployed Railway API.

For local development, change the base URL to the address reachable from the device or emulator:

```js
const API_BASE_URL = "http://192.168.1.100:3000/api";
```

Use the host machine's LAN IP when testing on a physical device. Android emulators commonly reach a host service through `10.0.2.2`:

```js
const API_BASE_URL = "http://10.0.2.2:3000/api";
```

The backend listens on `0.0.0.0`, which allows connections from an emulator or device when the network and firewall permit them.

### 4. Start the Expo app

```bash
cd admin
npm start
```

Choose a target from the Expo CLI, or use one of the project scripts:

```bash
npm run android
npm run ios
npm run web
```

The app opens with the login screen. Register an admin account first, then sign in to access the dashboard.

## API

All routes are prefixed with `/api`.

| Area | Method | Route | Auth |
| --- | --- | --- | --- |
| Authentication | `POST` | `/auth/register` | Public |
| Authentication | `POST` | `/auth/login` | Public, rate limited |
| Inventory | `GET` | `/inventory` | JWT |
| Inventory | `POST` | `/inventory` | JWT |
| Inventory | `PUT` | `/inventory/:product_id` | JWT |
| Inventory | `DELETE` | `/inventory/:product_id` | JWT |
| Orders | `GET` | `/orders` | JWT |
| Orders | `POST` | `/orders` | JWT |
| Orders | `PUT` | `/orders/:order_id` | JWT |
| Orders | `DELETE` | `/orders/:order_id` | JWT |

Authenticated requests must include the access token in the HTTP `Authorization` header as a Bearer token and should send JSON with `Content-Type: application/json`.

The client stores the token in AsyncStorage and adds it to API requests automatically.

## Database model

The schema defines these main tables:

- `admin_acc` — administrator credentials
- `customer` — customer contact and address details
- `product` — inventory items, prices, and stock
- `orders` — order totals, delivery information, status, and payment status
- `order_items` — products and quantities belonging to each order

Order payment statuses are `Unpaid`, `50% paid`, and `Paid`.

## Useful commands

### Client

```bash
cd admin
npm run lint
npm start
```

### Backend

```bash
cd backend
npm start
npm run dev
```

## Repository structure

```text
.
├── admin/
│   ├── app/screens/       # Expo Router screens
│   ├── components/        # Shared UI and feature components
│   ├── hooks/             # Authentication, inventory, and order hooks
│   ├── services/          # API and domain service functions
│   └── utils/             # Dashboard and reporting calculations
├── backend/
│   ├── middleware/        # Authentication and rate limiting
│   ├── routes/            # Express route definitions
│   ├── services/          # Database operations
│   ├── app.js             # API entry point
│   └── db.js              # MySQL connection pool
└── videoke_delivery.sql   # Database schema
```

## Security notes

- Store database credentials and JWT secrets in environment variables.
- Use a different strong `ACCESS_TOKEN_KEY` for each environment.
- Keep the client and backend on HTTPS outside local development.
- Do not expose MySQL directly to the public internet.
- The client currently contains a deployed API URL in source code; use environment-specific configuration before producing a production build.

## License

The admin app includes a license file at [`admin/app/LICENSE`](./admin/app/LICENSE). See that file for the applicable terms.
