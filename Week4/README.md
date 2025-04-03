# E-Shop Microservices Architecture

## 📌 Project Overview
The **E-Shop Application** is a scalable, maintainable, and resilient microservices-based e-commerce platform. This project transforms a traditional monolithic architecture into a **microservices architecture**, ensuring modularity, fault tolerance, and flexibility.

## 🎯 Objective
- Break down a monolithic e-commerce system into microservices.
- Define clear service boundaries and responsibilities.
- Establish robust communication patterns between services.
- Handle failure scenarios gracefully to improve reliability.

---

## 🏗️ 1. Service Identification
### **Identified Microservices & Responsibilities**

| **Service**             | **Primary Responsibility**                  | **Key Data**                                | **Operations**                      |
|-------------------------|---------------------------------|----------------------------------|----------------------------------|
| **User Service**        | Handles authentication and user profiles | User credentials, profiles, order history | Register, Login, Update Profile |
| **Product Catalog**     | Manages product listings and search | Product details, categories, descriptions | Add/Update/Delete Product, Search |
| **Inventory Service**   | Tracks product stock levels | Stock availability per product | Reserve Stock, Adjust Stock, Check Stock |
| **Shopping Cart**       | Manages user shopping carts | Cart items per user, quantity | Add to Cart, Remove from Cart, Get Cart |
| **Order Service**       | Handles order placement and status updates | Order details, status, customer info | Place Order, Cancel Order, Retrieve Order |
| **Payment Service**     | Processes transactions and payment verification | Payment logs, transaction history | Initiate Payment, Verify Payment, Refund |
| **Shipping Service**    | Manages shipping logistics and tracking | Delivery addresses, tracking numbers | Generate Label, Track Order |
| **Notification Service** | Sends emails, SMS, and push notifications | Notification logs, message history | Send Order Confirmation, Shipping Update |
| **Review Service**      | Manages product reviews and ratings | User reviews, ratings, timestamps | Submit Review, Fetch Reviews |
| **Search Service**      | Provides advanced search and filtering | Indexed product data | Index Products, Search Products |

---

## 🔄 2. Service Interactions & Communication
### **Communication Patterns**

| **Interaction**                           | **Pattern**     | **Protocol** | **Reasoning**                                      |
|---------------------------------|--------------|------------|--------------------------------------------------|
| **User Service ↔ API Gateway**         | Synchronous   | REST       | Authentication & authorization                  |
| **Shopping Cart ↔ Product Catalog**    | Synchronous   | REST       | Fetch product details                          |
| **Order Service ↔ Inventory Service**  | Asynchronous  | Event Bus  | Stock reservation & rollback handling         |
| **Order Service ↔ Payment Service**    | Synchronous   | REST       | Immediate payment processing                   |
| **Payment Service → Notification Service** | Asynchronous  | Message Queue | Payment confirmation notifications            |
| **Order Service → Shipping Service**   | Asynchronous  | Event Bus  | Order fulfillment & tracking updates          |
| **Review Service → Product Catalog**   | Asynchronous  | Event Bus  | Update average product ratings                |

### **Critical User Flow: Placing an Order**
1. User adds items to cart → **Shopping Cart Service**
2. User proceeds to checkout → **Order Service**
3. **Order Service** requests stock reservation → **Inventory Service**
4. **Inventory Service** updates stock & confirms availability
5. **Order Service** requests payment → **Payment Service**
6. **Payment Service** processes transaction
   - **Success**: Payment confirmed → Order marked as completed → **Shipping Service** notified
   - **Failure**: Order canceled → Stock released → **User notified**
7. **Shipping Service** assigns tracking number
8. **Notification Service** sends order confirmation & updates

### **Failure Scenarios & Solutions**

| **Potential Failure**        | **Mitigation Strategy**                                        |
|-------------------------|--------------------------------------------------|
| Inventory Service down  | Circuit breaker, cache stock estimates          |
| Payment failure        | Saga pattern for rollback transactions           |
| Slow service response  | Asynchronous processing, event-driven design    |
| Overloaded Notification Service | Distributed queues, retry mechanisms |

---

## 🖥️ 3. Architecture Diagram
### **Components**
- **API Gateway** (Handles authentication & request routing)
- **Microservices:**
  - **User, Product, Inventory, Cart, Order, Payment, Shipping, Notification, Review, Search Services**
- **External APIs** (Payment Gateway, Shipping Provider)

### **Data Flow**
- **REST (Synchronous):** User authentication, cart operations, product retrieval
- **Event-Driven (Asynchronous):** Order processing, inventory updates, notifications

### **Tools for Diagramming**
You can visualize the architecture using:
- **[Draw.io](https://www.diagrams.net/)**
- **[Figma](https://www.figma.com/)**
- **[Lucidchart](https://www.lucidchart.com/)**
- **Whiteboard/Paper** (for quick drafts before finalizing)

---

## ✅ Final Deliverables
✔ **List of Identified Microservices with responsibilities**  
✔ **Service Interaction Plan with communication patterns**  
✔ **Architecture Diagram showcasing service relationships**  
✔ **Documentation of Key Design Decisions & Failure Handling**  