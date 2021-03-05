import {Resolver, Query, Ctx} from 'type-graphql';
import {Context} from 'vm';
import {Playlist} from '../entities/Playlist';
import {User} from '../entities/User';
import {SpotifyService} from '../services/SpotifyService';

@Resolver()
export class UserResolver {
  constructor(private readonly spotifyService: SpotifyService) {}

  @Query(() => User)
  async spotifyUser(@Ctx() ctx?: Context): Promise<User> {
    this.spotifyService.setTokenByContext(ctx);
    const userSearch = await this.spotifyService.getMe();
    return userSearch.body;
  }

  @Query(() => [Playlist], {nullable: true})
  async userPlaylists(@Ctx() ctx?: Context): Promise<Playlist[]> {
    this.spotifyService.setTokenByContext(ctx);
    let playlists: Playlist[] = [];
    const playlistSearch = await this.spotifyService.getUserPlaylists();
    playlists = playlistSearch.body.items;
    return playlists;
  }
}
