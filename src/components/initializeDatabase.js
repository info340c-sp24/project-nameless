import { getDatabase, ref, set } from 'firebase/database';
import initialEvaluations from '../data/evaluations.json';
import initialQuestions from '../data/questions.json';

const initializeDatabase = () => {
  const database = getDatabase();

  const evaluationsRef = ref(database, 'evaluations');
  set(evaluationsRef, initialEvaluations);

  const questionsRef = ref(database, 'questions');
  set(questionsRef, initialQuestions);
};

export default initializeDatabase;