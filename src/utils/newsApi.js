const BASE_URL = 'http://testtask.sebbia.com/v1/news/';

async function newsAPI(path) {
  const response = await fetch(`${BASE_URL}${path}`);
  let bodyResponse = await response.json();
  if (response.ok && bodyResponse.code === 0) {
    return bodyResponse;
  }
  throw new Error( 'Ошибка!');
}

export default newsAPI;