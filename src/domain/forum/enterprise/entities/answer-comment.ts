import { Entity } from '@/core/entities/entity'
import { Optional } from '@/core/types/optional'
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id'

export interface AnswerCommentProps {
  content: string
  authorId: UniqueEntityID
  answerId: UniqueEntityID
  createdAt: Date
  updatedAt?: Date
}

export class AnswerComment extends Entity<AnswerCommentProps> {
  static create(
    props: Optional<AnswerCommentProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const answercomment = new AnswerComment(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return answercomment
  }

  get content() {
    return this.props.content
  }

  get authorId() {
    return this.props.authorId
  }

  get answerId() {
    return this.props.answerId
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  get excerpt() {
    return this.content.substring(0, 120).trimEnd().concat('...')
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  set content(content: string) {
    this.props.content = content
    this.touch()
  }
}
