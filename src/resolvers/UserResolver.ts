import { Resolver, Query, Ctx } from "type-graphql";
import { Playlist } from "../entities/Playlist";
import { User } from "../entities/User";
import { SpotifyService } from "../services/SpotifyService";

@Resolver()
export class UserResolver {
  constructor(private readonly spotifyService: SpotifyService) {}

  @Query(() => User)
  async spotifyUser(): Promise<User> {
    let userSearch = await this.spotifyService.getMe();
    return userSearch.body;
  }

  @Query(() => [Playlist], { nullable: true })
  async userPlaylists(): Promise<Playlist[]> {
    let playlists: Playlist[] = [];
    let playlistSearch = await this.spotifyService.getUserPlaylists();
    playlists = playlistSearch.body.items;
    return playlists;
  }
}
