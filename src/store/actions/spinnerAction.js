import spinnerActionTypes from 'store/actionsType/spinnerActionTypes'
const spinnerDataAction = (data) => {
	return {
		action: spinnerActionTypes.SPINNER_ACTIVE,
		payload: data,
	}
}

export { spinnerDataAction }
