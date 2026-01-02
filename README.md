# quick_commerce_stub_code_Capstone_Project

This project is a Quick Commerce web application that simulates a responsive and intelligent order fulfilment system.
It models real-world interactions between users, virtual warehouses, and delivery hotspots, focusing on efficient order processing, delivery routing, and personalised user experience.

The system dynamically selects the nearest warehouse and delivery hotspot using proximity-based calculations and enhances product discovery through AI-powered recommendations.

Key Features
User Account Management

Secure user registration and login

JWT-based authentication

Persistent user sessions across the shopping flow

Protected routes for authenticated access

Product Browsing & Cart

Product listing fetched dynamically from the database

Add, remove, and update cart items

Quantity management and cart review before checkout

Order Placement & Tracking

Structured checkout flow

Orders stored with user and cart details

UI to track order status and lifecycle

Smart Fulfilment Simulation

Virtual warehouses and delivery hotspots represented using x–y coordinates

Intelligent selection of:

Nearest warehouse to the user

Nearest delivery hotspot to the selected warehouse

Optimised delivery route simulation using distance calculations

Order Processing Logic

Simulated real-world delays for:

Item picking

Delivery

Uses setTimeout to mimic asynchronous fulfilment

Total delivery time calculated using:

Warehouse → Hotspot distance

Hotspot → User distance

AI-Powered Product Recommendations

Personalised product suggestions on the homepage

Recommendations generated using external LLM APIs

AI logic considers:

Available inventory

User order history

Recommendations displayed using a product carousel

Technology Stack
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

AI-driven personalisation for improved user engagement

Clean separation of frontend, backend, and business logic

Author

Ganesan Ramachandran
mail:gane27@gmail.com
