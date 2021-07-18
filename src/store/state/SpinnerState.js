import { useReducer } from 'react'
import SpinnerReducer from 'store/reducer/SpinnerReducer'
import SpinnerContext from 'store/context/SpinnerContext'
import { spinnerDataAction } from 'store/actions/spinnerAction'

const spinnerState = (props) => {
	const initialUserState = {
		active: false,
	}
	const [state, dispatch] = useReducer(SpinnerReducer, initialUserState)

	const activeSpinner = (activeState) => {
		dispatch(spinnerDataAction(activeState))
	}

	return (
		<SpinnerContext.Provider
			value={{
				active: state.active,
				activeSpinner,
			}}
		>
			{props.children}
		</SpinnerContext.Provider>
	)
}

export default spinnerState
