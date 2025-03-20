export interface DeleteReviewUseCase {
  execute(input: DeleteReviewInput): Promise<DeleteReviewOutput>;
}

export type DeleteReviewInput = { id: number };
export type DeleteReviewOutput = { success: boolean };
