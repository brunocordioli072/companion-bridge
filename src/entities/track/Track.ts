import {ObjectType, Field} from 'type-graphql';
import GraphQLJSON from 'graphql-type-json';
import {TrackSimplified} from './TrackSimplified';
import {Image} from '../Image';

@ObjectType({simpleResolvers: true})
export class Track extends TrackSimplified {
  @Field(() => Album, {nullable: true})
  album: Album;
  @Field(() => GraphQLJSON, {nullable: true})
  external_ids: any;
  @Field({nullable: true})
  popularity: number;
}

@ObjectType({simpleResolvers: true})
class Album {
  @Field({nullable: true})
  album_group: string;
  @Field({nullable: true})
  album_type: string;
  @Field(() => [GraphQLJSON], {nullable: true})
  artists: any[];
  @Field(() => [String], {nullable: true})
  available_markets: string[];
  @Field({nullable: true})
  id: string;
  @Field(() => [Image], {nullable: true})
  images: Image[];
  @Field({nullable: true})
  name: string;
  @Field({nullable: true})
  release_date: string;
  @Field(() => GraphQLJSON, {nullable: true})
  release_date_precision: any;
  @Field(() => GraphQLJSON, {nullable: true})
  restrictions: any;
  @Field(() => GraphQLJSON, {nullable: true})
  type: any;
}
