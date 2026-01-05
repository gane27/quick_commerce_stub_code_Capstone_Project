**Smart Quick Commerce App with GenAI – React.js**

This project is a Quick Commerce web application that simulates a responsive and intelligent order fulfilment system.
It models real-world interactions between users, virtual warehouses, and delivery hotspots, focusing on efficient order processing, delivery routing, and a personalized user experience.
The system dynamically selects the nearest warehouse and delivery hotspot using proximity-based calculations and enhances product discovery through AI-powered recommendations.
**Note:** This project is a simulation built for learning and demonstration purposes. It does not process real payments or real-world deliveries.

**Key Features**
1. User Account Management
2. Secure user registration and login
3. JWT-based authentication
4. Persistent user sessions across the shopping flow
5. Protected routes for authenticated access

**Product Browsing & Cart**

1. Product listings fetched dynamically from the database
2. Add, remove, and update cart items
3. Quantity management and cart review before checkout

**Order Placement & Tracking**
1.	Structured checkout flow
2.	Orders stored with user and cart details
3.	UI to track order status and order lifecycle

**Smart Fulfilment Simulation**

1.	Virtual warehouses and delivery hotspots represented using x–y coordinates
2.	Intelligent selection of:
3.	Nearest warehouse to the user
4.	Nearest delivery hotspot to the selected warehouse
5.	Optimized delivery route using distance calculations (Euclidean distance)

**Order Processing Logic:**

**Simulated real-world delays for:**

•	Item picking
•	Delivery
•	Uses set Timeout to mimic asynchronous fulfilment
•	Total delivery time calculated using:
•	Warehouse → Hotspot distance
•	Hotspot → User distance
•	AI-Powered Product Recommendations
•	Personalized product suggestions on the homepage
•	Recommendations generated using external LLM APIs

**AI logic considers:**
•	Available inventory
•	User order history
•	Recommendations displayed using a product carousel

**Technology Stack:**

•	Frontend
•	React.js
•	JavaScript
•	HTML5, CSS3
•	Backend
•	Node.js
•	Express.js
•	Database
•	MongoDB
•	Authentication
•	JSON Web Tokens (JWT)


**AI & Developer Tools:**
•	Prompt Engineering with LLMs
•	GitHub Copilot

**Highlights:**

•	Modular and scalable architecture
•	Distance-based fulfilment logic using Euclidean calculations
•	Asynchronous order processing simulation
•	AI-driven personalization for improved user engagement
•	Clean separation of frontend, backend, and business logic


--------------------------

Author:
Ganesan Ramachandran
