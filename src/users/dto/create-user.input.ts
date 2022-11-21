import { InputType, Int, Field } from '@nestjs/graphql';
import { IsOptional, Length, MaxLength } from 'class-validator'; 

@InputType()
export class CreateUserInput {
  @Field()
  @MaxLength(80)
  login: string;
  @Field()
  @MaxLength(80)
  email: string;
  @Field()
  @MaxLength(50)
  firstName: string;
  @Field()
  @MaxLength(50)
  lastName: string;
  @Field()
  password: string;

  constructor(
    login: string,
    email: string,
    firstName: string,
    lastName: string,
    password: string,
  ) {
    this.login = login;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.password = password;
  }

}
