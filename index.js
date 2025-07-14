const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const grpc = require("@grpc/grpc-js");
const token = require("./proto/token_pb.js");
const service = require("./proto/token_grpc_pb.js");

const PORT = process.env.PORT || 8000;
const JWT_SECRET =
  process.env.JWT_SECRET || crypto.randomBytes(32).toString("hex");

// Generate a JWT token for a user
function GenerateToken(call, callback) {
  const { email, userId } = call.request.toObject();
  if (!userId || typeof userId !== "number") {
    return callback({
      code: grpc.status.INVALID_ARGUMENT,
      message: "Missing userId",
    });
  }
  if (!email || typeof email !== "string") {
    return callback({
      code: grpc.status.INVALID_ARGUMENT,
      message: "Missing email",
    });
  }
  const payload = { userId, email };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "15m" });
  const response = new token.TokenResponse();
  response.setToken(token);
  callback(null, response);
}

// Validate a JWT token and return its payload
function ValidateToken(call, callback) {
  const { token: tokenStr } = call.request.toObject();
  if (!tokenStr) {
    return callback({
      code: grpc.status.INVALID_ARGUMENT,
      message: "Missing token",
    });
  }
  try {
    const decoded = jwt.verify(tokenStr, JWT_SECRET);
    const response = new token.TokenValidationResponse();
    response.setValid(true);
    response.setPayload(JSON.stringify(decoded));
    callback(null, response);
  } catch (err) {
    const response = new token.TokenValidationResponse();
    response.setValid(false);
    response.setError(err.message);
    callback(null, response);
  }
}

// Main function to start the gRPC server
function main() {
  const server = new grpc.Server();
  server.addService(service.TokenService, {
    GenerateToken: GenerateToken,
    ValidateToken: ValidateToken,
  });
  server.bindAsync(
    `0.0.0.0:${PORT}`,
    grpc.ServerCredentials.createInsecure(),
    (err, port) => {
      if (err) {
        console.error(`Error starting Auth server: ${err}`);
        return;
      }
      console.log(`Auth server running on port ${port}`);
    }
  );
}

main();
