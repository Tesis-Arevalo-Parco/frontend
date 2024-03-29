import { useReducer, useContext } from 'react'
import ProjectsReducer from 'store/reducer/ProjectsReducer'
import ProjectsContext from 'store/context/ProjectsContext'
import { getProjects, getProjectById } from 'epics/projectsEpics'
import {
	getSafeguardsWithThreatValue,
	getSafeguardsWithThreatRiskValue,
} from 'epics/safeguardsEpics'
import { getAssetsCatalog } from 'epics/assetsEpics'
import {
	projectsGetDataAction,
	assetsGetDataAction,
	safeguardsGetDataAction,
	setAssetsDependenciesAction,
	setAssetsDependencyIdAction,
	setAssetsNewDependenciesAction,
	setAssetsClassCatalogAction,
	setAssetsValuationCatalogAction,
	setThreatCatalogAction,
	setSafeguardsCatalogAction,
	setSafeguardsWithThreatDataAction,
	setSafeguardsWithThreatRiskDataAction,
} from 'store/actions/projectsActions'
import { CODE_HTTP_RESPONSE } from 'constants/codeHttpResponse'
import SpinnerContext from 'store/context/SpinnerContext'

const projectsState = (props) => {
	const { activeSpinner } = useContext(SpinnerContext)
	const initialProjectsState = {
		projects: [],
		assets: [],
		safeguards: [],
		assetsDependencies: [],
		assetsDependencyId: '',
		assetsNewDependencies: [],
		assetsClassCatalog: [],
		assetsValuationCatalog: [],
		threatCatalog: [],
		safeguardsCatalog: [],
		safeguardsWithThreat: [],
		safeguardsWithThreatRisk: [],
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
			setAssetsDependencies(response.data?.dependency?.dependencies ?? [])
			setAssetsDependencyId(response.data?.dependency?.id ?? '')
			dispatch(safeguardsGetDataAction(response?.data?.safeguards ?? []))
		}
		activeSpinner(false)
	}

	const getAssetsClassCatalog = async () => {
		const response = await getAssetsCatalog()
		if (response?.status === CODE_HTTP_RESPONSE.SUCCESS_200) {
			if (response?.data) {
				const assetsClassCatalog = response?.data?.find(
					(catalog) => catalog.catalogId === 'asset-class-catalog'
				)
				const assetsValuationCatalog = response?.data?.find(
					(catalog) => catalog.catalogId === 'asset-valuation-catalog'
				)
				const threatCatalog = response?.data?.find(
					(catalog) => catalog.catalogId === 'threat-catalog'
				)
				const safeguardsCatalog = response?.data?.find(
					(catalog) => catalog.catalogId === 'safeguard-catalog'
				)
				setAssetsClassCatalog(assetsClassCatalog?.catalog || [])
				setAssetsValuationCatalog(assetsValuationCatalog?.catalog || [])
				setThreatCatalog(threatCatalog?.catalog || [])
				setSafeguardsCatalog(safeguardsCatalog?.catalog || [])
			} else {
				setAssetsClassCatalog([])
				setAssetsValuationCatalog([])
				setThreatCatalog([])
				setSafeguardsCatalog([])
			}
		}
	}

	const getSafeguardsWithThreat = async (id) => {
		activeSpinner(true)
		const response = await getSafeguardsWithThreatValue(id)
		if (response?.status === CODE_HTTP_RESPONSE.SUCCESS_200) {
			dispatch(setSafeguardsWithThreatDataAction(response.data))
		}
		activeSpinner(false)
	}

	const getSafeguardsWithThreatRisk = async (id) => {
		activeSpinner(true)
		const response = await getSafeguardsWithThreatRiskValue(id)
		if (response?.status === CODE_HTTP_RESPONSE.SUCCESS_200) {
			dispatch(setSafeguardsWithThreatRiskDataAction(response.data))
		}
		activeSpinner(false)
	}

	const setAssetsDependencies = async (dependencies) => {
		dispatch(setAssetsDependenciesAction(dependencies))
	}

	const setAssetsClassCatalog = async (catalog) => {
		dispatch(setAssetsClassCatalogAction(catalog))
	}

	const setAssetsValuationCatalog = async (catalog) => {
		dispatch(setAssetsValuationCatalogAction(catalog))
	}
	const setThreatCatalog = async (catalog) => {
		dispatch(setThreatCatalogAction(catalog))
	}

	const setSafeguardsCatalog = async (catalog) => {
		dispatch(setSafeguardsCatalogAction(catalog))
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
				safeguards: state.safeguards,
				assetsDependencies: state.assetsDependencies,
				assetsDependencyId: state.assetsDependencyId,
				assetsNewDependencies: state.assetsNewDependencies,
				assetsClassCatalog: state.assetsClassCatalog,
				assetsValuationCatalog: state.assetsValuationCatalog,
				threatCatalog: state.threatCatalog,
				safeguardsCatalog: state.safeguardsCatalog,
				safeguardsWithThreat: state.safeguardsWithThreat,
				safeguardsWithThreatRisk: state.safeguardsWithThreatRisk,
				getProjectsData,
				getAssetsData,
				setAssetsDependencies,
				setAssetsDependencyId,
				setAssetsNewDependencies,
				getAssetsClassCatalog,
				getSafeguardsWithThreat,
				getSafeguardsWithThreatRisk,
			}}
		>
			{props.children}
		</ProjectsContext.Provider>
	)
}

export default projectsState
