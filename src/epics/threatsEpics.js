import axios from 'axios'
import { API_URL } from 'constants/url'

export const updateThreatVulnerability = async (id, vulnerabilities) => {
	try {
		const response = await axios.put(`${API_URL}/threats/${id}`, {
			vulnerabilities,
		})
		return response
	} catch (error) {
		return error.response
	}
}

export const updateThreatValue = async (id, data) => {
	try {
		const response = await axios.put(`${API_URL}/threats/${id}`, data)
		return response
	} catch (error) {
		return error.response
	}
}
