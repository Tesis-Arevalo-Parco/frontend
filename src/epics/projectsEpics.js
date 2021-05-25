import axios from 'axios'
import { apiUrl } from 'utils/apiUrlUtils'
import { getUserData } from 'utils/localStorageUtils'

export const getProjects = async () => {
	try {
		const response = await axios.get(`${apiUrl}/projects`)
		return response
	} catch (error) {
		return error.response
	}
}

export const saveProjects = async (name, description) => {
	const user = getUserData()
	try {
		const response = await axios.post(`${apiUrl}/projects`, {
			name,
			description,
			user: user.id,
		})
		return response
	} catch (error) {
		return error.response
	}
}
