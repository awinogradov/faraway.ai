import {
  Entity,
  ObjectIdColumn,
  Column,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ObjectType, Field, ID, InputType } from 'type-graphql';
import { Length, IsNotEmpty, IsEmail } from 'class-validator';
import bcrypt from 'bcrypt';

@Entity()
@ObjectType()
@Unique(['email'])
export class User {
  static roles = ['ADMIN'];
  static saltRound = 10;

  @Field(() => ID)
  @ObjectIdColumn()
  id: string;

  @Field()
  @Column()
  @IsEmail()
  email: string;

  @Field()
  @Column()
  @Length(4, 100)
  password: string;

  @Field()
  @Column()
  @IsNotEmpty()
  role: string;

  @Field()
  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  hashPassword() {
    this.password = bcrypt.hashSync(this.password, User.saltRound);
  }

  checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
    return bcrypt.compareSync(unencryptedPassword, this.password);
  }
}

@InputType()
export class UserAuthInput {
  @Field()
  email: string;

  @Field()
  password: string;
}

export interface UserAuthAnswer {
  token: string;
}
