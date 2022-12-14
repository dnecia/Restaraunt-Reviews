import React from 'react';
import { useParams } from 'react-router-dom';

import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';

import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { QUERY_REVIEW } from '../utils/queries';

const SingleReview = (props) => {
  const { id: reviewId } = useParams();

  const { loading, data } = useQuery(QUERY_REVIEW, {
    variables: { id: reviewId },
  });

  const review = data?.review || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="card mb-3">
        <p className="card-header">
          <span style={{ fontWeight: 700 }} className="text-light">
            {review.username}
          </span>{' '}
          review on {review.createdAt}
        </p>
        <div className="card-body">
          <p>{review.reviewText}</p>
        </div>
      </div>

      {review.commentCount > 0 && (
        <CommentList comments={review.comments} />
      )}

      {Auth.loggedIn() && <CommentForm reviewId={review._id} />}
    </div>
  );
};

export default SingleReview;
