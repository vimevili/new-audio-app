from flask_restx import Resource
from http import HTTPStatus
from src.namespaces.audio_namespace import audio_namespace
from src.controllers.audio_app.schemas import (
    audio_app_reviews_get_parser,
    audio_app_reviews_post_parser,
    audio_app_reviews_put_parser,
    audio_app_reviews_response
)
from src.repositories import ReviewsRepository

@audio_namespace.route('/reviews')
class GetReviews(Resource):

    @audio_namespace.expect(audio_app_reviews_get_parser)
    @audio_namespace.marshal_with(audio_app_reviews_response)
    @audio_namespace.response(200, 'Success')
    def get(self):
        ''' Get all reviews '''
        args = audio_app_reviews_get_parser.parse_args()
        reviews = ReviewsRepository.get_reviews(args)

        response = [{
            'id': review.id,
            'product_id': review.product_id,
            'user': review.user,
            'comment': review.comment,
            'rating': review.rating,
            'created_at': review.created_at,
            'updated_at': review.updated_at,
        } for review in reviews]

        return response, HTTPStatus.OK

    @audio_namespace.expect(audio_app_reviews_post_parser)
    @audio_namespace.marshal_with(audio_app_reviews_response)
    @audio_namespace.response(201, 'Created')
    def post(self):
        ''' Create a new review '''
        args = audio_app_reviews_post_parser.parse_args()
        review = ReviewsRepository.create_review(args)
        return review, HTTPStatus.CREATED

@audio_namespace.route('/reviews/<int:id>/update')
class UpdateReview(Resource):

    @audio_namespace.expect(audio_app_reviews_put_parser)
    @audio_namespace.marshal_with(audio_app_reviews_response)
    @audio_namespace.response(200, 'Success')
    @audio_namespace.response(404, 'Review not found')
    def put(self, id):
        '''Update a review'''
        args = audio_app_reviews_put_parser.parse_args()
        
        try:
            review = ReviewsRepository.update_review(id, args)
            return review, HTTPStatus.OK
        except ValueError as e:
            audio_namespace.abort(404, str(e))

@audio_namespace.route('/reviews/<int:id>/delete')
class DeleteReview(Resource):

    @audio_namespace.response(200, 'Success')
    @audio_namespace.response(404, 'Review not found')
    def delete(self, id):
        '''Delete a review'''
        if not ReviewsRepository.delete_review(id):
            audio_namespace.abort(404, "Review not found")
        return {'message': 'Review deleted successfully'}, HTTPStatus.OK
