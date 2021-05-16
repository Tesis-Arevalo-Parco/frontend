import userActionTypes from 'store/actionsType/userActionTypes'
const userGetDataAction = (data) => {
	return {
		action: userActionTypes.USER_GET_DATA,
		payload: data,
	}
}

export { userGetDataAction }
