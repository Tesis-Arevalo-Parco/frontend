import projectFormActionTypes from 'store/actionsType/projectFormActionTypes'

export default (state, data) => {
	const { payload, action } = data
	switch (action) {
		case projectFormActionTypes.PROJECTS_FORM_TOGGLE:
			return {
				...state,
				toggle: payload,
			}
		default:
			break
	}
}
