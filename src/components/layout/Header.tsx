import Pattern from '../Pattern'
import Logo from '../Logo'
import PageHeading from '../PageHeading'
import FeedbackForm from '../feedback/FeedbackForm'
import { useFeedbackItemsnStore } from '../store/feedbackItemsStore';

export default function Header() {
  // const { handleAddToList } = useFeedbackItemsContext();

  const addItemToList = useFeedbackItemsnStore(state => state.handleAddtoList);

  return (
    <header>
      <Pattern />
      <Logo />
      <PageHeading />
      <FeedbackForm handleAddToList={addItemToList}/>
    </header>
  )
}
