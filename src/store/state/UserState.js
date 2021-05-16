import { useReducer } from 'react'
import UserReducer from 'store/reducer/UserReducer'
import UserContext from 'store/context/UserContext'
import { getUserData } from 'utils/localStorageUtils'
import { userGetDataAction } from 'store/actions/userActions'

const userState = (props) => {
	const initialUserState = {
		user: {},
	}
	const [state, dispatch] = useReducer(UserReducer, initialUserState)

	const getUserLoginData = () => {
		const userData = getUserData()
		dispatch(userGetDataAction(userData))
	}

	return (
		<UserContext.Provider
			value={{
				user: state.user,
				getUserLoginData,
			}}
		>
			{props.children}
		</UserContext.Provider>
	)
}

export default userState
