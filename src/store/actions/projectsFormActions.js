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
export { projectsFormToggleAction, setProjectsFormDataAction }
