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

---

## 🚀 Next Steps
- **Implement API Gateway** for centralized request handling
- **Define database schema** for each microservice (ensuring proper data ownership)
- **Set up event-driven architecture** using Kafka/RabbitMQ for asynchronous operations
- **Implement security best practices** (JWT authentication, rate limiting, logging)
... (17 lines left)
Collapse
message.txt
7 KB
Hands-on Exercise: Designing a Microservice System
Overview
In this hands-on exercise, you'll work in small groups to design a microservice architecture for an e-commerce application. The goal is to apply the principles of microservices design that we've discussed in the lecture.
﻿
Time Allocation: 50 minutes
Group formation: 5 minutes
Design work: 30 minutes
Preparation for presentations: 5 minutes
Group presentations: 10 minutes (2-3 minutes per group)
Exercise Details
Scenario: E-Shop Application
You are tasked with redesigning a monolithic e-commerce application into a microservices architecture. The current monolith includes:
﻿
User registration and authentication
Product catalog with search functionality
Shopping cart management
Order processing
Payment handling
Inventory management
Shipping/delivery tracking
Customer reviews and ratings
Email notifications
Task 1: Service Identification (15 minutes)
Break down the monolith into logical microservices
For each service, define:
Its primary responsibility/business capability
The data it needs to own
Key operations it should perform
Task 2: Service Interactions (15 minutes)
Identify how services will communicate with each other
Determine which communication patterns to use:
Synchronous (REST, gRPC)
Asynchronous (message queue, event bus)
Map the critical paths for key user journeys (e.g., placing an order)
Identify potential bottlenecks or failure points
Task 3: Architecture Diagram (10 minutes)
Create a simple diagram showing:
﻿
All microservices in your design
Communication paths between services
Databases or data stores
External integrations (payment gateways, shipping providers, etc.)
You can use any diagramming method:
﻿
Draw on paper/whiteboard
Use a digital tool (draw.io, Lucidchart, etc.)
Create a text-based representation
Deliverables
Each group should prepare:
﻿
A list of identified microservices with brief descriptions
An architecture diagram showing service relationships
A brief explanation of key design decisions (2-3 minutes presentation)
Evaluation Criteria
Appropriate service boundaries based on business capabilities
Clear ownership of data by each service
Sensible communication patterns
Consideration of failure scenarios
Overall feasibility of the design
Example Services to Consider
User Service
Product Catalog Service
Inventory Service
Order Service
Payment Service
Shipping Service
Notification Service
Review/Rating Service
Search Service
Analytics Service
Tips for Success
Focus on business capabilities when defining services
Keep services focused and cohesive (single responsibility)
Think about data ownership - which service should be the source of truth?
Consider how to handle transactions that span multiple services
Remember that microservices add distributed systems complexity
After the Exercise
We'll have a brief presentation from each group, followed by questions and discussions about the different approaches taken. We'll analyze the trade-offs in various designs and identify common patterns that emerged.
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
