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

export const forgotPassword = async (email) => {
	try {
		const response = await axios.post(`${API_URL}/auth/forgot-password`, {
			email: email,
		})
		return response
	} catch (error) {
		return error.response
	}
}

export const resetPassword = async (code, password) => {
	try {
		const response = await axios.post(`${API_URL}/auth/reset-password`, {
			code: code, // code contained in the reset link of step 3.
			password: password,
			passwordConfirmation: password,
		})
		return response
	} catch (error) {
		return error.response
	}
}
