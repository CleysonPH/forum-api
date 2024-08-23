import { randomUUID } from "node:crypto"
import { UniqueEntityID } from "../../domain/entities/value-objects/unique-entity-id"

export class Entity<Props> {
  private _id: UniqueEntityID
  protected props: Props

  constructor(props: Props, id?: UniqueEntityID) {
    this._id = new UniqueEntityID()
    this.props = props
  }

  get id() {
    return this._id
  }
}