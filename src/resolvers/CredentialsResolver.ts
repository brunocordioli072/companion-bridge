import {Resolver, Query} from 'type-graphql';
import {Credentials} from '../entities/Credentials';
import {SpotifyService} from '../services/SpotifyService';

@Resolver(() => Credentials)
export class CredentialsResolver {
  constructor(private readonly spotifyService: SpotifyService) {}

  @Query(() => Credentials)
  spotifyCredentials() {
    return this.spotifyService.getCredentials();
  }
}
