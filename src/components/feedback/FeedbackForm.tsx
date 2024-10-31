import { useState } from "react";
import { MAX_LENGTH } from "../../lib/constants";

export default function FeedbackFor({
  handleAddToList,
}: {
  handleAddToList: (text: string) => void;
}) {
  const [text, setText] = useState("");
  const charCount = MAX_LENGTH - text.length;
  const [showValidIndicator, setShowValidIndicator] = useState(false);
  const [showInvalidIndicator, setShowInvalidIndicator] = useState(false);

  const handelChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = event.target.value;
    if (newText.length > MAX_LENGTH) return;
    setText(newText);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (text.trim().length >= 5) {
      handleAddToList(text);
      setText("");

      setShowValidIndicator(true);
      setTimeout(() => {setShowValidIndicator(false)}, 2000);
    } else {
      setShowInvalidIndicator(true);
      setTimeout(() => {setShowInvalidIndicator(false)}, 2000);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`form ${showValidIndicator ? "form--valid" : ""} ${
        showInvalidIndicator ? "form--invalid" : ""
      }`}
    >
      <textarea
        value={text}
        onChange={(e) => handelChange(e)}
        maxLength={MAX_LENGTH}
        name=""
        id="feedback-textarea"
        placeholder="test"
        spellCheck={false}
      />
      <label htmlFor="feedback-textarea">
        Enter your feedback here, remember to #hashtag the company
      </label>
      <div className="">
        <p className="u-italic">{charCount}</p>
        <button>
          <span>Submit</span>
        </button>
      </div>
    </form>
  );
}
