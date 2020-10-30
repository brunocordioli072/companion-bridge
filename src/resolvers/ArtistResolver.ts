import {Resolver, Query, Ctx, Arg} from 'type-graphql';
import {Artist} from '../entities/Artist';
import {SpotifyService} from '../services/SpotifyService';
import _ from 'lodash';
import {Track} from '../entities/Track';
import {Context} from 'vm';
@Resolver(() => Artist)
export class ArtistResolver {
  constructor(private readonly spotifyService: SpotifyService) {}

  @Query(() => [Artist], {name: 'artists'})
  async searchArtists(
    @Arg('query', {nullable: true}) query?: string,
    @Arg('name', {nullable: true}) artistName?: string,
    @Arg('track', {nullable: true}) trackName?: string,
    @Arg('limit', {nullable: true}) limit = 12,
    @Ctx() ctx?: Context
  ): Promise<Artist[]> {
    this.spotifyService.setTokenByContext(ctx);
    let artists: Artist[] = [];
    let items: Artist[] = [];
    if (query) {
      items = await this.spotifyService.artistsByName(
        query,
        Math.floor(limit / 2)
      );
      artists.push(...items);
      items = await this.spotifyService.artistsByTrackName(
        query,
        Math.floor(limit / 2)
      );
      artists.push(...items);
    } else if (artistName) {
      items = await this.spotifyService.artistsByName(artistName, limit);
      artists.push(...items);
    } else if (trackName) {
      items = await this.spotifyService.artistsByTrackName(trackName, limit);
      artists.push(...items);
    }
    artists = artists.sort((a, b) => b.popularity - a.popularity);
    return _.uniqBy(artists, 'id');
  }

  @Query(() => [Artist])
  async artistsRelatedByArtistId(
    @Arg('artistId', {nullable: true}) artistId: string,
    @Arg('limit', {nullable: true}) limit: number,
    @Ctx() ctx?: Context
  ): Promise<Artist[]> {
    this.spotifyService.setTokenByContext(ctx);
    const artistSearch = await this.spotifyService.getArtistRelatedArtists(
      artistId
    );
    return artistSearch.body.artists ? artistSearch.body.artists : [];
  }

  @Query(() => [Track])
  async artistTopTracks(
    @Arg('artistId', {nullable: true}) artistId: string,
    @Ctx() ctx?: Context
  ): Promise<Track[]> {
    this.spotifyService.setTokenByContext(ctx);
    const artistSearch = await this.spotifyService.getArtistTopTracks(
      artistId,
      'GB'
    );
    return artistSearch.body.tracks ? artistSearch.body.tracks : [];
  }
}
