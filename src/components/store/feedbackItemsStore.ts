import { create } from "zustand";
import { Feedback } from "../../lib/types";

type Store = {
    feedbackItems: Feedback[];
    isLoading: boolean;
    error: string;
    selectedCompany: string;
    handleAddtoList: (text: string) => void;
    handleSelectCompany: (company: string) => void;
    fetchFeedbackItems: () => void;
}

export const useFeedbackItemsnStore = create<Store>((set) => ({
  feedbackItems: [],
  isLoading: false,
  error: "",
  selectedCompany: "",
  handleAddtoList: async (text: string) => {
    const firstletter = text.split(" ")[0].charAt(0);
    const substring = text.split(" ").find((word) => word.includes("#"));

    const companyName = substring ? substring.slice(1) : "Unknown";

    const newItem: Feedback = {
      id: new Date().getTime(),
      upvoteCount: 0,
      badgeLetter: firstletter,
      company: companyName,
      text: text,
      daysAgo: 0,
    };

    // native state management
    // setFeedbacks([...feedbacks, newItem]);

    // zustand state management
    set((state) => ({ feedbackItems: [...state.feedbackItems, newItem] }));

    await fetch(
      "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newItem),
      }
    );
  },
  handleSelectCompany: (company: string) => {
    set((state) => ({
      selectedCompany: state.selectedCompany === company ? "" : company,
    }));
  },
  fetchFeedbackItems: async () => {
    set(() => ({ isLoading: true }));

    try {
      const response = await fetch(
        "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks"
      );

      if (!response.ok) {
        throw new Error("An error occurred while fetching data");
      }

      const data = await response.json();

      // native state management
      // setFeedbacks(data.feedbacks);

      // zustand state management
      set(() => ({
        feedbackItems: data.feedbacks,
      }));
    } catch (error) {
      // native state management
      // setError("Something went wrong while fetching data");

      // zustand state management
      set(() => ({ error: "Something went wrong while fetching data" }));

      set(() => ({ isLoading: false }));
    } finally {
      set(() => ({ isLoading: false }));
    }
  },
}));
