import axios from 'axios'

const URL = process.env.REACT_APP_BACKEND_URL

export const login = async (identifier, password) => {
	try {
		const response = await axios.post(`${URL}/auth/local`, {
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
		const response = await axios.post(`${URL}/auth/local/register`, {
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
