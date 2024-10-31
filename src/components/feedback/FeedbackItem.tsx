import { TriangleUpIcon } from "@radix-ui/react-icons";
import { Feedback } from "../../lib/types";
import { useState } from "react";

type FeedbackItemProps = {
  feedbackItem: Feedback;
};

export default function FeedbackItem({ feedbackItem }: FeedbackItemProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [isUpvoteClicked, setIsUpvoteClicked] = useState<boolean>(false);

  const handleUpvoteClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setIsUpvoteClicked(true);
    e.stopPropagation();
  };

  return (
    <li
      className={`feedback ${open ? "feedback--expand" : ""}`}
      onClick={() => setOpen((prev) => !prev)}
    >
      <button onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => handleUpvoteClick(e)}>
        {!isUpvoteClicked && <TriangleUpIcon />}
        <span>
          {isUpvoteClicked
            ? feedbackItem.upvoteCount + 1
            : feedbackItem.upvoteCount}
        </span>
      </button>

      <div className="">
        <p>{feedbackItem.badgeLetter}</p>
      </div>

      <div className="">
        <p>{feedbackItem.company}.</p>
        <p>{feedbackItem.text}</p>
      </div>

      <p>{feedbackItem.daysAgo}d ago</p>
    </li>
  );
}
