import axios from 'axios'
import { API_HOST } from '../config/config'

axios.defaults.baseURL = API_HOST

export const getHistPlaceRating = (histPlaceId) => {

	const requestUrl = `/histPlaces/${histPlaceId}/rating`

	return axios({
		method: 'get',
		url: requestUrl,
	})
}

export const rateHistPlace = (histPlaceId, rating) => {
    const requestUrl = `/histPlaces/${histPlaceId}/rating`

	return axios({
		method: 'post',
		data: {rating},
		url: requestUrl,
	})
}
