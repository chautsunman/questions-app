import React from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const Question = (props) => {
  const {question} = props;
  
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography>
          {question.question}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Question;
