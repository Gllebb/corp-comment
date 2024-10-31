import { useMemo } from "react";
import { useFeedbackItemsnStore } from "../store/feedbackItemsStore";
import HashtagItem from "./HashtagItem";
import { Feedback } from "../../lib/types";

export default function HashtagList() {
  // const { companyList, handleSelectedCompany } = useFeedbackItemsContext();

  const feedbackItems = useFeedbackItemsnStore((state) => state.feedbackItems);
  const handleSelectedCompany = useFeedbackItemsnStore((state) => state.handleSelectCompany);

  const companyList = useMemo(() => {
    return feedbackItems
      .map((feedbackItem: Feedback) => feedbackItem.company)
      .filter((company: string, index: number, array: string[]) => array.indexOf(company) === index);
  }, [feedbackItems]);

  return (
    <ul className="hashtags">
      {companyList.map((company: string) => (
        <HashtagItem key={company} company={company} handleSelectedCompany={handleSelectedCompany}/>
      ))}
    </ul>
  );
}