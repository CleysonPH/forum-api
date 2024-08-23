import { Entity } from "../../core/entities/entity"
import { UniqueEntityID } from "./value-objects/unique-entity-id"

interface AnswerProps {
  content: string
  authorId: UniqueEntityID
  questionId: UniqueEntityID
  createdAt: Date
  updatedAt?: Date
}

export class Answer extends Entity<AnswerProps> {
  get content() {
    return this.props.content
  }
}