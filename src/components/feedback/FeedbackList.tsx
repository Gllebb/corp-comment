import FeedbackItem from "./FeedbackItem";
import Spinner from "../Spinner";
import { useFeedbackItemsnStore } from "../store/feedbackItemsStore";
import { useMemo } from "react";


export default function FeedbackList() {
  // const { isLoading, error, filteredFeedbacks } = useFeedbackItemsContext();
  
  const isLoading = useFeedbackItemsnStore((state) => state.isLoading);
  const error = useFeedbackItemsnStore((state) => state.error);
  const feedbackItems = useFeedbackItemsnStore((state) => state.feedbackItems);
  const selectedCompany = useFeedbackItemsnStore((state) => state.selectedCompany);

  const filteredFeedbacks = useMemo(() => {
    return selectedCompany
      ? feedbackItems.filter((feedbackItem) => feedbackItem.company === selectedCompany)
      : feedbackItems;
  }, [feedbackItems, selectedCompany]);

  return (
    <ol className="feedback-list">
      {isLoading && <Spinner />}

      {error && <p className="error">An error occurred: {error}</p>}

      {!isLoading &&
        filteredFeedbacks.map((feedback) => {
          return <FeedbackItem key={feedback.id} feedbackItem={feedback} />;
        })}
    </ol>
  );
}
