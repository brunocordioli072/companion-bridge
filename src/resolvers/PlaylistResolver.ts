import {ApolloError} from 'apollo-server-lambda';
import {VoidResolver} from 'graphql-scalars';
import {Resolver, Mutation, Arg, Ctx} from 'type-graphql';
import {Context} from 'vm';
import {Playlist} from '../entities/Playlist';
import {Track} from '../entities/Track';
import {SpotifyService} from '../services/SpotifyService';

@Resolver()
export class PlaylistResolver {
  constructor(private readonly spotifyService: SpotifyService) {}

  @Mutation(() => Playlist, {nullable: true})
  async insertPlaylist(
    @Arg('playlistName', {nullable: true}) playlistName: string,
    @Ctx() ctx?: Context
  ): Promise<Playlist> {
    this.spotifyService.setTokenByContext(ctx);
    const playlistSearch = await this.spotifyService.getUserPlaylists();
    const playlistNames = playlistSearch.body.items.map(p => p.name);
    if (!playlistNames.includes(playlistName)) {
      const userSearch = await this.spotifyService.getMe();
      const user = userSearch.body;
      const res = await this.spotifyService.createPlaylist(
        user.id,
        playlistName,
        {
          public: true,
        }
      );
      return res.body;
    } else {
      throw new ApolloError('Playlist Not Found', '404');
    }
  }

  @Mutation(() => VoidResolver, {nullable: true})
  async insertArtistsToPlaylist(
    @Arg('playlistId', {nullable: true}) playlistId: string,
    @Arg('artistIds', () => [String], {nullable: true})
    artistIds: string[],
    @Ctx() ctx?: Context
  ): Promise<void> {
    this.spotifyService.setTokenByContext(ctx);
    const tracks: Track[] = [];
    for (let index = 0; index < artistIds.length; index++) {
      const artistId = artistIds[index];
      const trackSearch = await this.spotifyService.getArtistTopTracks(
        artistId,
        'GB'
      );
      tracks.push(...trackSearch.body.tracks);
    }
    const tracksURIs = tracks.map((t: SpotifyApi.TrackObjectFull) => t.uri);
    await this.spotifyService.addTracksToPlaylist(playlistId, tracksURIs);
  }

  @Mutation(() => VoidResolver, {nullable: true})
  async deletePlaylist(
    @Arg('playlistId', {nullable: true}) playlistId: string,
    @Ctx() ctx?: Context
  ): Promise<void> {
    this.spotifyService.setTokenByContext(ctx);
    await this.spotifyService.unfollowPlaylist(playlistId);
  }

  @Mutation(() => VoidResolver, {nullable: true})
  async cleanPlaylistTracks(
    @Arg('playlistId', {nullable: true}) playlistId: string,
    @Ctx() ctx?: Context
  ): Promise<void> {
    this.spotifyService.setTokenByContext(ctx);
    const trackSearch = await this.spotifyService.getPlaylistTracks(playlistId);
    const tracks = trackSearch.body.items;
    const tracksURIs = tracks.map(t => {
      return {uri: t.track.uri};
    });
    if (tracksURIs.length > 0) {
      await this.spotifyService.removeTracksFromPlaylist(
        playlistId,
        tracksURIs
      );
    } else {
      throw new ApolloError('Playlist Not Found', '404');
    }
  }
}
