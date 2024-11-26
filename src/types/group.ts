import type { DateTime } from "luxon";
import { TransformToDateTime } from "src/util/serializers";

export class Group {
  public name: string;
  public id: string;
  @TransformToDateTime()
  public createdAt: DateTime;
  @TransformToDateTime()
  public updatedAt: DateTime;

  constructor(data: Group) {
    this.name = data.name;
    this.id = data.id;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}