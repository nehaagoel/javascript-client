import axios from 'axios';

export default async function callApi(method, url, data, option = {}) {
  try {
    const mainUrl = process.env.REACT_APP_BASE_URL + url;
    console.log('main url is', mainUrl);
    console.log('data is', data);
    const response = await axios({
      method: method,
      url: mainUrl,
      ...data,
      ...option,
    });
    return response.data;
  } catch (err) {
    console.log(err);
    return err;
  }
}
