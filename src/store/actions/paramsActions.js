import paramsActionTypes from 'store/actionsType/paramsActionTypes'
const setAssetsDataAction = (data) => {
	return {
		action: paramsActionTypes.PARAMS_ASSETS_SET_DATA,
		payload: data,
	}
}

const setSafeguardsDataAction = (data) => {
	return {
		action: paramsActionTypes.PARAMS_SAFEGUARDS_SET_DATA,
		payload: data,
	}
}

const setProjectNameAction = (data) => {
	return {
		action: paramsActionTypes.SET_PROJECT_NAME,
		payload: data,
	}
}

export { setAssetsDataAction, setProjectNameAction, setSafeguardsDataAction }
