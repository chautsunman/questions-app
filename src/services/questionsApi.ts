import { getStorage, ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';

import Question from '../data/Question';

import {getApi, postApi} from './api';
import {ApiResult} from './ApiResult';

const apiPath = '/api/questions';
const getPhotosRootRef = () => {
  const storage = getStorage();
  return ref(storage, 'photos');
};

export const getQuestions = async (groupId: string, id: string | null): Promise<Question[]> => {
  console.log('get questions');

  try {
    const urlParams = new URLSearchParams();
    urlParams.append('groupId', groupId);
    if (id) {
      urlParams.append('id', id);
    }
    const res = await getApi(`${apiPath}/questions`, urlParams, {});
    const {success, data} = (await res.json()) as ApiResult<Question[]>;

    if (!success) {
      throw new Error('get questions api successful, but not success');
    }

    console.log('get questions successful');
    return data.map((questionObj) => Object.assign(new Question(), {...questionObj}));
  } catch (err) {
    console.log('get questions error', err);
    return [];
  }
};

export const getQuestion = async (groupId: string, id: string): Promise<Question | null> => {
  console.log('get question', groupId, id);
  const questions = await getQuestions(groupId, id);
  return (questions.length) ? questions[0] : null;
};

const uploadPhotos = async (id: string, photos: FileList | null) => {
  if (!id || !photos) {
    return true;
  }
  try {
    const folderRef = ref(getPhotosRootRef(), id);
    for (let i = 0; i < photos.length; i++) {
      const photoRef = ref(folderRef, uuidv4());
      const photo = photos[i];
      const snapshot = await uploadBytes(photoRef, photo);
      console.log(`uploaded photo ${i}`);
    }
  } catch (err) {
    console.log('upload photos error', err);
    return false;
  }
  console.log('uploaded all photos');
  return true;
};

export const addQuestion = async (questionGroupId: string, question: Question, photos: FileList | null): Promise<string | null> => {
  console.log('add question');

  const formData = {
    groupId: questionGroupId,
    question: question
  };

  try {
    const res = await postApi(`${apiPath}/addQuestion`, formData, {});
    const {success, data} = (await res.json()) as ApiResult<string | null>;
    if (!success || data === null) {
      throw new Error('add question api successful, but not added');
    }

    const uploadPhotosSuccess = await uploadPhotos(data, photos);
    if (!uploadPhotosSuccess) {
      throw new Error('upload photos error');
    }

    console.log('add question successful');
    return data;
  } catch (err) {
    console.log('add question error', err);
    return null;
  }
};

export const updateQuestion = async (questionGroupId: string, question: Question, photos: FileList | null): Promise<string | null> => {
  console.log('update question');

  const formData = {
    groupId: questionGroupId,
    question: question
  };

  try {
    const res = await postApi(`${apiPath}/updateQuestion`, formData, {});
    const {success, data} = (await res.json()) as ApiResult<string | null>;
    if (!success || data === null) {
      throw new Error('update question api successful, but not added');
    }

    const uploadPhotosSuccess = await uploadPhotos(data, photos);
    if (!uploadPhotosSuccess) {
      throw new Error('upload photos error');
    }

    console.log('update question successful');
    return data;
  } catch (err) {
    console.log('update question error', err);
    return null;
  }
};

export const getRandomQuestion = async (groupId: string): Promise<Question | null> => {
  console.log('get random question');

  try {
    const urlParams = new URLSearchParams();
    urlParams.append('groupId', groupId);
    const res = await getApi(`${apiPath}/getRandomQuestion`, urlParams, {});
    const {success, data} = (await res.json()) as ApiResult<Question>;

    if (!success || data == null) {
      throw new Error('get random question api successful, but not success');
    }

    console.log('get random question successful');
    return data;
  } catch (err) {
    console.log('get random question error', err);
    return null;
  }
};

export const getPhotoUrls = async (id: string) => {
  let urls: string[] = [];
  try {
    const photosRootRef = getPhotosRootRef();
    const photosRef = ref(photosRootRef, id);
    const listRes = await listAll(photosRef);
    const photoNames = listRes.items.map((itemRef) => itemRef.name);
    const getDownloadUrlPromises = photoNames.map((photoName) => getDownloadURL(ref(photosRef, photoName)));
    const getDownloadUrlAllPromise = Promise.all(getDownloadUrlPromises);
    urls = await getDownloadUrlAllPromise;
  } catch (err) {
    console.log('get photo urls error', err);
  }
  return urls;
};
