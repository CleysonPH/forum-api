import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export class Entity<Props> {
  private _id: UniqueEntityID
  protected props: Props

  protected constructor(props: Props, id?: UniqueEntityID) {
    this._id = id ?? new UniqueEntityID()
    this.props = props
  }

  get id() {
    return this._id
  }
}
