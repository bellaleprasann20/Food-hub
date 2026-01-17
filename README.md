# Food Hub

A food delivery application that allows users to browse restaurants, order food online, and track deliveries in real-time.

## Features

- Browse restaurants and menus
- Search and filter options (cuisine, price, rating)
- Add items to cart
- User authentication and profiles
- Order placement and tracking
- Real-time order status updates
- Payment gateway integration
- Review and rating system
- Order history
- Restaurant admin panel
- Responsive design

## Technologies Used

### Frontend
- React.js
- Redux / Context API
- Tailwind CSS / Material-UI
- React Router
- Axios

### Backend
- Node.js
- Express.js
- MongoDB / MySQL
- Socket.io (real-time updates)
- JWT Authentication
- Stripe / PayPal API

## Installation

### Prerequisites
- Node.js (v14+)
- MongoDB or MySQL
- Stripe/PayPal account

### Backend Setup

1. Clone the repository:
```bash
git clone https://github.com/bellaleprasann20/food-hub.git
cd food-hub/backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_key
```

4. Start server:
```bash
npm start
```

### Frontend Setup

1. Navigate to frontend:
```bash
cd ../frontend
npm install
```

2. Create `.env`:
```
REACT_APP_API_URL=http://localhost:5000
REACT_APP_STRIPE_PUBLIC_KEY=your_stripe_public_key
```

3. Start application:
```bash
npm start
```

## Usage

### For Customers
1. Sign up or login
2. Browse restaurants
3. Add items to cart
4. Proceed to checkout
5. Make payment
6. Track order in real-time

### For Restaurant Owners
1. Register your restaurant
2. Add menu items
3. Manage orders
4. Update order status

## Project Structure

```
food-hub/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/
│   │   └── App.js
│   └── public/
└── README.md
```

## API Endpoints

### Users
- `POST /api/users/register`
- `POST /api/users/login`
- `GET /api/users/profile`

### Restaurants
- `GET /api/restaurants`
- `GET /api/restaurants/:id`
- `POST /api/restaurants` (Admin)

### Orders
- `POST /api/orders`
- `GET /api/orders/:userId`
- `PUT /api/orders/:id/status`

### Payment
- `POST /api/payment/create-intent`

## Future Enhancements

- Delivery tracking with maps
- Live chat support
- Coupon and discount system
- Loyalty rewards program
- Multi-language support

## Contributing

Contributions are welcome! Please open an issue first to discuss proposed changes.

## License

MIT License

---

**Commit Message:** `docs: add README for Food Hub delivery application`