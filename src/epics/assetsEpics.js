import axios from 'axios'
import { API_URL } from 'constants/url'

export const getAssets = async () => {
	try {
		const response = await axios.get(`${API_URL}/assets`)
		return response
	} catch (error) {
		return error.response
	}
}
