import axios from 'axios'
import { API_HOST } from '../config/config'

axios.defaults.baseURL = API_HOST


export const createComment = (histPlaceId, { nickName, message, image }) => {
	const requestUrl = '/comments/' + histPlaceId

	return axios({
		method: 'post',
		data: { 
			nickName,
			message,
			image,
		},
		url: requestUrl,
	})
}
