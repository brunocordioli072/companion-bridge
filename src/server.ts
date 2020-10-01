import { Request } from "express";
import { ApolloServer, ApolloError } from "apollo-server-lambda";
import "reflect-metadata";
import { buildSchemaSync } from "type-graphql";
import { Container } from "typedi";
import { PlaylistResolver } from "./resolvers/PlaylistResolver";
import { UserResolver } from "./resolvers/UserResolver";
import { CredentialsResolver } from "./resolvers/CredentialsResolver";
import { ArtistResolver } from "./resolvers/ArtistResolver";

const schema = buildSchemaSync({
  resolvers: [
    PlaylistResolver,
    UserResolver,
    CredentialsResolver,
    ArtistResolver,
  ],
  container: Container,
  emitSchemaFile: process.env.NODE_ENV == "dev",
  validate: false,
});

const server = new ApolloServer({
  schema,
  introspection: true,
  playground: true,
  context: function (event: any) {
    let req: Request = event.event;
    const authorization = req.headers.authorization
      ? req.headers.authorization
      : req.headers.Authorization;
    if (authorization && typeof authorization == "string")
      process.env.ACCESS_TOKEN = authorization;
  },
});

exports.handler = server.createHandler({
  cors: {
    origin: true,
  },
});
