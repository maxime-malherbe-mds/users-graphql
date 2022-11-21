import { ObjectType, Field, Int, ID } from '@nestjs/graphql';

type UserProperties = Required<User>;
export enum State {
  ACTIVE = 'ACTIVE',
  DEACTIVATED = 'DEACTIVATED',
}

@ObjectType({ description: 'user ' })
export class User {
  @Field((type) => ID)
  public id: number;

  @Field()
  public login?: string;
  @Field()
  public email?: string;
  @Field()
  public firstName?: string;
  @Field()
  public lastName?: string;
  @Field()
  public password?: string;
  @Field()
  public state: State;
  @Field((type) => Date)
  public createdAt: Date = new Date();
  @Field((type) => Date)
  public updatedAt: Date = new Date();

  public static fromProperties(value: UserProperties): User {
    const user = new User();
    user.id = value.id;
    user.login = value.login;
    user.email = value.email;
    user.firstName = value.firstName;
    user.lastName = value.lastName;
    user.state = value.state;
    user.createdAt = value.createdAt;
    user.updatedAt = value.updatedAt;
    return user;
  }
}
