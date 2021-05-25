import projectActionTypes from 'store/actionsType/projectActionTypes'

export default (state, data) => {
	const { payload, action } = data
	switch (action) {
		case projectActionTypes.PROJECTS_GET_DATA:
			return {
				...state,
				projects: payload,
			}
		default:
			break
	}
}
