import { useContext } from 'react';
import { QuestionContextProps, QuestionsContext } from '../QuestionsProvider';

const useQuestions = () => useContext<QuestionContextProps>(QuestionsContext);

export default useQuestions;
