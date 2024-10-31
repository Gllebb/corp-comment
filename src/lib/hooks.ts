import { useContext } from "react";
import { FeedbackItemsContext } from "../contexts/FeedbackItemsContextProvider";

export function useFeedbackItemsContext() {
  // custom hook to use the FeedbackItemsContext
  const context = useContext(FeedbackItemsContext);

  // check if context is null
  if (!context) {
    throw new Error(
      "useFeedbackItemsContext must be used within a FeedbackItemsContextProvider"
    );
  }

  // return context
  return context;
}
