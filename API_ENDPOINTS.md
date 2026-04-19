# Laundry Order Management System - API Endpoints

## Base URL
```
http://localhost:8080/api
```

---

## 1. Authentication Endpoints

### 1.1 User Signup
**POST** `/auth/signup`

Create a new user account.

#### Request Body:
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "secure_password_123"
}
```

#### cURL Command:
```bash
curl -X POST http://localhost:8080/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "email": "john@example.com",
    "password": "secure_password_123"
  }'
```

#### Response (201 Created):
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "username": "john_doe",
  "email": "john@example.com"
}
```

---

### 1.2 User Login
**POST** `/auth/login`

Authenticate and get JWT token.

#### Request Body:
```json
{
  "username": "john_doe",
  "password": "secure_password_123"
}
```

#### cURL Command:
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "password": "secure_password_123"
  }'
```

#### Response (200 OK):
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "username": "john_doe",
  "email": "john@example.com"
}
```

---

## 2. Order Endpoints

### 2.1 Create New Order
**POST** `/orders`

Create a new laundry order with items.

#### Request Body:
```json
{
  "customerName": "Rajesh Kumar",
  "phoneNumber": "9876543210",
  "items": [
    {
      "garmentType": "Shirt",
      "quantity": 3,
      "pricePerItem": 50.00
    },
    {
      "garmentType": "Jeans",
      "quantity": 2,
      "pricePerItem": 75.00
    },
    {
      "garmentType": "Bedsheet",
      "quantity": 1,
      "pricePerItem": 100.00
    }
  ]
}
```

#### cURL Command:
```bash
curl -X POST http://localhost:8080/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "customerName": "Rajesh Kumar",
    "phoneNumber": "9876543210",
    "items": [
      {
        "garmentType": "Shirt",
        "quantity": 3,
        "pricePerItem": 50.00
      },
      {
        "garmentType": "Jeans",
        "quantity": 2,
        "pricePerItem": 75.00
      },
      {
        "garmentType": "Bedsheet",
        "quantity": 1,
        "pricePerItem": 100.00
      }
    ]
  }'
```

#### Response (201 Created):
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "customerName": "Rajesh Kumar",
  "phoneNumber": "9876543210",
  "status": "RECEIVED",
  "totalAmount": 500.00,
  "items": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440001",
      "garmentType": "Shirt",
      "quantity": 3,
      "pricePerItem": 50.00,
      "totalPrice": 150.00
    },
    {
      "id": "550e8400-e29b-41d4-a716-446655440002",
      "garmentType": "Jeans",
      "quantity": 2,
      "pricePerItem": 75.00,
      "totalPrice": 150.00
    },
    {
      "id": "550e8400-e29b-41d4-a716-446655440003",
      "garmentType": "Bedsheet",
      "quantity": 1,
      "pricePerItem": 100.00,
      "totalPrice": 100.00
    }
  ],
  "createdAt": "2024-04-19T10:30:00",
  "updatedAt": "2024-04-19T10:30:00"
}
```

---

### 2.2 Get Order by ID
**GET** `/orders/{orderId}`

Retrieve a specific order by its ID.

#### cURL Command:
```bash
curl -X GET http://localhost:8080/api/orders/550e8400-e29b-41d4-a716-446655440000 \
  -H "Content-Type: application/json"
```

#### Response (200 OK):
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "customerName": "Rajesh Kumar",
  "phoneNumber": "9876543210",
  "status": "RECEIVED",
  "totalAmount": 500.00,
  "items": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440001",
      "garmentType": "Shirt",
      "quantity": 3,
      "pricePerItem": 50.00,
      "totalPrice": 150.00
    }
  ],
  "createdAt": "2024-04-19T10:30:00",
  "updatedAt": "2024-04-19T10:30:00"
}
```

---

### 2.3 Get All Orders
**GET** `/orders`

Retrieve all orders (no filters).

#### cURL Command:
```bash
curl -X GET http://localhost:8080/api/orders \
  -H "Content-Type: application/json"
```

#### Response (200 OK):
```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "customerName": "Rajesh Kumar",
    "phoneNumber": "9876543210",
    "status": "RECEIVED",
    "totalAmount": 500.00,
    "items": [...],
    "createdAt": "2024-04-19T10:30:00",
    "updatedAt": "2024-04-19T10:30:00"
  },
  {
    "id": "550e8400-e29b-41d4-a716-446655440010",
    "customerName": "Priya Singh",
    "phoneNumber": "9876543211",
    "status": "PROCESSING",
    "totalAmount": 300.00,
    "items": [...],
    "createdAt": "2024-04-19T11:00:00",
    "updatedAt": "2024-04-19T11:00:00"
  }
]
```

