import React, {useState, useEffect} from 'react';

import Question from './Question';

import {getQuestions} from './questionsApi';

const Questions = (props) => {
  const [questions, setQuestions] = useState([]);
  
  useEffect(() => {
    getQuestions()
        .then(res => {
          console.log('get questions successful');
          setQuestions(res);
        });
  }, []);
  
  return (
    <div>
      {questions.map(question => <Question key={question.id} question={question} />)}
    </div>
  );
};

export default Questions;
