export interface CreateReviewUseCase {
  execute(input: CreateReviewInput): Promise<CreateReviewOutput>;
}

export type CreateReviewInput = {
  product_id: number;
  user: string;
  comment: string;
  rating: number;
  updated_at: string;
};

export type CreateReviewOutput = {
  success: boolean;
  id?: number;
};
