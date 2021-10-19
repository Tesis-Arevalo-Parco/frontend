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
	safeguard_code,
	safeguard_name,
	safeguard_type,
	treath_list,
	safeguard_description
) => {
	return {
		action: projectFormActionTypes.SAFEGUARDS_SET_FORM_DATA,
		payload: {
			id,
			safeguard_code,
			safeguard_name,
			safeguard_type,
			treath_list,
			safeguard_description,
		},
	}
}

const safeguardsFormToggleAction = (data) => {
	return {
		action: projectFormActionTypes.SAFEGUARDS_FORM_TOGGLE,
		payload: data,
	}
}

const safeguardsFormChildrenToggleAction = (data) => {
	return {
		action: projectFormActionTypes.SAFEGUARDS_FORM_CHILDREN_TOGGLE,
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
	safeguardsFormChildrenToggleAction,
	setSafeguardsFormDataAction,
	uploadToggleAction,
}
