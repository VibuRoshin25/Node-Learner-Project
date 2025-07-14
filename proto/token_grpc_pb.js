// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var token_pb = require('./token_pb.js');

function serialize_token_GenerateTokenRequest(arg) {
  if (!(arg instanceof token_pb.GenerateTokenRequest)) {
    throw new Error('Expected argument of type token.GenerateTokenRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_token_GenerateTokenRequest(buffer_arg) {
  return token_pb.GenerateTokenRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_token_GenerateTokenResponse(arg) {
  if (!(arg instanceof token_pb.GenerateTokenResponse)) {
    throw new Error('Expected argument of type token.GenerateTokenResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_token_GenerateTokenResponse(buffer_arg) {
  return token_pb.GenerateTokenResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_token_ValidateTokenRequest(arg) {
  if (!(arg instanceof token_pb.ValidateTokenRequest)) {
    throw new Error('Expected argument of type token.ValidateTokenRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_token_ValidateTokenRequest(buffer_arg) {
  return token_pb.ValidateTokenRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_token_ValidateTokenResponse(arg) {
  if (!(arg instanceof token_pb.ValidateTokenResponse)) {
    throw new Error('Expected argument of type token.ValidateTokenResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_token_ValidateTokenResponse(buffer_arg) {
  return token_pb.ValidateTokenResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var TokenService = exports.TokenService = {
  generateToken: {
    path: '/token.Token/GenerateToken',
    requestStream: false,
    responseStream: false,
    requestType: token_pb.GenerateTokenRequest,
    responseType: token_pb.GenerateTokenResponse,
    requestSerialize: serialize_token_GenerateTokenRequest,
    requestDeserialize: deserialize_token_GenerateTokenRequest,
    responseSerialize: serialize_token_GenerateTokenResponse,
    responseDeserialize: deserialize_token_GenerateTokenResponse,
  },
  validateToken: {
    path: '/token.Token/ValidateToken',
    requestStream: false,
    responseStream: false,
    requestType: token_pb.ValidateTokenRequest,
    responseType: token_pb.ValidateTokenResponse,
    requestSerialize: serialize_token_ValidateTokenRequest,
    requestDeserialize: deserialize_token_ValidateTokenRequest,
    responseSerialize: serialize_token_ValidateTokenResponse,
    responseDeserialize: deserialize_token_ValidateTokenResponse,
  },
};

exports.TokenClient = grpc.makeGenericClientConstructor(TokenService, 'Token');
