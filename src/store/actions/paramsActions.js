import paramsActionTypes from 'store/actionsType/paramsActionTypes'
const setAssetsDataAction = (data) => {
	return {
		action: paramsActionTypes.PARAMS_ASSETS_SET_DATA,
		payload: data,
	}
}

export { setAssetsDataAction }
