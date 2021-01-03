import firebase from 'firebase';

const getIdToken = async () => {
  try {
    const idToken = await firebase.auth().currentUser?.getIdToken(false);
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

  return fetch(`${apiPath}?${urlParams.toString()}`, {
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

  return fetch(apiPath, {
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
