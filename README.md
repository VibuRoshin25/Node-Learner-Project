# vibrox-auth

`vibrox-auth` is the authentication microservice of the **Vibrox** suite.  
It provides secure JWT generation and validation via gRPC, acting as the identity gatekeeper for other services.

---

## Features

- gRPC API for:
  - Signing new JWTs
  - Validating existing tokens
- Secret-based signing strategy (HS256 or configurable)
- Lightweight and stateless — ideal for microservice auth

---

## gRPC Setup

The gRPC service is defined using Protocol Buffers (`token.proto`).  
To compile the `.proto` file for Node.js:

### Compile Command

```bash
npx grpc_tools_node_protoc \
  --js_out=import_style=commonjs,binary:./proto \
  --grpc_out=grpc_js:./proto \
  -I ./proto ./proto/token.proto
```

> This generates the necessary JS and gRPC client/server code inside the `./proto` directory.

**Make sure:**

- You’ve installed the necessary dependencies (see below)
- Your `.proto` file is placed in `./proto/`

---

## Getting Started

### Prerequisites

- `protoc` (Protocol Buffers compiler)
- `grpc-tools` and `@grpc/grpc-js`

### Install Dependencies

```bash
npm install
```

### Run Locally

```bash
npm run dev
```

OR

```bash
node index.js
```
