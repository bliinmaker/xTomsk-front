import axios from 'axios'
import { API_HOST } from '../config/config';

axios.defaults.baseURL = API_HOST

export const getHistPlaces = ({ title, area }) => {
	let params = new URLSearchParams();

	area && params.set('area', area)
	title && params.set('title', title)

	// console.log(params.toString())

	///excursions?theme=мкакая-то теа&date=2023-05-31&title=имя

	// const requestUrl = '/excursions' + '?theme=' + theme + '&title=' + title;

	const requestUrl = `/histPlaces?${params.toString()}`

	return axios({
		method: 'get',
		url: requestUrl,
	})
}

export const getHistPlace = id => {
	const requestUrl = '/histPlaces/' + id

	return axios({
		method: 'get',
		url: requestUrl,
	})
}
