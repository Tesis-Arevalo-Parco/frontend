import projectActionTypes from 'store/actionsType/projectActionTypes'
const projectsGetDataAction = (data) => {
	return {
		action: projectActionTypes.PROJECTS_GET_DATA,
		payload: data,
	}
}

export { projectsGetDataAction }
