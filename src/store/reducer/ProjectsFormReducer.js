import projectFormActionTypes from 'store/actionsType/projectFormActionTypes'

export default (state, data) => {
	const { payload, action } = data
	switch (action) {
		case projectFormActionTypes.PROJECTS_FORM_TOGGLE:
			return {
				...state,
				toggleFormProject: payload,
			}
		case projectFormActionTypes.ASSETS_FORM_TOGGLE:
			return {
				...state,
				toggleFormAssets: payload,
			}
		case projectFormActionTypes.SAFEGUARDS_FORM_TOGGLE:
			return {
				...state,
				toggleFormSafeguards: payload,
			}
		case projectFormActionTypes.SAFEGUARDS_FORM_CHILDREN_TOGGLE:
			return {
				...state,
				toggleFormChildrenSafeguards: payload,
			}
		case projectFormActionTypes.PROJECTS_SET_FORM_DATA:
			return {
				...state,
				projectFormData: payload,
			}
		case projectFormActionTypes.ASSETS_SET_FORM_DATA:
			return {
				...state,
				assetsFormData: payload,
			}
		case projectFormActionTypes.SAFEGUARDS_SET_FORM_DATA:
			return {
				...state,
				safeguardsFormData: payload,
			}
		case projectFormActionTypes.UPLOAD_TOGGLE:
			return {
				...state,
				toggleUpload: payload,
			}
		default:
			break
	}
}