---

### 2.4 Get Orders by Status
**GET** `/orders?status={status}`

Filter orders by status. Valid statuses: `RECEIVED`, `PROCESSING`, `READY`, `DELIVERED`

#### cURL Command (Get all PROCESSING orders):
```bash
curl -X GET "http://localhost:8080/api/orders?status=PROCESSING" \
  -H "Content-Type: application/json"
```

#### cURL Command (Get all READY orders):
```bash
curl -X GET "http://localhost:8080/api/orders?status=READY" \
  -H "Content-Type: application/json"
```

#### cURL Command (Get all DELIVERED orders):
```bash
curl -X GET "http://localhost:8080/api/orders?status=DELIVERED" \
  -H "Content-Type: application/json"
```

#### Response (200 OK):
```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440010",
    "customerName": "Priya Singh",
    "phoneNumber": "9876543211",
    "status": "PROCESSING",
    "totalAmount": 300.00,
    "items": [...],
    "createdAt": "2024-04-19T11:00:00",
    "updatedAt": "2024-04-19T11:00:00"
  }
]
```

---

### 2.5 Search Orders by Customer Name
**GET** `/orders?customerName={name}`

Search orders by customer name (case-insensitive, partial match supported).

#### cURL Command:
```bash
curl -X GET "http://localhost:8080/api/orders?customerName=Rajesh" \
  -H "Content-Type: application/json"
```

#### Response (200 OK):
```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "customerName": "Rajesh Kumar",
    "phoneNumber": "9876543210",
    "status": "RECEIVED",
    "totalAmount": 500.00,
    "items": [...],
    "createdAt": "2024-04-19T10:30:00",
    "updatedAt": "2024-04-19T10:30:00"
  }
]
```

---

### 2.6 Get Orders by Phone Number
**GET** `/orders?phoneNumber={phoneNumber}`

Retrieve orders by customer phone number.

#### cURL Command:
```bash
curl -X GET "http://localhost:8080/api/orders?phoneNumber=9876543210" \
  -H "Content-Type: application/json"
```

#### Response (200 OK):
```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "customerName": "Rajesh Kumar",
    "phoneNumber": "9876543210",
    "status": "RECEIVED",
    "totalAmount": 500.00,
    "items": [...],
    "createdAt": "2024-04-19T10:30:00",
    "updatedAt": "2024-04-19T10:30:00"
  }
]
```

---

### 2.7 Search Orders by Garment Type
**GET** `/orders?garmentType={type}`

Search orders by garment type (case-insensitive, partial match supported).

#### cURL Command:
```bash
curl -X GET "http://localhost:8080/api/orders?garmentType=Shirt" \
  -H "Content-Type: application/json"
```

#### Response (200 OK):
```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "customerName": "Rajesh Kumar",
    "phoneNumber": "9876543210",
    "status": "RECEIVED",
    "totalAmount": 500.00,
    "items": [
      {
        "id": "550e8400-e29b-41d4-a716-446655440001",
        "garmentType": "Shirt",
        "quantity": 3,
        "pricePerItem": 50.00,
        "totalPrice": 150.00
      }
    ],
    "createdAt": "2024-04-19T10:30:00",
    "updatedAt": "2024-04-19T10:30:00"
  }
]
```

---

### 2.8 Update Order Status
**PATCH** `/orders/{orderId}/status`

Update the status of an existing order.

#### Request Body:
```json
{
  "status": "PROCESSING"
}
```

#### Valid Status Values:
- `RECEIVED`
- `PROCESSING`
- `READY`
- `DELIVERED`

#### cURL Command (Update to PROCESSING):
```bash
curl -X PATCH http://localhost:8080/api/orders/550e8400-e29b-41d4-a716-446655440000/status \
  -H "Content-Type: application/json" \
  -d '{
    "status": "PROCESSING"
  }'
```

#### cURL Command (Update to READY):
```bash
curl -X PATCH http://localhost:8080/api/orders/550e8400-e29b-41d4-a716-446655440000/status \
  -H "Content-Type: application/json" \
  -d '{
    "status": "READY"
  }'
```

#### cURL Command (Update to DELIVERED):
```bash
curl -X PATCH http://localhost:8080/api/orders/550e8400-e29b-41d4-a716-446655440000/status \
  -H "Content-Type: application/json" \
  -d '{
    "status": "DELIVERED"
  }'
```

