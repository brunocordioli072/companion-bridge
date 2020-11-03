import SpotifyWebApi from 'spotify-web-api-node';
import {Service} from 'typedi';
import {Artist} from '../entities/Artist';
import _ from 'lodash';
import {ApolloError} from 'apollo-server-lambda';
import {Context} from 'vm';
import config from 'config';

@Service()
export class SpotifyService extends SpotifyWebApi {
  constructor() {
    const SPOTIFY_CONFIG: any = config.get('spotify');
    super({
      clientId: SPOTIFY_CONFIG.CLIENT_ID,
      clientSecret: SPOTIFY_CONFIG.CLIENT_SECRET,
    });
  }

  async artistsByName(name: string, limit: number): Promise<Artist[]> {
    const artistSearch = await this.search(name, ['artist'], {
      limit,
    });
    return artistSearch.body.artists ? artistSearch.body.artists.items : [];
  }

  async artistsByTrackName(
    trackName: string,
    limit: number
  ): Promise<Artist[]> {
    const trackSearch = await this.search(trackName, ['track'], {
      limit,
    });
    const tracks = trackSearch.body.tracks ? trackSearch.body.tracks.items : [];
    const artistIds = _.flatMap(
      tracks.map(i => {
        return i.artists.map(a => {
          return a.id;
        });
      })
    );
    const artistSearch = await this.getArtists(artistIds);
    return artistSearch.body.artists;
  }

  setTokenByContext(ctx?: Context) {
    if (!ctx || !ctx.SPOTIFY_TOKEN)
      throw new ApolloError('Missing Token', '401');
    this.setAccessToken(ctx.SPOTIFY_TOKEN);
  }
}
