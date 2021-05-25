import axios from 'axios'
import { apiUrl } from 'utils/apiUrlUtils'

export const login = async (identifier, password) => {
	try {
		const response = await axios.post(`${apiUrl}/auth/local`, {
			identifier,
			password,
		})
		return response
	} catch (error) {
		return error.response
	}
}

export const register = async (name, lastname, email, password) => {
	try {
		const response = await axios.post(`${apiUrl}/auth/local/register`, {
			username: email,
			name,
			lastname,
			email,
			password,
		})
		return response
	} catch (error) {
		return error.response
	}
}
