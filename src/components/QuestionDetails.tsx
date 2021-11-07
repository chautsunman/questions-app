import { useCallback, useRef } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { styled } from '@mui/material/styles';

import Question from '../data/Question';

const UploadPhotoInput = styled('input')({
  display: 'none',
});

type QuestionDetailsProps = {
  question: Question;
  setQuestion: (newQuestion: Question) => void;
  setUploadPhotos: (photos: FileList) => void;
  onSave: () => Promise<void>;
};

const QuestionDetails = (props: QuestionDetailsProps) => {
  const {question, setQuestion, onSave} = props;

  const uploadPhotoRef = useRef<HTMLInputElement>(null);

  const onQuestionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newQuestion = question.clone();
    newQuestion.question = event.target.value;
    setQuestion(newQuestion);
  };

  const onDetailsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newQuestion = question.clone();
    newQuestion.details = event.target.value;
    setQuestion(newQuestion);
  };

  const onUploadPhotos = useCallback(() => {
    if (!uploadPhotoRef.current) {
      return;
    }
    const photos = uploadPhotoRef.current.files;
    if (!photos) {
      return;
    }
    console.log(`selected ${photos.length} photos`);
    props.setUploadPhotos(photos);
  }, [uploadPhotoRef, props.setUploadPhotos]);

  return (
    <div>
      <Typography variant="h4" gutterBottom>{question.question}</Typography>

      <TextField
        label="Question"
        value={question.question}
        onChange={onQuestionChange}
        fullWidth
      />

      <TextField
        label="Details"
        value={question.details}
        onChange={onDetailsChange}
        fullWidth
      />

      <label htmlFor="upload-photos">
        <UploadPhotoInput
          accept="image/*"
          id="upload-photos"
          multiple
          type="file"
          ref={uploadPhotoRef}
          onChange={onUploadPhotos}/>
        <UploadPhotoInput accept="image/*" id="upload-photos" multiple type="file"/>
        <Button variant="contained" component="span" color="secondary">
          Upload Photos
        </Button>
      </label>

      <Button variant="contained" color="secondary" onClick={onSave}>
        Save
      </Button>
    </div>
  );
};

export default QuestionDetails;
