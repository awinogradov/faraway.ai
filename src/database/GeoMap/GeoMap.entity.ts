import { Entity, Column, ObjectIdColumn } from 'typeorm';
import { InputType, ObjectType, Field, ID } from 'type-graphql';

@Entity()
@ObjectType()
export class GeoMap {
  @Field(() => ID)
  @ObjectIdColumn()
  id: string;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column('text')
  description: string;
}

@InputType()
export class GeoMapInput {
  @Field()
  title: string;

  @Field()
  description: string;
}
