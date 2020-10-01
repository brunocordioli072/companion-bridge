import SpotifyWebApi from "spotify-web-api-node";
import { Service } from "typedi";
@Service()
export class SpotifyService extends SpotifyWebApi {
  constructor() {
    console.log("constructor", process.env.ACCESS_TOKEN);
    super({
      accessToken: process.env.ACCESS_TOKEN ? process.env.ACCESS_TOKEN : "",
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
    });
  }
}
