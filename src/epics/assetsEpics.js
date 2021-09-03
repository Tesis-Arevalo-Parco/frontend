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

export const saveAssets = async (
	identification,
	name,
	model,
	project,
	classType
) => {
	try {
		const response = await axios.post(`${API_URL}/assets`, {
			identification,
			name,
			model,
			project,
			classType,
		})
		return response
	} catch (error) {
		return error.response
	}
}

export const updateAssets = async (
	id,
	identification,
	name,
	model,
	project,
	classType
) => {
	try {
		const response = await axios.put(`${API_URL}/assets/${id}`, {
			identification,
			name,
			model,
			project,
			classType,
		})
		return response
	} catch (error) {
		return error.response
	}
}

export const deleteAssets = async (id) => {
	try {
		const response = await axios.delete(`${API_URL}/assets/${id}`)
		return response
	} catch (error) {
		return error.response
	}
}

export const getAssetsCatalog = async () => {
	try {
		const response = await axios.get(`${API_URL}/catalog`)
		return response
	} catch (error) {
		return error.response
	}
}

export const updateAssetsValue = async (
	id,
	availability,
	integrity,
	confidentiality,
	authenticity,
	traceability
) => {
	try {
		let response
		if (availability) {
			response = await axios.put(`${API_URL}/assets/${id}`, {
				availability,
			})
		} else if (integrity) {
			response = await axios.put(`${API_URL}/assets/${id}`, {
				integrity,
			})
		} else if (confidentiality) {
			response = await axios.put(`${API_URL}/assets/${id}`, {
				confidentiality,
			})
		} else if (authenticity) {
			response = await axios.put(`${API_URL}/assets/${id}`, {
				authenticity,
			})
		} else if (traceability) {
			response = await axios.put(`${API_URL}/assets/${id}`, {
				traceability,
			})
		}
		return response
	} catch (error) {
		return error.response
	}
}
