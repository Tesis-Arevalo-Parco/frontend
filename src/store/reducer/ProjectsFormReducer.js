import projectFormActionTypes from 'store/actionsType/projectFormActionTypes'

export default (state, data) => {
	const { payload, action } = data
	switch (action) {
		case projectFormActionTypes.PROJECTS_FORM_TOGGLE:
			return {
				...state,
				toggle: payload,
			}
		case projectFormActionTypes.PROJECTS_SET_FORM_DATA:
			return {
				...state,
				projectFormData: payload,
			}
		default:
			break
	}
}
