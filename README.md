# quick_commerce_stub_code_Capstone_Project

This project is a Quick Commerce web application that simulates a responsive and intelligent order fulfilment system.
It models real-world interactions between users, virtual warehouses, and delivery hotspots, focusing on efficient order processing, delivery routing, and personalized user experience.

The system dynamically selects the nearest warehouse and delivery hotspot using proximity-based calculations and enhances product discovery through AI-powered recommendations.

**Key Features**
1. User Account Management
2. Secure user registration and login
3. JWT-based authentication
4. Persistent user sessions across the shopping flow
5. Protected routes for authenticated access

6. Product Browsing & Cart
7. Product listing fetched dynamically from the database
8. Add, remove, and update cart items
9. Quantity management and cart review before checkout
10. Order Placement & Tracking

11. Structured checkout flow
12. Orders stored with the user and cart details
13. UI to track order status and lifecycle
14. Smart Fulfilment Simulation
15. Virtual warehouses and delivery hotspots are represented using x–y coordinates

**Intelligent selection of:**
Nearest warehouse to the user
Nearest delivery hotspot to the selected warehouse
Optimized delivery route simulation using distance calculations
Order Processing Logic

**Simulated real-world delays for:**
Item picking
Delivery
Uses setTimeout to mimic asynchronous fulfillment
Total delivery time calculated using:
Warehouse → Hotspot distance
Hotspot → User distance
AI-Powered Product Recommendations
Personalized product suggestions on the homepage
Recommendations generated using external LLM APIs

**AI logic considers:**
Available inventory
User order history
Recommendations displayed using a product carousel

**Technology Stack**
Frontend
React.js
JavaScript
HTML5, CSS3
Backend
Node.js
Express.js
Database
MongoDB
Authentication

JSON Web Tokens (JWT)
AI & Developer Tools
Prompt Engineering with LLMs
GitHub Copilot
Sourcery
Highlights
Modular and scalable architecture
Distance-based fulfilment logic using Euclidean calculations
Asynchronous order processing simulation
AI-driven personalization for improved user engagement
Clean separation of frontend, backend, and business logic

Author:
Ganesan Ramachandran
mail: gane27@gmail.com
