import { ObjectType, Field } from "type-graphql";
import { ArtistSimplified } from "./Artist";
import { Image } from "./Image";

@ObjectType({ simpleResolvers: true })
export class Track {
  @Field({ nullable: true })
  album: any;
  @Field({ nullable: true })
  external_ids: any;
  @Field({ nullable: true })
  popularity: number;
  @Field({ nullable: true })
  is_local?: boolean;
  @Field({ nullable: true })
  artists: ArtistSimplified[];
  @Field({ nullable: true })
  available_markets?: string[];
  @Field({ nullable: true })
  disc_number: number;
  @Field({ nullable: true })
  duration_ms: number;
  @Field({ nullable: true })
  explicit: boolean;
  @Field({ nullable: true })
  external_urls: any;
  @Field({ nullable: true })
  href: string;
  @Field({ nullable: true })
  id: string;
  @Field({ nullable: true })
  is_playable?: boolean;
  @Field({ nullable: true })
  linked_from?: any;
  @Field({ nullable: true })
  restrictions?: any;
  @Field({ nullable: true })
  name: string;
  @Field({ nullable: true })
  preview_url: any;
  @Field({ nullable: true })
  track_number: number;
  @Field({ nullable: true })
  type: string;
  @Field({ nullable: true })
  uri: string;
}
