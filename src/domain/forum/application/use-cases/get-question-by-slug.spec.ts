import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { GetQuestionBySlugUseCase } from './get-question-by-slug'
import { Question } from '../../enterprise/entities/question'
import { Slug } from '../../enterprise/entities/value-objects/slug'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: GetQuestionBySlugUseCase

describe('Get Question By Slug Use Case', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to get a question', async () => {
    const newQuestion = Question.create({
      title: 'Example question',
      slug: Slug.create('example-question'),
      authorId: new UniqueEntityID('1'),
      content: 'Example content',
    })

    await inMemoryQuestionsRepository.create(newQuestion)

    const { question } = await sut.execute({
      slug: 'example-question',
    })

    expect(question.id).toBe(newQuestion.id)
    expect(question.title).toBe(newQuestion.title)
    expect(question.slug).toBe(newQuestion.slug)
    expect(question.authorId).toBe(newQuestion.authorId)
    expect(question.content).toBe(newQuestion.content)
  })

  it('should be able to get a question with wrong slug', async () => {
    await expect(
      sut.execute({
        slug: 'example-question',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
