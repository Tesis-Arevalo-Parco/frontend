import axios from 'axios'
import { API_URL } from 'constants/url'

export const login = async (identifier, password) => {
	try {
		const response = await axios.post(`${API_URL}/auth/local`, {
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
		const response = await axios.post(`${API_URL}/auth/local/register`, {
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
