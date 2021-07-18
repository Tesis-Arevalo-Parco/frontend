import { useReducer } from 'react'
import ParamsReducer from 'store/reducer/ParamsReducer'
import ParamsContext from 'store/context/ParamsContext'
import {
	setAssetsDataAction,
	setProjectNameAction,
} from 'store/actions/paramsActions'

const paramsState = (props) => {
	const initialAssetsState = {
		assetsParams: '',
		assetsName: '',
		projectName: '',
	}
	const [state, dispatch] = useReducer(ParamsReducer, initialAssetsState)

	const setAssetsParams = async (assetsParams) => {
		dispatch(setAssetsDataAction(assetsParams))
	}

	const setProjectName = async (name) => {
		dispatch(setProjectNameAction(name))
	}

	return (
		<ParamsContext.Provider
			value={{
				assetsParams: state.assetsParams,
				setAssetsParams,
				assetsName: state.assetsName,
				projectName: state.projectName,
				setProjectName,
			}}
		>
			{props.children}
		</ParamsContext.Provider>
	)
}

export default paramsState
