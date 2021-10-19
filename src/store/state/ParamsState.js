import { useReducer } from 'react'
import ParamsReducer from 'store/reducer/ParamsReducer'
import ParamsContext from 'store/context/ParamsContext'
import {
	setAssetsDataAction,
	setSafeguardsDataAction,
	setProjectNameAction,
} from 'store/actions/paramsActions'

const paramsState = (props) => {
	const initialAssetsState = {
		assetsParams: '',
		safeguardsParams: '',
		assetsName: '',
		projectName: '',
	}
	const [state, dispatch] = useReducer(ParamsReducer, initialAssetsState)

	const setAssetsParams = async (assetsParams) => {
		dispatch(setAssetsDataAction(assetsParams))
	}
	const setSafeguardsParams = async (safeguardsParams) => {
		dispatch(setSafeguardsDataAction(safeguardsParams))
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
				safeguardsParams: state.safeguardsParams,
				setSafeguardsParams,
			}}
		>
			{props.children}
		</ParamsContext.Provider>
	)
}

export default paramsState
