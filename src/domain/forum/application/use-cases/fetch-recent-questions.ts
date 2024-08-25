import { Question } from '../../enterprise/entities/question'
import { QuestionsRepository } from '../repositories/questions-repository'

interface FetchRecentQuestionsUseCaseInput {
  page: number
}

interface FetchRecentQuestionsUseCaseOutput {
  questions: Question[]
}

export class FetchRecentQuestionsUseCase {
  constructor(private readonly questionsRepository: QuestionsRepository) {}

  async execute({
    page,
  }: FetchRecentQuestionsUseCaseInput): Promise<FetchRecentQuestionsUseCaseOutput> {
    const questions = await this.questionsRepository.findManyRecent({ page })

    return { questions }
  }
}
