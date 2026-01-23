### 1. Definition of a Database Relationship
Ans: A database relationship defines how two or more tables in a relational database are logically connected to each other through common fields, usually primary keys and foreign keys. Relationships help ensure data integrity, reduce data redundancy, and enable efficient querying of related data across tables.
    In relational database systems (such as MySQL, PostgreSQL, and Oracle), relationships are fundamental to database normalization and schema design.
- Primary Key (PK): A unique identifier for a record in its own table (e.g., UserID).
- Foreign Key (FK): A column in one table that points to the Primary Key of another table, creating the link between them.

### 2. Types of Relationships
There are three primary types of relationships in a relational database: One-to-One, One-to-Many, and Many-to-Many.
**A. One-to-One (1:1)**
In a 1:1 relationship, a record in Table A can be associated with only one record in Table B, and vice versa. This is often used to split a table for security or performance reasons.

E-commerce Example: User and User Profile
    Each User has exactly one Extended Profile (containing sensitive data like SSN or birthdate). Each Extended Profile belongs to only one User.

**B. One-to-Many (1:N)**
This is the most common relationship type. A record in Table A can be associated with one or more records in Table B, but a record in Table B is associated with only one record in Table A.

E-commerce Example: Customers and Orders
    A single Customer can place many different Orders over time. However, each specific Order belongs to only one Customer.

**C. Many-to-Many (M:N)**
In an M:N relationship, multiple records in Table A can be associated with multiple records in Table B. To implement this in a database, we use a Junction Table (also called a Join Table) to break the many-to-many link into two one-to-many links.

E-commerce Example: Products and Orders
    One Order can contain many different Products. One Product can appear in many different Orders placed by various customers.
The Solution: An Order_Items table acts as the bridge, storing the OrderID and the ProductID for every item sold.