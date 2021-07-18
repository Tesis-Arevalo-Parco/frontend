import axios from 'axios'
import { API_URL } from 'constants/url'
import { getUserData } from 'utils/localStorageUtils'

export const getProjects = async () => {
	try {
		const response = await axios.get(`${API_URL}/projects`)
		return response
	} catch (error) {
		return error.response
	}
}

export const saveProjects = async (name, description) => {
	const user = getUserData()
	try {
		const response = await axios.post(`${API_URL}/projects`, {
			name,
			description,
			user: user.id,
		})
		return response
	} catch (error) {
		return error.response
	}
}

export const deleteProject = async (id) => {
	try {
		const response = await axios.delete(`${API_URL}/projects/${id}`)
		return response
	} catch (error) {
		return error.response
	}
}

export const updateProject = async (id, name, description) => {
	try {
		const response = await axios.put(`${API_URL}/projects/${id}`, {
			name,
			description,
		})
		return response
	} catch (error) {
		return error.response
	}
}

export const getProjectById = async (id) => {
	try {
		const response = await axios.get(`${API_URL}/projects/${id}`)
		return response
	} catch (error) {
		return error.response
	}
}
