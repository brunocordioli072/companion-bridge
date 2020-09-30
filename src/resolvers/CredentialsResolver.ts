import { Resolver, Query, Ctx } from "type-graphql";
import { Credentials } from "../entities/Credentials";
import { SpotifyService } from "../services/SpotifyService";

@Resolver((of) => Credentials)
export class CredentialsResolver {
  constructor(private readonly spotifyService: SpotifyService) {}

  @Query(() => Credentials)
  spotifyCredentials() {
    return this.spotifyService.getCredentials();
  }
}
