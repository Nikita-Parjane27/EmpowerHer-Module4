# Schema Design Fundamentals – Theory

## 1. What is Schema Design and What Does a Database Schema Represent?
Ans: Schema design is the process of planning and defining the structure of a relational database before actual data storage and application development. It focuses on how data is organized into tables, how those tables are related to each other, and what rules or constraints govern the data.

A **database schema** is the blueprint of the database. It represents:
* Tables and their names
* Columns and their data types
* Relationships between tables (foreign keys)
* Constraints such as primary keys, unique rules, and null restrictions

In 
## 2. Why Schema Design Is Required Before Writing Backend Code
Ans: Schema design is required before backend development because the backend application directly depends on the database structure. APIs, queries, and business logic all assume that tables and relationships already exist in a stable and predictable form.

If backend code is written without a proper schema:
* Developers may frequently change database structures
* Queries may break when columns or tables are modified
* Data handling logic becomes inconsistent

Designing the schema first ensures:
* Clear understanding of entities and relationships
* Efficient query design
* Reduced rework during development


## 3. Impact of Poor Schema Design
Ans: Poor schema design can negatively affect a database in several ways as follows :

### a. Data Consistency
* Duplicate data may exist in multiple tables
* Updates in one place may not reflect in others
* Inconsistent values can appear for the same entity

### b. Maintenance Issues
* Schema becomes difficult to understand and modify
* Small changes may require updates across many tables
* Debugging data-related issues becomes complex

### c. Scalability Problems
* Queries become slower as data grows
* Indexing becomes inefficient
* Schema may not support future requirements easily


## 4. Validations in Schema Design and Why Databases Enforce Them
Ans: Validations in schema design are rules applied at the database level to ensure data correctness and integrity. Databases enforce these rules so that invalid or inconsistent data cannot be stored.

Common validations include:
* **NOT NULL**: Ensures a column always has a value (e.g., user email)
* **UNIQUE**: Prevents duplicate values (e.g., username or email)
* **PRIMARY KEY**: Uniquely identifies each row in a table
* **DEFAULT**: Assigns a default value if none is provided

These validations:
* Protect data integrity
* Reduce dependency on application-level checks
* Ensure reliable and predictable data storage


## 5. Difference Between a Database Schema and a Database Table
Ans: 
* A **database schema** is the overall structure or logical design of the database. It includes multiple tables, relationships, constraints, and rules.
* A **database table** is a single structure within the schema that stores data related to one specific entity.

Example:
* Schema: `ecommerce`
* Tables inside schema: `users`, `orders`, `products`


## 6. Why a Table Should Represent Only One Entity
Ans: A table should represent only one entity to follow the principle of normalization. An entity is a real-world object or concept, such as a user, order, or product.

If a table stores multiple entities:
* Data becomes repetitive
* Updates become error-prone
* Relationships are harder to manage

Example:
* A `users` table should store only user-related data
* Order details should be stored in a separate `orders` table


## 7. Why Redundant or Derived Data Should Be Avoided
Ans: Redundant data is repeated data stored in multiple places, while derived data is data that can be calculated from existing values.

Problems caused by redundancy:
* Increased storage usage
* Risk of inconsistent updates
* Data anomalies

Example:
* Storing `total_price` when it can be derived from `quantity × unit_price`

Avoiding redundancy ensures:
* Single source of truth
* Easier updates
* Better data integrity


## 8. Importance of Choosing Correct Data Types
Ans: 
Choosing correct data types is crucial for:

* Data accuracy
* Storage efficiency
* Query performance

Examples:
* Use `INTEGER` for numeric counts instead of `TEXT`
* Use `DATE` or `TIMESTAMP` for time-related data
* Use appropriate string lengths for text fields

Incorrect data types can:
* Waste storage
* Cause incorrect comparisons
* Slow down queries
    Proper data types help databases enforce rules and optimize performance automatically.

