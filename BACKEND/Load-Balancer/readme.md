# Build Your Own Layer 7 HTTP Load Balancer

A custom application-layer (Layer 7) HTTP load balancer built using Node.js. The objective is to understand how load balancers distribute incoming HTTP traffic across multiple backend servers while maintaining availability, reliability, and fault tolerance.

---

## 1. Project Overview

A load balancer sits between clients and a group of backend servers. It receives incoming HTTP requests and distributes them across available servers.

The main objectives are:

- Distribute incoming HTTP requests across multiple backend servers.
- Reduce the possibility of overloading a single server.
- Perform periodic health checks.
- Stop routing requests to unhealthy servers.
- Automatically restore servers when they become healthy again.
- Handle multiple concurrent client requests.
- Maintain service availability when individual backend servers fail.

### Project Type

- **Category:** Backend Engineering / Networking
- **OSI Layer:** Layer 7 – Application Layer
- **Runtime:** Node.js
- **Backend Framework:** Express.js
- **Proxy Implementation:** Node.js HTTP module
- **Initial Scheduling Algorithm:** Round Robin

---

## 2. Technology Stack

| Component | Technology |
|---|---|
| Runtime | Node.js |
| Backend servers | Express.js |
| HTTP server | Node.js HTTP module |
| Request forwarding | Native HTTP / HTTPS |
| Health monitoring | Axios or native Fetch |
| Scheduling | Round Robin |
| Logging | Winston / Pino |
| Testing | Jest / Supertest |
| Configuration | dotenv |
| Version control | Git / GitHub |

**Architecture decision:** Use Node.js HTTP for the load balancer itself and Express.js for the backend servers. This provides a better understanding of HTTP request forwarding and response streaming.

---

## 3. System Architecture

```text
                  CLIENT
                    |
                    |
              HTTP REQUEST
                    |
                    v
          +---------------------+
          |    LOAD BALANCER    |
          |    Node.js HTTP     |
          +---------------------+
                    |
          +---------+---------+
          |         |         |
          v         v         v
      Backend 1 Backend 2 Backend 3
       :8080     :8081     :8082
          |         |         |
          +---------+---------+
                    |
              HTTP RESPONSE
                    |
                    v
                  CLIENT
```

### Core Components

**1. Request Router**

Receives HTTP requests and decides which backend should process them.

**2. Load Balancing Algorithm**

Selects the backend server based on a scheduling algorithm such as Round Robin.

**3. Health Checker**

Periodically checks whether backend servers are operational.

**4. Backend Registry**

Maintains information about all registered backend servers, including their URLs and health status.

**5. Proxy Handler**

Forwards incoming requests to the selected backend and streams the response back to the client.

---

## 4. Project Folder Structure

```text
node-load-balancer/
│
├── src/
│   │
│   ├── server.js
│   │
│   ├── config/
│   │   └── servers.js
│   │
│   ├── core/
│   │   ├── loadBalancer.js
│   │   ├── roundRobin.js
│   │   └── proxy.js
│   │
│   ├── health/
│   │   └── healthChecker.js
│   │
│   ├── utils/
│   │   └── logger.js
│   │
│   └── constants/
│       └── config.js
│
├── backend-servers/
│   ├── server1.js
│   ├── server2.js
│   └── server3.js
│
├── tests/
│   ├── roundRobin.test.js
│   └── healthChecker.test.js
│
├── .env
├── .gitignore
├── package.json
└── README.md
```

---

# 5. Development Roadmap

Build the project incrementally. Each phase should work before moving to the next.

## Phase 1 — Create Backend Servers

### Objective

Create three independent Express.js servers running on different ports.

| Server | Port |
|---|---|
| Backend Server 1 | 8080 |
| Backend Server 2 | 8081 |
| Backend Server 3 | 8082 |

Each server should return a unique response.

Example:

```json
{
  "server": "Backend Server 1",
  "message": "Hello from Server 1"
}
```

### Requirements

- Create three Express servers.
- Assign different ports.
- Create a GET `/` endpoint.
- Create a GET `/health` endpoint.
- Return HTTP status 200 for healthy servers.

### Expected Result

```text
Server 1 running on port 8080
Server 2 running on port 8081
Server 3 running on port 8082
```

**Learning Outcomes**

- HTTP servers
- Express routing
- Ports and localhost
- Client-server communication

---

## Phase 2 — Build a Basic Reverse Proxy

### Objective

Create a Node.js HTTP server that receives requests and forwards them to one backend server.

Initially, use only one backend.

### Request Flow

```text
Client
  |
  | GET /
  v
Load Balancer :3000
  |
  | Forward request
  v
Backend Server :8080
  |
  | HTTP Response
  v
Load Balancer
  |
  v
Client
```

### Requirements

- Create an HTTP server on port 3000.
- Listen for incoming requests.
- Read the HTTP method, URL, and headers.
- Forward the request to the backend.
- Stream the backend response to the client.
- Handle connection errors.