#### Response (200 OK):
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "customerName": "Rajesh Kumar",
  "phoneNumber": "9876543210",
  "status": "PROCESSING",
  "totalAmount": 500.00,
  "items": [...],
  "createdAt": "2024-04-19T10:30:00",
  "updatedAt": "2024-04-19T10:35:00"
}
```

---

### 2.9 Get Dashboard Statistics
**GET** `/orders/dashboard/stats`

Retrieve dashboard statistics including order counts by status and revenue metrics.

#### cURL Command:
```bash
curl -X GET http://localhost:8080/api/orders/dashboard/stats \
  -H "Content-Type: application/json"
```

#### Response (200 OK):
```json
{
  "totalOrders": 25,
  "receivedCount": 5,
  "processingCount": 8,
  "readyCount": 7,
  "deliveredCount": 5,
  "totalRevenue": 12500.00,
  "averageOrderValue": 500.00,
  "pendingOrders": 13
}
```

---

## Testing with Different Scenarios

### Scenario 1: Create Multiple Orders
```bash
# Order 1
curl -X POST http://localhost:8080/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "customerName": "Amit Patel",
    "phoneNumber": "9988776655",
    "items": [
      {"garmentType": "Suit", "quantity": 1, "pricePerItem": 250.00},
      {"garmentType": "Tie", "quantity": 2, "pricePerItem": 30.00}
    ]
  }'

# Order 2
curl -X POST http://localhost:8080/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "customerName": "Neha Sharma",
    "phoneNumber": "8899776655",
    "items": [
      {"garmentType": "Saree", "quantity": 1, "pricePerItem": 150.00},
      {"garmentType": "Blouse", "quantity": 2, "pricePerItem": 75.00}
    ]
  }'
```

### Scenario 2: Track Order Progress
```bash
# 1. Create order
ORDER_ID=$(curl -s -X POST http://localhost:8080/api/orders \
  -H "Content-Type: application/json" \
  -d '{"customerName":"Test","phoneNumber":"9876543210","items":[{"garmentType":"Shirt","quantity":1,"pricePerItem":50}]}' \
  | grep -o '"id":"[^"]*' | cut -d'"' -f4)

# 2. Update to PROCESSING
curl -X PATCH http://localhost:8080/api/orders/$ORDER_ID/status \
  -H "Content-Type: application/json" \
  -d '{"status":"PROCESSING"}'

# 3. Update to READY
curl -X PATCH http://localhost:8080/api/orders/$ORDER_ID/status \
  -H "Content-Type: application/json" \
  -d '{"status":"READY"}'

# 4. Update to DELIVERED
curl -X PATCH http://localhost:8080/api/orders/$ORDER_ID/status \
  -H "Content-Type: application/json" \
  -d '{"status":"DELIVERED"}'

# 5. Get final order details
curl -X GET http://localhost:8080/api/orders/$ORDER_ID \
  -H "Content-Type: application/json"
```

### Scenario 3: Search and Filter Orders
```bash
# Get all RECEIVED orders
curl -X GET "http://localhost:8080/api/orders?status=RECEIVED"

# Search by customer name
curl -X GET "http://localhost:8080/api/orders?customerName=Amit"

# Search by phone number
curl -X GET "http://localhost:8080/api/orders?phoneNumber=9988776655"

# Search by garment type
curl -X GET "http://localhost:8080/api/orders?garmentType=Shirt"

# Get dashboard stats
curl -X GET http://localhost:8080/api/orders/dashboard/stats
```

---

## Error Responses

### 400 Bad Request
```json
{
  "timestamp": "2024-04-19T10:30:00",
  "status": 400,
  "error": "Bad Request",
  "message": "Validation failed",
  "details": "Phone number must be 10 digits"
}
```

### 404 Not Found
```json
{
  "timestamp": "2024-04-19T10:30:00",
  "status": 404,
  "error": "Not Found",
  "message": "Order not found",
  "details": "Order with ID 550e8400-e29b-41d4-a716-446655440000 not found"
}
```

### 409 Conflict
```json
{
  "timestamp": "2024-04-19T10:30:00",
  "status": 409,
  "error": "Conflict",
  "message": "Invalid order status transition",
  "details": "Cannot update order status to PROCESSING when current status is DELIVERED"
}
```

### 500 Internal Server Error
```json
{
  "timestamp": "2024-04-19T10:30:00",
  "status": 500,
  "error": "Internal Server Error",
  "message": "An unexpected error occurred"
}
```

---

## Notes

- All endpoints are CORS enabled for any origin
- Phone number must be exactly 10 digits
- Customer name must be between 2-100 characters
- Valid order statuses: RECEIVED, PROCESSING, READY, DELIVERED
- Order status transitions follow a specific workflow:
  - RECEIVED → PROCESSING → READY → DELIVERED
- Timestamps are in ISO 8601 format
- Prices are in decimal format with up to 2 decimal places
