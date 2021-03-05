import {ObjectType, Field} from 'type-graphql';
import {Image} from './Image';
import GraphQLJSON from 'graphql-type-json';

@ObjectType({simpleResolvers: true})
export class Playlist {
  @Field(() => GraphQLJSON, {nullable: true})
  tracks: any;
  @Field({nullable: true})
  collaborative: boolean;
  @Field(() => String, {nullable: true})
  description: any;
  @Field({nullable: true})
  id: string;
  @Field(() => [Image], {nullable: true})
  images: Image[];
  @Field({nullable: true})
  name: string;
  @Field(() => GraphQLJSON, {nullable: true})
  owner: any;
  @Field(() => Boolean, {nullable: true})
  public: any;
  @Field({nullable: true})
  snapshot_id: string;
  @Field({nullable: true})
  type: string;
  @Field({nullable: true})
  href: string;
  @Field(() => GraphQLJSON, {nullable: true})
  external_urls: any;
  @Field({nullable: true})
  uri: string;
}
