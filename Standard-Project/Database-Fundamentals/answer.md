## 1. Why is db.json not suitable as a database for real projects?
Ans: Using a file like db.json as a database may work for learning or very small demos, but it is not suitable for real-world applications due to several limitations.

- Limitations of File-Based Storage

**a. Performance**
    - Entire files must be read into memory and rewritten for every change.
    - As data grows, read/write operations become slow.
    - No indexing, query optimization, or caching mechanisms exist.

**b. Scalability**
    - File-based storage cannot efficiently handle large datasets.
    - It does not support horizontal scaling (multiple servers accessing data).
    - Concurrent access leads to conflicts and data corruption risks.

**c. Reliability**
    - No built-in backup, recovery, or crash handling mechanisms.
    - A server crash during a write operation can corrupt the file.
    - No transaction support (atomicity, rollback, consistency).

Because of these limitations, db.json is only suitable for prototypes, testing, or learning purposes—not production systems.

## 2. Ideal characteristics of a database system (beyond storage)
Ans: A modern database system provides much more than just data storage. Key characteristics include:

**a. Performance**
    - Uses indexing, query planners, and caching to retrieve data efficiently.
    - Optimized for fast read and write operations even with large datasets.

**b. Concurrency**
    - Supports multiple users accessing and modifying data simultaneously.
    - Uses locking or MVCC (Multi-Version Concurrency Control) to prevent conflicts.

**c. Reliability**
    - Ensures data is not lost during crashes or power failures.
    - Supports backups, replication, and recovery mechanisms.

**d. Data Integrity**
    - Enforces rules using constraints (primary keys, foreign keys, unique keys).
    - Prevents invalid or inconsistent data from being stored.

**e. Scalability**
    - Can handle increasing data volume and user load.
    - Supports vertical scaling (better hardware) and horizontal scaling (distributed systems).

**f. Fault Tolerance**
    - Continues to function even if part of the system fails.
    - Achieved through replication, clustering, and automatic failover.

## 3. Types of databases and their use cases
Ans: Databases are broadly classified into two main categories:

1. **Relational Databases (SQL) :**
    Data is stored in structured tables with rows and columns.It Uses SQL (Structured Query Language). Enforces strict schemas and relationships.

Examples: MySQL, PostgreSQL, Oracle, Microsoft SQL Server

Use Cases: 
    - Banking and financial systems
    - E-commerce platforms (orders, payments, inventory)
    - Enterprise applications
    - Systems requiring strong consistency and complex queries

2. **Non-Relational Databases (NoSQL):**
    Schema-less or flexible schema design. Designed for large-scale, distributed systems. Optimized for performance and scalability.

Types: 
    - Document-based (MongoDB)
    - Key-value (Redis)
    - Column-based (Cassandra)
    - Graph-based (Neo4j)

Use Cases: 
    - Social media platforms
    - Real-time analytics
    - IoT applications
    - Content management systems
