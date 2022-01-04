/* eslint-disable camelcase */
import axios from 'axios'
import { API_URL } from 'constants/url'

export const getSafeguards = async () => {
	try {
		const response = await axios.get(`${API_URL}/safeguards`)
		return response
	} catch (error) {
		return error.response
	}
}

export const saveSafeguards = async (
	safeguard_code,
	safeguard_name,
	safeguard_type,
	project,
	treath_list,
	safeguard_description
) => {
	try {
		const response = await axios.post(`${API_URL}/safeguards`, {
			safeguard_code,
			safeguard_name,
			safeguard_type,
			project,
			treath_list,
			safeguard_description,
		})
		return response
	} catch (error) {
		return error.response
	}
}

export const getSafeguardsCatalog = async () => {
	try {
		const response = await axios.get(`${API_URL}/catalog`)
		return response
	} catch (error) {
		return error.response
	}
}

export const deleteSafeguards = async (id) => {
	try {
		const response = await axios.delete(`${API_URL}/safeguards/${id}`)
		return response
	} catch (error) {
		return error.response
	}
}

export const updateSafeguards = async (
	id,
	safeguard_type,
	treath_list,
	safeguard_description,
	project
) => {
	try {
		const response = await axios.put(`${API_URL}/safeguards/${id}`, {
			safeguard_type,
			treath_list,
			safeguard_description,
			project,
		})
		return response
	} catch (error) {
		return error.response
	}
}

export const updateSafeguardsValue = async (
	id,
	effectiveness_against_impact,
	effectiveness_against_probability,
	total_effectiveness
) => {
	try {
		const response = await axios.put(`${API_URL}/safeguards/${id}`, {
			effectiveness_against_impact,
			effectiveness_against_probability,
			total_effectiveness,
		})
		return response
	} catch (error) {
		return error.response
	}
}

export const getSafeguardsWithThreatValue = async (id) => {
	try {
		const response = await axios.get(`${API_URL}/safeguards-threats/${id}`)
		return response
	} catch (error) {
		return error.response
	}
}

export const getSafeguardsWithThreatRiskValue = async (id) => {
	try {
		const response = await axios.get(`${API_URL}/safeguards-threats-risk/${id}`)
		return response
	} catch (error) {
		return error.response
	}
}
