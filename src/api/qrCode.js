import { API_HOST } from "../config/config";

const BASE_URL = API_HOST;

export async function fetchHistoricalPlace(qrCode) {
  const response = await fetch(`${BASE_URL}/histPlaces/${qrCode}`);
  const data = await response.json();
  return data;
}

// import axios from 'axios'
// // import { API_HOST } from '../config/config'

// axios.defaults.baseURL = 'http://127.0.0.1:3000'


// export const etchHistoricalPlace = (qrCode) => {
// 	const requestUrl = '/histPlaces/' + qrCode

// 	return axios({
// 		method: 'get',
// 		data: { 
// 			qrCode
// 		},
// 		url: requestUrl,
// 	})
// }
