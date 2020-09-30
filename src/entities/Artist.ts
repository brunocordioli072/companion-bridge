import { ObjectType, Field } from "type-graphql";
import { Image } from "./Image";

@ObjectType({ simpleResolvers: true })
export class Artist {
  @Field((type) => Followers, { nullable: true })
  followers: Followers;
  @Field((type) => [String], { nullable: true })
  genres: string[];
  @Field((type) => [Image], { nullable: true })
  images: Image[];
  @Field({ nullable: true })
  popularity: number;
  @Field({ nullable: true })
  name: string;
  @Field({ nullable: true })
  id: string;
  @Field({ nullable: true })
  type: string;
  @Field({ nullable: true })
  href: string;
  @Field((type) => ExternalUrls, { nullable: true })
  external_urls: ExternalUrls;
  @Field({ nullable: true })
  uri: string;
}

@ObjectType({ simpleResolvers: true })
class Followers {
  @Field((type) => String, { nullable: true })
  href: null;
  @Field({ nullable: true })
  total: number;
}

@ObjectType({ simpleResolvers: true })
class ExternalUrls {
  @Field({ nullable: true })
  spotify: string;
}

@ObjectType({ simpleResolvers: true })
export class ArtistSimplified {
  @Field({ nullable: true })
  name: string;
  @Field({ nullable: true })
  id: string;
  @Field({ nullable: true })
  type: string;
}
