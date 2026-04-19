#  Laundry Order Management System

A full-stack web application for managing laundry orders with real-time status tracking, billing, and analytics. Built with Spring Boot, React, and PostgreSQL.

**Live Demo**: [Frontend](http://localhost:5173) | [Backend API](http://localhost:8080/api) | [API Documentation](./API_ENDPOINTS.md)

---

## 📋 Features

### 🧷 Order Management
- **Create Orders**: Add customer orders with multiple garments and flexible pricing
- **Order Tracking**: Real-time status updates (RECEIVED → PROCESSING → READY → DELIVERED)
- **View Orders**: Browse all orders with pagination and filtering
- **Search & Filter**: Find orders by status, customer name, phone number, or garment type
- **Order Details**: View complete order information including all items and pricing

### 📊 Dashboard Analytics
- **Real-time Statistics**: Monitor order counts and metrics
- **Status Breakdown**: Visual distribution of orders by status
- **Revenue Analytics**: Track total revenue and average order value
- **Pending Orders**: Quick overview of orders awaiting delivery

### 💳 Pricing System
- **Flexible Pricing**: Per-item pricing based on garment type
- **Automatic Calculations**: Total bill automatically calculated
- **Multiple Garments**: Support for various garment types (Shirts, Jeans, Sarees, Suits, etc.)
- **Cost Analysis**: Detailed breakdown of costs per item

### 🔐 Authentication & Security
- **User Registration**: Create new user accounts
- **JWT Authentication**: Secure token-based authentication
- **Password Security**: Secure password storage with validation
- **CORS Enabled**: Cross-origin requests supported

## 🛠️ Tech Stack

### Backend
- **Java 17** with Spring Boot 3.2.x
- **Spring Data JPA** for Object-Relational Mapping
- **Spring Security** with JWT for authentication
- **PostgreSQL 15** for relational data
- **Maven 3.9** for dependency management
- **Jakarta Validation** for input validation
- **Lombok** for reducing boilerplate code

### Frontend
- **React 18** for component-based UI
- **Vite 5** for fast development server and optimized builds
- **Axios** for HTTP client requests
- **CSS3** with custom styling
- **ES6+ JavaScript** for modern syntax

### DevOps & Infrastructure
- **Docker** for containerization
- **Docker Compose** for multi-container orchestration
- **Alpine Linux** for minimal image sizes
- **Multi-stage builds** for optimized Docker images
- **PostgreSQL in Docker** for database isolation

## 📦 Project Structure

```
LaundryOrderManagementSystem/
├── backend/                              # Spring Boot Backend
│   ├── src/main/java/com/laundry/
│   │   ├── controller/                   # REST API Controllers
│   │   │   ├── AuthController.java       # Authentication endpoints
│   │   │   └── OrderController.java      # Order management endpoints
│   │   ├── service/                      # Business Logic Layer
│   │   │   ├── AuthService.java
│   │   │   ├── OrderService.java
│   │   │   └── OrderServiceImpl.java
│   │   ├── entity/                       # JPA Entities
│   │   │   ├── Order.java
│   │   │   ├── OrderItem.java
│   │   │   ├── User.java
│   │   │   └── OrderStatus.java
│   │   ├── dto/                          # Data Transfer Objects
│   │   │   ├── AuthRequest.java
│   │   │   ├── AuthResponse.java
│   │   │   ├── CreateOrderRequest.java
│   │   │   ├── CreateOrderItemRequest.java
│   │   │   ├── OrderResponse.java
│   │   │   ├── UpdateOrderStatusRequest.java
│   │   │   ├── DashboardResponse.java
│   │   │   └── OrderItemResponse.java
│   │   ├── repository/                   # Data Access Layer
│   │   │   ├── OrderRepository.java
│   │   │   ├── OrderItemRepository.java
│   │   │   └── UserRepository.java
│   │   ├── exception/                    # Exception Handling
│   │   │   ├── GlobalExceptionHandler.java
│   │   │   ├── InvalidOrderException.java
│   │   │   ├── ResourceNotFoundException.java
│   │   │   └── ErrorResponse.java
│   │   ├── config/                       # Configuration Classes
│   │   │   ├── SecurityConfig.java       # Spring Security config
│   │   │   ├── JwtTokenProvider.java     # JWT token generation/validation
│   │   │   ├── JwtAuthenticationFilter.java # JWT filter
│   │   │   ├── CorsConfig.java           # CORS configuration
│   │   │   └── LaundryOrderManagementApplication.java # Main app
│   │   └── entity/
│   ├── src/main/resources/
│   │   └── application.yml               # Application configuration
│   ├── pom.xml                           # Maven dependencies
│   ├── Dockerfile                        # Docker container config
│   └── .gitignore
│
├── frontend/                             # React Frontend
│   ├── src/
│   │   ├── components/                   # React Components
│   │   │   ├── AuthPage.jsx              # Login/Signup page
│   │   │   ├── Dashboard.jsx             # Main dashboard
│   │   │   ├── CreateOrderForm.jsx       # Order creation form
│   │   │   ├── OrdersList.jsx            # Orders list view
│   │   │   └── ...
│   │   ├── services/
│   │   │   └── api.js                    # API service layer
│   │   ├── styles/                       # Component stylesheets
│   │   │   ├── AuthPage.css
│   │   │   ├── Dashboard.css
│   │   │   ├── CreateOrderForm.css
│   │   │   └── OrdersList.css
│   │   ├── App.jsx                       # Main App component
│   │   ├── App.css                       # Global styles
│   │   ├── index.css                     # Root styles
│   │   └── main.jsx                      # Entry point
│   ├── index.html
│   ├── vite.config.js                    # Vite configuration
│   ├── package.json                      # Dependencies & scripts
│   ├── Dockerfile                        # Docker container config
│   └── .gitignore
│
├── docker-compose.yml                    # Multi-container orchestration
├── API_ENDPOINTS.md                      # Detailed API documentation
├── README.md                             # This file
└── .gitignore
```

### Key Files Explanation

| File | Purpose |
|------|---------|
| `application.yml` | Database, JWT, and Spring configuration |
| `SecurityConfig.java` | Spring Security and JWT authentication setup |
| `JwtTokenProvider.java` | JWT token generation and validation logic |
| `OrderServiceImpl.java` | Core business logic for order operations |
| `OrderRepository.java` | Database queries for orders |
| `api.js` | Centralized API calls for frontend |
| `docker-compose.yml` | PostgreSQL, Backend, and Frontend services |

## 🚀 Getting Started

### Prerequisites
- **Docker & Docker Compose** (recommended)
- **OR** Java 17+, Node.js 18+, and PostgreSQL 15
- Git for cloning the repository

### Quick Start with Docker Compose (⭐ Recommended)

This is the simplest way to get everything running.

#### 1. Clone the Repository
```bash
git clone <repository-url>
cd LaundryOrderManagementSystem
```

#### 2. Build and Start All Services
```bash
docker-compose up --build
```

This command will:
- Build Docker images for backend and frontend
- Start PostgreSQL database container
- Start Spring Boot backend service
- Start React frontend service
- Set up networking between all services

#### 3. Wait for Services to Start
Look for messages like:
```
✔ Container laundry_postgres Healthy
✔ Container laundry_backend Started
✔ Container laundry_frontend Started
```

#### 4. Access the Application
- **Frontend**: [http://localhost:5173](http://localhost:5173)
- **Backend API**: [http://localhost:8080/api](http://localhost:8080/api)
- **Database**: `postgres://localhost:5432/laundry_db`

#### 5. Create Test User & Login
Sign up with credentials:
```
Username: testuser
Email: test@example.com
Password: test123
```

#### 6. Stop Services
```bash
docker-compose down
```

To remove data as well:
```bash
docker-compose down -v
```

---

### Local Development Setup

#### Backend Setup (Spring Boot)

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Configure PostgreSQL**
   
   Ensure PostgreSQL is running locally:
   ```bash
   # macOS (if using Homebrew)
   brew services start postgresql
   
   # Linux
   sudo systemctl start postgresql
   ```

3. **Create Database**
   ```sql
   CREATE DATABASE laundry_db;
   CREATE USER laundry_user WITH PASSWORD 'laundry_password';
   GRANT ALL PRIVILEGES ON DATABASE laundry_db TO laundry_user;
   ```

4. **Update Configuration** (`src/main/resources/application.yml`)
   ```yaml
   spring:
     datasource:
       url: jdbc:postgresql://localhost:5432/laundry_db
       username: laundry_user
       password: laundry_password
     jpa:
       hibernate:
         ddl-auto: update
       properties:
         hibernate:
           dialect: org.hibernate.dialect.PostgreSQLDialect
     jwt:
       secret: your-secret-key-here
       expiration: 86400000  # 24 hours
   ```

5. **Build and Run**
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```

   Backend starts on: [http://localhost:8080](http://localhost:8080)

#### Frontend Setup (React + Vite)

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Create Environment File** (`.env`)
   ```
   VITE_API_BASE_URL=http://localhost:8080/api
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

   Frontend starts on: [http://localhost:5173](http://localhost:5173)

---

## 📡 API Documentation

All API endpoints with detailed curl commands are documented in **[API_ENDPOINTS.md](./API_ENDPOINTS.md)**.

### Quick API Overview

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/auth/signup` | POST | Create new user account |
| `/api/auth/login` | POST | Authenticate user and get JWT token |
| `/api/orders` | POST | Create new order |
| `/api/orders` | GET | Retrieve all orders |
| `/api/orders/{orderId}` | GET | Get specific order |
| `/api/orders?status={status}` | GET | Filter orders by status |
| `/api/orders?customerName={name}` | GET | Search orders by customer |
| `/api/orders?phoneNumber={phone}` | GET | Search orders by phone |
| `/api/orders?garmentType={type}` | GET | Search orders by garment type |
| `/api/orders/{orderId}/status` | PATCH | Update order status |
| `/api/orders/dashboard/stats` | GET | Get dashboard statistics |

### Example API Calls

**Create an Order:**
```bash
curl -X POST http://localhost:8080/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "customerName": "John Doe",
    "phoneNumber": "9876543210",
    "items": [
      {"garmentType": "Shirt", "quantity": 2, "pricePerItem": 50.00},
      {"garmentType": "Jeans", "quantity": 1, "pricePerItem": 75.00}
    ]
  }'
```

**Get Dashboard Stats:**
```bash
curl -X GET http://localhost:8080/api/orders/dashboard/stats
```

For more API examples, see **[API_ENDPOINTS.md](./API_ENDPOINTS.md)**

{
  "status": "PROCESSING"
}
```

### Dashboard Statistics
```http
GET /api/orders/dashboard/stats
```

## 🗄️ Database Schema

### orders table
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| customer_name | VARCHAR(100) | Customer name |
| phone_number | VARCHAR(10) | 10-digit phone number |
| status | VARCHAR(20) | Order status (ENUM) |
| total_amount | DECIMAL(10,2) | Total order amount |
| created_at | TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | Last update timestamp |

### order_items table
| Column | Type | Description |
|--------|------|-------------|
| id | BIGINT | Primary key |
| order_id | UUID | Foreign key to orders |
| garment_type | VARCHAR(50) | Type of garment |
| quantity | INTEGER | Quantity |
| price_per_item | DECIMAL(10,2) | Price per item |

## ✅ Validation Rules

- **Customer Name**: Required, 2-100 characters
- **Phone Number**: Required, exactly 10 digits
- **Order Items**: At least one item required
- **Garment Type**: Required, non-empty
- **Quantity**: Required, must be > 0
- **Price per Item**: Required, must be > 0
- **Status**: Must be one of: RECEIVED, PROCESSING, READY, DELIVERED

## 🎨 UI Features

### Create Order Page
- Multi-item order creation
- Real-time total calculation
- Add/remove items dynamically
- Form validation with error messages

### Orders List Page
- Paginated order display
- Filter by status, customer name, or phone
- Status update dropdown for each order
- Quick view of order details and items

### Dashboard Page
- Total orders counter
- Total revenue display
- Status breakdown with visual cards
- Auto-refresh statistics


## 📝 Example Usage

### Creating an Order
1. Navigate to "Create Order" page
2. Enter customer name (e.g., "Rajesh Kumar")
3. Enter 10-digit phone number (e.g., "9876543210")
4. Add items:
   - Garment: "Shirt", Quantity: 2, Price: ₹100
   - Garment: "Pants", Quantity: 1, Price: ₹150
   - Garment: "Saree", Quantity: 1, Price: ₹300
5. Click "Create Order"
6. Order ID and total amount (₹650) will be displayed

### Viewing and Filtering
1. Go to "Orders" page
2. Filter by status: Select "PROCESSING"
3. Or search by customer name: "Rajesh"
4. Update order status from dropdown

### Dashboard
1. Click "Dashboard" to see:
   - Total orders created
   - Total revenue earned
   - Count of orders in each status

## 🔒 Security Considerations

- CORS configured for cross-origin requests
- Input validation on both frontend and backend
- SQL injection prevention through JPA
- No sensitive data exposed in APIs

## 📊 Performance Features

- Indexed database queries
- Lazy loading for entity relationships
- Multi-stage Docker builds for smaller images
- Efficient React component re-renders

## 🚧 Future Enhancements

- Payment integration
- Email notifications
- Advanced reporting and analytics
- Mobile app support
- Real-time WebSocket updates
- Barcode/QR code scanning
- Customer portal

