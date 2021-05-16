import userActionTypes from 'store/actionsType/userActionTypes'

export default (state, data) => {
	const { payload, action } = data
	switch (action) {
		case userActionTypes.USER_GET_DATA:
			return {
				...state,
				user: payload,
			}
		default:
			break
	}
}
