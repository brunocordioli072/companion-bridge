import {Field, ObjectType} from 'type-graphql';

@ObjectType({simpleResolvers: true})
export class Image {
  @Field({nullable: true})
  height?: number;
  @Field({nullable: true})
  url: string;
  @Field({nullable: true})
  width?: number;
}
