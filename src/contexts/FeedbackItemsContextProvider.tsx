import { useMemo, useEffect, useState, createContext } from "react";
import { Feedback } from "../lib/types";

type TFeedbackItemsContext = {
  feedbacks: Feedback[];
  isLoading: boolean;
  error: string | null;
  companyList: string[];
  handleAddToList: (text: string) => void;
  filteredFeedbacks: Feedback[];
  handleSelectedCompany: (company: string) => void;
};

export const FeedbackItemsContext = createContext<TFeedbackItemsContext | null>(null);

export default function FeedbackItemsContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<string>("");

  const filteredFeedbacks = useMemo(() => {
    return selectedCompany
      ? feedbacks.filter((feedback) => feedback.company === selectedCompany)
      : feedbacks;
  }, [selectedCompany, feedbacks]);

  const handleSelectedCompany = (company: string) => {
    if (selectedCompany === company) {
      setSelectedCompany("");
    } else {
      setSelectedCompany(company);
    }
  };

  const companyList = useMemo(() => {
    return feedbacks
      .map((feedback) => feedback.company)
      .filter((company, index, array) => {
        return array.indexOf(company) === index;
      });
  }, [feedbacks]);

  const handleAddToList = async (text: string) => {
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

    setFeedbacks([...feedbacks, newItem]);

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
  };

  // new way of fetching data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const response = await fetch(
          "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks"
        );

        if (!response.ok) {
          throw new Error("An error occurred while fetching data");
        }

        const data = await response.json();
        setFeedbacks(data.feedbacks);
      } catch (error) {
        setError("Something went wrong while fetching data");
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // oldschool way of fetching data
  // useEffect(() => {
  //   setIsLoading(true);
  //   fetch(
  //     "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks"
  //   )
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setFeedbacks(data.feedbacks);
  //       setIsLoading(false);
  //     })
  //     .catch((error) => {
  //       setError('An error occurred while fetching data');
  //       setIsLoading(false);
  //     });
  // }, []);

  return (
    <FeedbackItemsContext.Provider
      value={{ feedbacks, isLoading, error, companyList, handleAddToList, filteredFeedbacks, handleSelectedCompany }}
    >
      {children}
    </FeedbackItemsContext.Provider>
  );
}
