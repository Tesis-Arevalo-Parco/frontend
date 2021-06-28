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
		default:
			break
	}
}
