/* eslint-disable camelcase */
import projectFormActionTypes from 'store/actionsType/projectFormActionTypes'
const projectsFormToggleAction = (data) => {
	return {
		action: projectFormActionTypes.PROJECTS_FORM_TOGGLE,
		payload: data,
	}
}
const setProjectsFormDataAction = (id, name, description) => {
	return {
		action: projectFormActionTypes.PROJECTS_SET_FORM_DATA,
		payload: { id, name, description },
	}
}

const setAssetsFormDataAction = (
	id,
	identification,
	name,
	model,
	classType
) => {
	return {
		action: projectFormActionTypes.ASSETS_SET_FORM_DATA,
		payload: { id, identification, name, model, classType },
	}
}

const assetsFormToggleAction = (data) => {
	return {
		action: projectFormActionTypes.ASSETS_FORM_TOGGLE,
		payload: data,
	}
}

const setSafeguardsFormDataAction = (
	id,
	safeguardCode,
	safeguardName,
	safeguardType,
	threatList,
	safeguardDescription
) => {
	return {
		action: projectFormActionTypes.SAFEGUARDS_SET_FORM_DATA,
		payload: {
			id,
			safeguardCode,
			safeguardName,
			safeguardType,
			threatList,
			safeguardDescription,
		},
	}
}

const safeguardsFormToggleAction = (data) => {
	return {
		action: projectFormActionTypes.SAFEGUARDS_FORM_TOGGLE,
		payload: data,
	}
}

const setToggleSafeguardDataFormAction = (data) => {
	return {
		action: projectFormActionTypes.SAFEGUARDS_FORM_DATA_TOGGLE,
		payload: data,
	}
}

const uploadToggleAction = (data) => {
	return {
		action: projectFormActionTypes.UPLOAD_TOGGLE,
		payload: data,
	}
}

export {
	projectsFormToggleAction,
	setProjectsFormDataAction,
	assetsFormToggleAction,
	setAssetsFormDataAction,
	safeguardsFormToggleAction,
	setSafeguardsFormDataAction,
	uploadToggleAction,
	setToggleSafeguardDataFormAction,
}
