import { getAuth } from "firebase/auth";

const questionsServer = process.env.REACT_APP_QUESTIONS_SERVER;
console.log('questionsServer', questionsServer);

const getApiPath = (apiPath: string): string => {
  return `${questionsServer}${apiPath}`;
};

const getIdToken = async () => {
  try {
    const auth = getAuth();
    const idToken = await auth.currentUser?.getIdToken(false);
    return idToken;
  } catch (err) {
    console.log('Cannot get ID token');
    return null;
  }
};

const getApi = async (apiPath: string, urlParams: URLSearchParams, options: object) => {
  const idToken = await getIdToken();
  if (!idToken) {
    throw new Error('Unauthrorized');
  }

  return fetch(`${getApiPath(apiPath)}?${urlParams.toString()}`, {
    ...options,
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${idToken}`
    }
  })
};

const postApi = async (apiPath: string, data: object, options: object) => {
  const idToken = await getIdToken();
  if (!idToken) {
    throw new Error('Unauthrorized');
  }

  return fetch(getApiPath(apiPath), {
    ...options,
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Authorization': `Bearer ${idToken}`,
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data)
  });
};

export {getApi, postApi};
