import { UserRole } from "./UserRole.js";

export class User {
  constructor(
    public readonly id: string,
    public name: string,
    public username: string,
    public passwordHash: string,
    public role: UserRole,
    public readonly createdAt: Date
  ) {}

  static create(props: {
    id: string;
    name: string;
    username: string;
    passwordHash: string;
    role: UserRole;
  }) {
    return new User(
      props.id,
      props.name,
      props.username,
      props.passwordHash,
      props.role,
      new Date()
    );
  }
}
