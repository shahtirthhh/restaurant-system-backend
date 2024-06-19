
### Backend API README.md

# 🔗 Restaurant System - Backend API


# System Overview

Each module is interconnected, providing a seamless experience for customers, managers, and chefs:

1. **Customer Module**: Customers can browse the menu and place orders. They receive real-time updates on their order status.
2. **Manager Module**: Managers can view all orders, manage the menu, and update order statuses, notifying both customers and chefs.
3. **Chef Module**: Chefs can view and update the status of orders, notifying both managers and customers.
4. **Backend API**: Manages the database operations and real-time communication across all modules.

Together, these modules create an efficient and interactive restaurant management system.


## Overview

Welcome to the **Restaurant System Backend API**! This RESTful API supports the customer, manager, and chef modules, providing endpoints for order and menu management. Built using **Node.js**, **Express**, **MongoDB**, and **Socket.io** for real-time updates.

**GitHub Repository:** [Backend API](https://github.com/shahtirthhh/restaurant-system-backend)

## Features

- **Order Management**: Handle CRUD operations for orders.
- **Menu Management**: Manage menu items.
- **Real-time Communication**: Utilize **Socket.io** for real-time order updates.
- **Secure Endpoints**: Secure and scalable endpoints for production use.

## Endpoints

### Orders

- **GET /orders**: Retrieve all orders.
- **POST /orders**: Create a new order.
- **PATCH /orders/**: Update an existing order.
- **DELETE /orders/**: Delete an order.

### Menu

- **GET /foods**: Retrieve all menu items.
- **POST /foods**: Add a new menu item.
- **PATCH /foods**: Update an existing menu item.
- **DELETE /foods**: Delete a menu item.

### Category

- **GET /categories**: Retrieve all categories.
- **POST /categories**: Add a new category.
- **DELETE /categories**: Delete a category.


## Technologies Used
**React**

**TailwindCSS**

**Socket.io**

**Node.js**

**Mongodb**

## Links to Other Modules
**Manager Module**: [GitHub](https://github.com/shahtirthhh/restaurant-system-manager), [Live Demo](https://retaurant-system-manager-module.netlify.app/)

**Chef Module**: [GitHub](https://github.com/shahtirthhh/restaurant-system-chef), [Live Demo](https://restaurant-system-chef-module.netlify.app/)

**Customer Module**: [GitHub](https://github.com/shahtirthhh/restaurant-system-customer), [Live Demo](https://restaurant-system-customer-module.netlify.app/)

## Contributors
**Tirth Shah**
      
[**Devanshee Ramanuj**](https://github.com/ramanujdevanshee22)

## Installation

To run this backend locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/shahtirthhh/restaurant-system-backend.git
