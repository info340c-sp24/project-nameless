import { getDatabase, ref, set } from 'firebase/database';
import initialEvaluations from '../data/evaluations.json';
import initialQuestions from '../data/questions.json';
import courseData from '../data/coursecards.json';

const initializeDatabase = () => {
  const database = getDatabase();

  const evaluationsRef = ref(database, 'evaluations');
  set(evaluationsRef, initialEvaluations);

  const questionsRef = ref(database, 'questions');
  set(questionsRef, initialQuestions);

  const coursecardsRef = ref(database, 'coursecards');
  set(coursecardsRef, courseData);
};

export default initializeDatabase;