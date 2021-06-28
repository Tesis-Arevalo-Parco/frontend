import paramsActionTypes from 'store/actionsType/paramsActionTypes'

export default (state, data) => {
	const { payload, action } = data
	switch (action) {
		case paramsActionTypes.PARAMS_ASSETS_SET_DATA:
			return {
				...state,
				assetsParams: payload,
			}
		default:
			break
	}
}
