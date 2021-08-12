import { useReducer, useContext } from 'react'
import ProjectsReducer from 'store/reducer/ProjectsReducer'
import ProjectsContext from 'store/context/ProjectsContext'
import { getProjects, getProjectById } from 'epics/projectsEpics'
import {
	projectsGetDataAction,
	assetsGetDataAction,
	setAssetsDependenciesAction,
	setAssetsDependencyIdAction,
	setAssetsNewDependenciesAction,
} from 'store/actions/projectsActions'
import { CODE_HTTP_RESPONSE } from 'constants/codeHttpResponse'
import SpinnerContext from 'store/context/SpinnerContext'

const projectsState = (props) => {
	const { activeSpinner } = useContext(SpinnerContext)
	const initialProjectsState = {
		projects: [],
		assets: [],
		assetsDependencies: [],
		assetsDependencyId: '',
		assetsNewDependencies: [],
	}
	const [state, dispatch] = useReducer(ProjectsReducer, initialProjectsState)

	const getProjectsData = async () => {
		activeSpinner(true)
		const response = await getProjects()
		if (response?.status === CODE_HTTP_RESPONSE.SUCCESS_200) {
			dispatch(projectsGetDataAction(response.data))
		}
		activeSpinner(false)
	}

	const getAssetsData = async (id) => {
		activeSpinner(true)
		const response = await getProjectById(id)
		if (response?.status === CODE_HTTP_RESPONSE.SUCCESS_200) {
			dispatch(assetsGetDataAction(response.data?.assets))
			if (response.data?.dependency?.dependencies) {
				setAssetsDependencies(response.data?.dependency?.dependencies)
				setAssetsDependencyId(response.data?.dependency?.id)
			} else {
				setAssetsDependencies([])
				setAssetsDependencyId('')
			}
		}
		activeSpinner(false)
	}

	const setAssetsDependencies = async (dependencies) => {
		dispatch(setAssetsDependenciesAction(dependencies))
	}

	const setAssetsDependencyId = async (dependencyId) => {
		dispatch(setAssetsDependencyIdAction(dependencyId))
	}

	const setAssetsNewDependencies = async (dependencies) => {
		dispatch(setAssetsNewDependenciesAction(dependencies))
	}
	return (
		<ProjectsContext.Provider
			value={{
				projects: state.projects,
				assets: state.assets,
				assetsDependencies: state.assetsDependencies,
				assetsDependencyId: state.assetsDependencyId,
				assetsNewDependencies: state.assetsNewDependencies,
				getProjectsData,
				getAssetsData,
				setAssetsDependencies,
				setAssetsDependencyId,
				setAssetsNewDependencies,
			}}
		>
			{props.children}
		</ProjectsContext.Provider>
	)
}

export default projectsState
