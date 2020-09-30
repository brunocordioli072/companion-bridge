import { ObjectType, Field } from "type-graphql";
import { Image } from "./Image";
import GraphQLJSON from "graphql-type-json";

@ObjectType({ simpleResolvers: true })
export class Playlist {
  @Field((type) => GraphQLJSON, { nullable: true })
  tracks: any;
  @Field({ nullable: true })
  collaborative: boolean;
  @Field((type) => String, { nullable: true })
  description: any;
  @Field({ nullable: true })
  id: string;
  @Field((type) => [Image], { nullable: true })
  images: Image[];
  @Field({ nullable: true })
  name: string;
  @Field((type) => GraphQLJSON, { nullable: true })
  owner: any;
  @Field((type) => Boolean, { nullable: true })
  public: any;
  @Field({ nullable: true })
  snapshot_id: string;
  @Field({ nullable: true })
  type: string;
  @Field({ nullable: true })
  href: string;
  @Field((type) => GraphQLJSON, { nullable: true })
  external_urls: any;
  @Field({ nullable: true })
  uri: string;
}
