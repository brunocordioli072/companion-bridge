import {ObjectType, Field} from 'type-graphql';
import {ArtistSimplified} from '../Artist';
import GraphQLJSON from 'graphql-type-json';

@ObjectType({simpleResolvers: true})
export class TrackSimplified {
  @Field({nullable: true})
  is_local?: boolean;
  @Field(() => [ArtistSimplified], {nullable: true})
  artists: ArtistSimplified[];
  @Field(() => [String], {nullable: true})
  available_markets?: string[];
  @Field({nullable: true})
  disc_number: number;
  @Field({nullable: true})
  duration_ms: number;
  @Field({nullable: true})
  explicit: boolean;
  @Field(() => GraphQLJSON, {nullable: true})
  external_urls: any;
  @Field({nullable: true})
  href: string;
  @Field({nullable: true})
  id: string;
  @Field({nullable: true})
  is_playable?: boolean;
  @Field(() => GraphQLJSON, {nullable: true})
  linked_from?: any;
  @Field(() => GraphQLJSON, {nullable: true})
  restrictions?: any;
  @Field({nullable: true})
  name: string;
  @Field(() => String, {nullable: true})
  preview_url: any;
  @Field({nullable: true})
  track_number: number;
  @Field({nullable: true})
  type: string;
  @Field({nullable: true})
  uri: string;
}
