import axios from 'axios'

const apiUrl =
	process.env.NODE_ENV === 'production'
		? process.env.REACT_APP_PROD_API_URL
		: process.env.REACT_APP_DEV_API_URL

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

export const register = async (username, email, password) => {
	try {
		const response = await axios.post(`${apiUrl}/auth/local/register`, {
			username,
			email,
			password,
		})
		return response
	} catch (error) {
		return error.response
	}
}
