import spinnerActionTypes from 'store/actionsType/spinnerActionTypes'

export default (state, data) => {
	const { payload, action } = data
	switch (action) {
		case spinnerActionTypes.SPINNER_ACTIVE:
			return {
				...state,
				active: payload,
			}
		default:
			break
	}
}
