export interface UpdateReviewUseCase {
  execute(input: UpdateReviewInput): Promise<UpdateReviewOutput>;
}

export type UpdateReviewInput = {
  id: number;
  product_id: number;
  user: string;
  comment: string;
  rating: number;
  updated_at: string;
};

export type UpdateReviewOutput = {
  success: boolean;
};
