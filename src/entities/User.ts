import {ObjectType, Field} from 'type-graphql';
import GraphQLJSON from 'graphql-type-json';

@ObjectType({simpleResolvers: true})
export class User {
  @Field({nullable: true})
  birthdate: string;
  @Field({nullable: true})
  country: string;
  @Field({nullable: true})
  email: string;
  @Field({nullable: true})
  product: string;
  @Field({nullable: true})
  display_name?: string;
  @Field(() => GraphQLJSON, {nullable: true})
  external_urls: any;
  @Field(() => GraphQLJSON, {nullable: true})
  followers?: any;
  @Field({nullable: true})
  href: string;
  @Field({nullable: true})
  id: string;
  @Field(() => [GraphQLJSON], {nullable: true})
  images?: any[];
  @Field(() => String, {nullable: true})
  type: any;
  @Field({nullable: true})
  uri: string;
}
