import axios from 'axios'
import { apiUrl } from 'utils/apiUrlUtils'

export const getAssets = async () => {
	try {
		const response = await axios.get(`${apiUrl}/assets`)
		return response
	} catch (error) {
		return error.response
	}
}
