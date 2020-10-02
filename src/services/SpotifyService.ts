import SpotifyWebApi from "spotify-web-api-node";
import { Service } from "typedi";
import { Artist } from "../entities/Artist";
import _ from "lodash";
import { ApolloError } from "apollo-server-lambda";
import { Context } from "vm";
@Service()
export class SpotifyService extends SpotifyWebApi {
  constructor() {
    super({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
    });
  }

  async artistsByName(name: string, limit: number): Promise<Artist[]> {
    let artistSearch = await this.search(name, ["artist"], {
      limit,
    });
    return artistSearch.body.artists ? artistSearch.body.artists.items : [];
  }

  async artistsByTrackName(
    trackName: string,
    limit: number
  ): Promise<Artist[]> {
    let trackSearch = await this.search(trackName, ["track"], {
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
    let artistSearch = await this.getArtists(artistIds);
    return artistSearch.body.artists;
  }

  setTokenByContext(ctx?: Context) {
    if (!ctx || !ctx.SPOTIFY_TOKEN)
      throw new ApolloError("Missing Token", "401");
    this.setAccessToken(ctx.SPOTIFY_TOKEN);
  }
}
