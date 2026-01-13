***Q.1 Node.js Architecture***
Ans : Node.js is not programming language; it is a runtime environment built on Chrome’s V8 JavaScript engine that allows us to run JavaScript on the server side.Its architecture is designed to handle a large number of concurrent operations efficiently using non-blocking I/O and an event-driven model.
1. **JavaScript Engine (V8)** : It is Google's open source javascript engine written in C++ for chrome. This engine converts Javascript code into machine code that the computer can understand. It uses JIT compilation to optimize code during runtime. It provides memory heap and call stack.
2. **Node.js Core APIs** : These are built-in Javascript modules (like http, path, fs) that provides high-level functions for developers.Examples include:
- File System (fs): Read, write, delete files
- HTTP/HTTPS: Create web servers and make network requests
- Path: Handle file paths across different operating systems
- Crypto: Encryption, hashing, and security operations
- Stream: Handle data in chunks for memory efficiency
- Events: Event-driven programming patterns
3. **Native bindings** : Native binding connect Javascript code with C/C++ implementations. They allow JavaScript code to call C++ functions. JavaScript calls a binding function, which translates the request into C++ code, executes it, and returns results back to JavaScript
4. **Event Loop** : The "heart" of Node.js. It constantly checks if the call stack is empty and manages the execution of callbacks from various queues. Instead of creating a new thread for each request, Node.js uses a single main thread with the event loop. It makes Node.js highly scalable and memory-efficient.

***Q.2 libuv***
Ans : libuv is C library that provides Node.js with the ability to perform non-blocking I/O operations, Event loop implementation, Child process handling, Networking capabilities.
## Why Node.js needs libuv
    JavaScript is inherently single-threaded. Without libuv, if we tried to read a massive file, the entire application would freeze until the file was finished reading. Libuv allows Node.js to offload these tasks so the main thread can keep running.
## Responsibilities of libuv
    - Event Loop: Managing the timing and execution of callbacks.
    - Thread Pool: Handling heavy tasks that the OS cannot handle asynchronously.
    - Child Processes: Managing external system processes.- File/Network I/O: Interacting with the file system and network sockets.

***Q. 3 Thread Pool***
Ans: Node.js itself is single-threaded, libuv maintains a collection of additional threads (usually 4 by default) known as the Thread Pool to handle file system operations, Crypto (hashing, encryption), Compression, DNS lookup. These threads run in the background.
## Why Node.js uses a thread pool
    Some tasks are too "expensive" or "blocking" to run on the main event loop. The thread pool allows Node.js to delegate these tasks to background threads, preventing the main thread from lagging.
## Operations handled by the thread pool
    1. File I/O: Reading or writing files (fs module).
    2. Cryptography: Functions like crypto.pbkdf2() or crypto.randomBytes().
    3. Compression: Tasks using the zlib module.
    4. DNS Lookups: Specifically dns.lookup().

***Q. 4 Worker Threads***
Ans: Worker Threads (via the worker_threads module) allow developers to create entirely new threads to run JavaScript code in parallel. Unlike the Thread Pool (which is managed by libuv), Worker Threads are managed by the developer.
## Why are worker threads needed?
    They are used for CPU-intensive tasks (like image processing, complex mathematical calculations, or video encoding). Since the main thread handles the Event Loop, a heavy calculation would block the loop; Worker Threads solve this by moving the calculation to a separate thread.
## Difference between thread pool and worker threads
    Thread Pool                   Worker Threads          
1.  Managed by libuv              Managed by Node.js       
2.  Used for internal system      Used for custom 
    tasks                          JavaScript logic 
3. Not directly accessible        Directly programmable   
4. Shared pool of threads         Separate isolated threads

***Q. 5 Event Loop Queues***
Ans: 
## Macro Task Queue : 
    It also known as Task Queue or Callback queue. This queue handles tasks that are scheduled to run after a certain interval or after an I/O operation completes.
Examples: setTimeout(), setInterval(), setImmediate(), and I/O callbacks. 

 ## Micro Task Queue
    It also known as Job Queue. This queue has the highest priority. The Event Loop checks this queue immediately after every operation and before moving to the next phase of the loop.
Examples: process.nextTick(), Resolved Promises (.then, .catch, await).

## Execution priority between them: 
    1. Execute current synchronous code completely
    2. Process ALL microtasks in the microtask queue (including new ones added during processing)
    3. Execute ONE macrotask from the macrotask queue
    4. Process ALL microtasks again (if any were added)
In this Micro Tasks always have high priority. The Event Loop won't move to the next macrotask until all microtasks are complete.

## Examples of tasks in each queue
   1.  Macro Tasks
        - setTimeout(() => {})
        - setImmediate(() => {})
        I/O callbacks
    2. Micro Tasks
        - Promise.resolve().then(() => {})
        - process.nextTick(() => {})

