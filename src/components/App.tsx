import Footer from "./layout/Footer";
import Container from "./layout/Container";
import HashtagList from "./hashtags/HashtagList";
import { useFeedbackItemsnStore } from "./store/feedbackItemsStore";
import { useEffect } from "react";

function App() {
  const fetchFeedbackItems = useFeedbackItemsnStore(
    (state) => state.fetchFeedbackItems
  );

  useEffect(() => {
    fetchFeedbackItems();
  }, [fetchFeedbackItems]);

  return (
    <>
      <div className="app">
        <Footer />

        <Container />

        <HashtagList />
      </div>
    </>
  );
}

export default App;
