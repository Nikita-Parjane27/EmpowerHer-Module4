***Q1. Role of Frontend (FE)***
Ans: The Frontend (FE) is the part of a web application that users directly see and interact with. It runs in the user’s web browser and focuses on delivering a smooth, accessible, and responsive user experience.
1. **User Interface (UI)**
- The frontend is responsible for designing and rendering visual elements such as buttons, forms, menus, images, and layouts.
- It ensures consistency in colors, fonts, spacing, and responsiveness across different devices
- For UI commonly used technologies include HTML, CSS, and JavaScript, along with frameworks like React, Angular, and Vue.js.

2. **User Interaction**
- The frontend captures user actions like clicks, scrolls, form inputs, and hover effects. 
- It ensures the application feels responsive—for example, showing a loading spinner when a button is clicked or a dropdown menu when a mouse hovers over a link.

3. **Communication with Backend**
- The frontend communicates with the backend using HTTP/HTTPS requests (GET, POST, PUT, DELETE).
- APIs (REST) are used to send user data and receive responses.
- Data received from the backend (JSON format) is displayed meaningfully to the user.


***Q2. Role of Backend (BE)***
Ans: The Backend (BE) is the server-side part of a web application that manages data, logic, and security. It operates behind the scenes and is not directly visible to users.
1. **Server-Side Processing**
- The backend processes requests sent by the frontend and applies application rules.
- It performs calculations, validations, and handling workflows.
- Backend include languages like Java, Python, JavaScript (Node.js), PHP, and C#.

2. **Database Handling**
- The backend is responsible for "CRUD" operations: Creating, Reading, Updating, and Deleting data. - It communicates with databases (like PostgreSQL or MongoDB) to store user profiles, posts, or transaction history.

3. **Security and Authentication**
The backend verifies user identities (login), manages encrypted passwords, and ensures that a user only has access to the data they are authorized to see.


***Q3. Business Logic***
Ans: Business Logic refers to the specific rules, conditions, and decision-making processes that define how a web application operates according to business requirements. It acts as a bridge between the user interface and the data layer.
**Real-world Examples:**
1. E-commerce: A rule that states, "If a customer spends over $50, apply a 10% discount and provide free shipping."
2. Banking: A logic check that ensures, "An ATM withdrawal cannot proceed if the requested amount is greater than the account balance."
3. Social Media: A rule determining visibility: "Only 'Friends' of a user can view their private photo albums."

***Q4. Client–Server Model***
Ans: The Client–Server Model is a distributed computing model where tasks are divided between service providers (servers) and service requesters (clients).
1. **Client**
- The client is the user-facing component,a web browser or mobile app.
- It sends requests and displays responses.
- Examples: Chrome browser, mobile apps.

2. **Server**
- The server is a powerful system that processes client requests.
- It hosts applications, databases, and APIs.
- Examples: Web servers like Apache, or cloud servers.

3. **Communication Process**
- The client sends a request over the internet using HTTP/HTTPS.
- The server processes the request and returns a response.
- Data is exchanged in formats such as HTML, JSON, or XML.


***Q5. Three-Tier Architecture***
Ans: This architecture organizes an application into three logical and physical layers to make it easier to manage and scale.
1. **Presentation Layer (Tier 1):** The top level; It is User Interface layer. It displays data and collects user inputs. It is implemented using tools like HTML, CSS, Jvascript and frontend frameworks.

2. **Application / Business Layer (Tier 2):** This layer contains business logic and application rules. It processes requests from presentation layers. It is implemented by using backend frameworks and services.

3. **Data Layer (Tier 3):** This layer is responsible for data storage and retrieval. It 9includes databses and data access logic.

## Why use this? 
It provides scalability (we can upgrade one layer without touching others), maintainability (cleaner code organization), and security (the user never has direct access to the database).


***Q6. JavaScript as a Backend Language***
Ans: JavaScript is widely used as a backend language, mainly due to the creation of Node.js.
1. **Performance**
- Node.js uses an "Asynchronous, Non-blocking I/O" model. 
- This means it can handle thousands of concurrent connections simultaneously without getting stuck on a single task, making it incredibly fast for data-heavy applications.

2. **Ecosystem**
- JavaScript has a massive ecosystem with npm, the world’s largest package manager.
- Developers can easily find pre-written code for almost any feature (e.g., payment processing, image resizing).

3. **Popular Backend Frameworks**
- Express.js: The standard, minimalist framework for building web servers.
- NestJS: A more structured, enterprise-grade framework for large-scale apps.
- Fastify: Focused on providing the lowest overhead and highest speed possible.