### Expected Result

```text
Client Request:
GET http://localhost:3000/

Load Balancer:
Received request
Forwarding to Backend Server 1

Backend:
Hello from Server 1

Client:
Hello from Server 1
```

**Learning Outcomes**

- Reverse proxy
- HTTP request and response lifecycle
- Node.js HTTP module
- Request and response streams
- Error handling

---

## Phase 3 — Implement Round Robin

### Objective

Distribute incoming requests across multiple backend servers.

### What is Round Robin?

Round Robin is a scheduling algorithm that distributes requests sequentially across available servers.

For three backend servers:

| Request | Selected Server |
|---|---|
| 1 | Server 1 |
| 2 | Server 2 |
| 3 | Server 3 |
| 4 | Server 1 |
| 5 | Server 2 |
| 6 | Server 3 |

### Basic Algorithm

```text
1. Maintain a list of backend servers.
2. Maintain a current server index.
3. Select the server at the current index.
4. Increment the index.
5. If the index reaches the end,
   reset it to zero.
6. Forward the request.
```

### Requirements

- Maintain a backend server registry.
- Implement Round Robin selection.
- Route requests to different servers.
- Skip unhealthy servers when selecting a backend.

**Learning Outcomes**

- Scheduling algorithms
- Arrays and index management
- Shared application state
- Load distribution

---

## Phase 4 — Implement Health Monitoring

### Objective

Automatically identify unavailable backend servers.

### What is a Health Check?

A health check is a periodic request sent to a backend server to determine whether it is operational.

Example:

```http
GET http://localhost:8080/health
```

Healthy response:

```json
{
  "status": "healthy"
}
```

### Health Check Logic

```text
          Health Checker
                |
                v
       Send GET /health
                |
                v
       Check HTTP Status
                |
          +-----+-----+
          |           |
        200 OK     Other/Error
          |           |
          v           v
       Healthy     Unhealthy
          |           |
          v           v
       Include     Exclude from
       in pool     routing pool
```

### Requirements

- Configure a health check interval.
- Periodically check every backend.
- Mark a server unhealthy when the health check fails.
- Restore a server when it passes a subsequent health check.
- Run health monitoring independently of client requests.

### Important Design Decision

Do not permanently delete failed servers from the backend registry.

Maintain all registered servers and update their health status.

Example:

```javascript
const servers = [
  {
    id: "server-1",
    url: "http://localhost:8080",
    healthy: true
  },
  {
    id: "server-2",
    url: "http://localhost:8081",
    healthy: true
  },
  {
    id: "server-3",
    url: "http://localhost:8082",
    healthy: false
  }
];
```

This makes server recovery easier.

**Learning Outcomes**

- Background tasks
- Timers
- Asynchronous programming
- Health monitoring
- Fault detection

---

## Phase 5 — Fault Tolerance

### Objective

Ensure that backend failures do not crash the load balancer.

### Failure Scenarios

| Scenario | Expected Behaviour |
|---|---|
| Backend server crashes | Mark server unhealthy |
| Connection refused | Handle proxy error |
| Backend request timeout | Return appropriate error |
| All backends offline | Return HTTP 503 |
| Backend restarts | Restore after successful health check |
| Backend crashes during request | Handle incomplete upstream response |

### Requirements

- Implement connection timeouts.
- Handle failed upstream connections.
- Return HTTP 503 when no healthy servers exist.
- Avoid unhandled promise rejections.
- Prevent individual backend failures from crashing the load balancer.

**Learning Outcomes**

- Fault tolerance
- Error handling
- Timeouts
- Availability
- Failure recovery

---

## Phase 6 — Handle Concurrent Requests

### Objective

Test whether the load balancer can handle multiple simultaneous client requests.

Node.js uses an event-driven, non-blocking I/O model that supports many concurrent network operations.

### Test Example

```javascript
const requests = Array.from(
  { length: 10 },
  (_, index) => fetch("http://localhost:3000/")
);

const responses = await Promise.all(requests);

const results = await Promise.all(
  responses.map(response => response.json())
);

console.log(results);
```

### Requirements

- Handle multiple requests simultaneously.
- Verify that requests are distributed correctly.
- Ensure the Round Robin index remains consistent.
- Test multiple concurrent backend failures.
- Verify that one slow backend does not block unrelated requests.

### Additional Testing

Use curl:

```bash
curl --parallel \
     --parallel-immediate \
     --parallel-max 3 \
     --config urls.txt
```

**Learning Outcomes**

- Node.js Event Loop
- Asynchronous I/O
- Promise handling
- Concurrency
- Race conditions

---

## Phase 7 — Advanced Features

After completing the core load balancer, consider implementing the following.

### 1. Dynamic Backend Registration

Allow new backend servers to be added without restarting the load balancer.

