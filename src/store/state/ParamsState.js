import { useReducer } from 'react'
import ParamsReducer from 'store/reducer/ParamsReducer'
import ParamsContext from 'store/context/ParamsContext'
import { setAssetsDataAction } from 'store/actions/paramsActions'

const paramsState = (props) => {
	const initialAssetsState = {
		assetsParams: '',
		assetsName: '',
	}
	const [state, dispatch] = useReducer(ParamsReducer, initialAssetsState)

	const setAssetsParams = async (assetsParams) => {
		dispatch(setAssetsDataAction(assetsParams))
	}

	return (
		<ParamsContext.Provider
			value={{
				assetsParams: state.assetsParams,
				setAssetsParams,
				assetsName: state.assetsName,
			}}
		>
			{props.children}
		</ParamsContext.Provider>
	)
}

export default paramsState
