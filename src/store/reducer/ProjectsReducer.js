import projectActionTypes from 'store/actionsType/projectActionTypes'

export default (state, data) => {
	const { payload, action } = data
	switch (action) {
		case projectActionTypes.PROJECTS_GET_DATA:
			return {
				...state,
				projects: payload,
			}
		case projectActionTypes.ASSETS_GET_DATA:
			return {
				...state,
				assets: payload,
			}
		case projectActionTypes.PROJECT_SET_ASSETS_DEPENDENCIES:
			return {
				...state,
				assetsDependencies: payload,
			}
		case projectActionTypes.PROJECT_SET_ASSETS_DEPENDENCY_ID:
			return {
				...state,
				assetsDependencyId: payload,
			}
		case projectActionTypes.PROJECT_SET_ASSETS_NEW_DEPENDENCIES:
			return {
				...state,
				assetsNewDependencies: payload,
			}
		default:
			break
	}
}
