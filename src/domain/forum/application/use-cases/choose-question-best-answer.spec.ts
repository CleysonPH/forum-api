import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { ChooseQuestionBestAnswerCase } from './choose-question-best-answer'
import { makeQuestion } from 'test/factories/make-question'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeAnswer } from 'test/factories/make-answer'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: ChooseQuestionBestAnswerCase

describe('Choose Question Best Answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new ChooseQuestionBestAnswerCase(
      inMemoryAnswersRepository,
      inMemoryQuestionsRepository,
    )
  })

  it('should be able to choose the question best answer', async () => {
    await inMemoryQuestionsRepository.create(
      makeQuestion(
        { authorId: new UniqueEntityID('1') },
        new UniqueEntityID('1'),
      ),
    )

    await inMemoryAnswersRepository.create(
      makeAnswer(
        { questionId: new UniqueEntityID('1') },
        new UniqueEntityID('1'),
      ),
    )

    await sut.execute({ answerId: '1', authorId: '1' })

    expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
      bestAnswerId: new UniqueEntityID('1'),
    })
  })

  it('should not be able to choose the question best answer from another author', async () => {
    await inMemoryQuestionsRepository.create(
      makeQuestion(
        { authorId: new UniqueEntityID('1') },
        new UniqueEntityID('1'),
      ),
    )

    await inMemoryAnswersRepository.create(
      makeAnswer(
        { questionId: new UniqueEntityID('1') },
        new UniqueEntityID('1'),
      ),
    )

    await expect(
      sut.execute({ answerId: '1', authorId: 'wrong-author-id' }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should not be able to choose the question best answer with wrong answer id', async () => {
    await expect(
      sut.execute({ answerId: 'wrong-answer-id', authorId: '1' }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should not be able to choose the question best answer with wrong question id', async () => {
    await inMemoryAnswersRepository.create(
      makeAnswer(
        { questionId: new UniqueEntityID('wrong-question-id') },
        new UniqueEntityID('1'),
      ),
    )

    await expect(
      sut.execute({ answerId: '1', authorId: '1' }),
    ).rejects.toBeInstanceOf(Error)
  })
})
