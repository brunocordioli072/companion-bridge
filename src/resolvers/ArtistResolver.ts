import { Resolver, Query, Ctx, Arg } from "type-graphql";
import { Artist } from "../entities/Artist";
import { SpotifyService } from "../services/SpotifyService";
import _ from "lodash";
import { Track } from "../entities/Track";
@Resolver((of) => Artist)
export class ArtistResolver {
  constructor(private readonly spotifyService: SpotifyService) {}

  @Query(() => [Artist], { name: "artists" })
  async searchArtists(
    @Arg("query", { nullable: true }) query?: string,
    @Arg("name", { nullable: true }) artistName?: string,
    @Arg("track", { nullable: true }) trackName?: string,
    @Arg("limit", { nullable: true }) limit: number = 12
  ): Promise<Artist[]> {
    let artists: Artist[] = [];
    let items: Artist[] = [];
    if (query) {
      items = await this.artistsByName(query, Math.floor(limit / 2));
      artists.push(...items);
      items = await this.artistsByTrackName(query, Math.floor(limit / 2));
      artists.push(...items);
    } else if (artistName) {
      items = await this.artistsByName(artistName, limit);
      artists.push(...items);
    } else if (trackName) {
      items = await this.artistsByTrackName(trackName, limit);
      artists.push(...items);
    }
    artists = artists.sort((a, b) => b.popularity - a.popularity);
    return _.uniqBy(artists, "id");
  }
  @Query(() => [Artist])
  async artistsByName(
    @Arg("name", { nullable: true }) name: string,
    @Arg("limit", { nullable: true }) limit: number
  ): Promise<Artist[]> {
    let artistSearch = await this.spotifyService.search(name, ["artist"], {
      limit,
    });
    return artistSearch.body.artists ? artistSearch.body.artists.items : [];
  }

  @Query(() => [Artist])
  async artistsByTrackName(
    @Arg("trackName", { nullable: true }) trackName: string,
    @Arg("limit", { nullable: true }) limit: number
  ): Promise<Artist[]> {
    let trackSearch = await this.spotifyService.search(trackName, ["track"], {
      limit,
    });
    let tracks = trackSearch.body.tracks ? trackSearch.body.tracks.items : [];
    let artistIds = _.flatMap(
      tracks.map((i) => {
        return i.artists.map((a) => {
          return a.id;
        });
      })
    );
    let artistSearch = await this.spotifyService.getArtists(artistIds);
    return artistSearch.body.artists;
  }

  @Query(() => [Artist])
  async artistsRelatedByArtistId(
    @Arg("artistId", { nullable: true }) artistId: string,
    @Arg("limit", { nullable: true }) limit: number
  ): Promise<Artist[]> {
    let artistSearch = await this.spotifyService.getArtistRelatedArtists(
      artistId
    );
    return artistSearch.body.artists ? artistSearch.body.artists : [];
  }

  @Query(() => [Track])
  async artistTopTracks(
    @Arg("artistId", { nullable: true }) artistId: string
  ): Promise<Track[]> {
    let artistSearch = await this.spotifyService.getArtistTopTracks(
      artistId,
      "GB"
    );
    return artistSearch.body.tracks ? artistSearch.body.tracks : [];
  }
}
