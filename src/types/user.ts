import { Group } from "./group";

export class ApplicationUser {
  email: string;
  name: string;
  group?: Group;

  constructor(data: ApplicationUser) {
    this.email = data.email;
    this.name = data.name;
    this.group = data.group ? new Group(data.group) : undefined;
  }
}