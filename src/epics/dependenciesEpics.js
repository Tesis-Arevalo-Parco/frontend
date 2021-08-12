import axios from 'axios'
import { API_URL } from 'constants/url'

export const getDependency = async (id) => {
	try {
		const response = await axios.get(`${API_URL}/dependencies/${id}`)
		return response
	} catch (error) {
		return error.response
	}
}

export const saveDependencies = async (dependencies, project) => {
	try {
		const response = await axios.post(`${API_URL}/dependencies`, {
			dependencies,
			project,
		})
		return response
	} catch (error) {
		return error.response
	}
}

export const updateDependencies = async (id, dependencies, project) => {
	try {
		const response = await axios.put(`${API_URL}/dependencies/${id}`, {
			dependencies,
			project,
		})
		return response
	} catch (error) {
		return error.response
	}
}

export const deleteDependencies = async (id) => {
	try {
		const response = await axios.delete(`${API_URL}/dependencies/${id}`)
		return response
	} catch (error) {
		return error.response
	}
}
