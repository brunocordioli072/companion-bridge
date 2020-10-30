import {ObjectType, Field} from 'type-graphql';

@ObjectType({description: 'Credentials model', simpleResolvers: true})
export class Credentials {
  @Field({nullable: true})
  accessToken?: string;
  @Field({nullable: true})
  clientId?: string;
  @Field({nullable: true})
  clientSecret?: string;
  @Field({nullable: true})
  redirectUri?: string;
  @Field({nullable: true})
  refreshToken?: string;
}