### 2. Dynamic Backend Removal

Remove a backend server from the registry when it is no longer needed.

### 3. Least Connections

Instead of Round Robin, select the server with the fewest active connections.

### 4. Request Logging

Record:

- Incoming request URL
- HTTP method
- Selected backend
- Response status
- Request processing duration
- Proxy errors

### 5. Monitoring Dashboard

Display:

- Total incoming requests
- Requests handled by each server
- Healthy backend count
- Unhealthy backend count
- Average response time
- Active connections

### 6. Graceful Shutdown

Stop accepting new requests and allow existing requests to complete before shutting down.

---

# 6. Important Engineering Concepts to Research

Use this table as a research checklist while implementing the project.

| Concept | Why It Matters |
|---|---|
| OSI Model | Understand Layer 7 load balancing |
| HTTP Protocol | Understand request/response communication |
| TCP | Understand network connections |
| Reverse Proxy | Forward client requests to backend servers |
| Node.js Event Loop | Understand asynchronous execution |
| Streams | Forward large request and response bodies |
| Round Robin | Distribute requests |
| Health Checks | Identify unavailable servers |
| Fault Tolerance | Handle server failures |
| Timeouts | Prevent hanging requests |
| Race Conditions | Protect shared state |
| Connection Pooling | Reuse network connections |
| Graceful Shutdown | Handle controlled termination |

---

# 7. Important Engineering Decisions

### Decision 1: Should health checks run inside the request handler?

No.

Health checks should run as independent background tasks. Running them inside every client request introduces unnecessary latency and network traffic.

### Decision 2: Should unhealthy servers be deleted?

No.

Keep a complete backend registry and maintain health status separately.

### Decision 3: What happens when every backend is unhealthy?

Return:

```http
HTTP/1.1 503 Service Unavailable
```

### Decision 4: Are health checks sufficient to guarantee availability?

No.

A server can become unavailable immediately after passing a health check. Therefore, the actual proxy request must also handle connection failures and timeouts.

### Decision 5: Does Promise.all() create multiple threads?

No.

Promise.all() aggregates promises. Node.js handles asynchronous network I/O through its event-driven architecture. CPU-intensive operations require a different approach, such as worker threads.

---

# 8. Testing Checklist

Use this checklist to validate the project.

### Backend Setup

- [ ] Three backend servers start successfully.
- [ ] Each server runs on a different port.
- [ ] Each server returns a unique response.
- [ ] Each server exposes a health endpoint.

### Reverse Proxy

- [ ] Load balancer starts on port 3000.
- [ ] Client requests reach a backend.
- [ ] Backend responses reach the client.
- [ ] HTTP methods and request bodies are forwarded correctly.

### Round Robin

- [ ] Requests alternate between healthy servers.
- [ ] Distribution works with three or more servers.
- [ ] Index resets correctly.

### Health Monitoring

- [ ] Health checks run periodically.
- [ ] Unhealthy servers are excluded.
- [ ] Recovered servers rejoin the routing pool.
- [ ] Health checks do not block client requests.

### Fault Tolerance

- [ ] Connection failures are handled.
- [ ] Backend timeouts are handled.
- [ ] All-backend failure returns HTTP 503.
- [ ] Load balancer remains operational after backend failure.

### Concurrency

- [ ] Multiple clients can send requests simultaneously.
- [ ] Round Robin selection remains consistent.
- [ ] Concurrent requests do not corrupt shared state.

---

# 9. Recommended Development Strategy

Do not introduce unnecessary infrastructure at the beginning.

### Initial Version

Use:

- Node.js
- Express.js
- Native HTTP module
- Native Fetch or Axios
- Round Robin

Avoid MongoDB, Redis, Docker, and Kubernetes initially. They are not necessary for implementing the core challenge.

### Future Version

Once the basic implementation works, consider:

- Docker Compose for running multiple backend instances.
- Redis for shared state across multiple load balancer instances.
- Prometheus for metrics collection.
- Grafana for monitoring and visualization.
- Least Connections and other scheduling algorithms.
- TLS termination and HTTPS support.

---

# 10. Definition of Done

The project can be considered a working basic HTTP load balancer when:

1. It accepts HTTP requests from clients.
2. It forwards requests to multiple backend servers.
3. It distributes traffic using Round Robin.
4. It periodically health-checks backend servers.
5. It automatically excludes unhealthy servers.
6. It automatically restores recovered servers.
7. It handles concurrent client requests.
8. It handles backend failures without crashing.
9. It returns HTTP 503 when no healthy backend is available.

---

## Final Goal

Build a working Layer 7 HTTP load balancer from scratch to understand reverse proxying, request routing, scheduling algorithms, asynchronous programming, health monitoring, and fault tolerance.

**The objective is not simply to make requests work. It is to understand why the system works, what happens when components fail, and how to make the system more reliable.**