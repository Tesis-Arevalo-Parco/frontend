import projectActionTypes from 'store/actionsType/projectActionTypes'
const projectsGetDataAction = (data) => {
	return {
		action: projectActionTypes.PROJECTS_GET_DATA,
		payload: data,
	}
}

const assetsGetDataAction = (data) => {
	return {
		action: projectActionTypes.ASSETS_GET_DATA,
		payload: data,
	}
}

export { projectsGetDataAction, assetsGetDataAction }
