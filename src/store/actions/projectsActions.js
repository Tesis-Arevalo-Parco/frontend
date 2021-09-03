import projectActionTypes from 'store/actionsType/projectActionTypes'
const projectsGetDataAction = (data) => {
	return {
		action: projectActionTypes.PROJECTS_GET_DATA,
		payload: data,
	}
}

const assetsGetDataAction = (data) => {
	return {
		action: projectActionTypes.ASSETS_GET_DATA,
		payload: data,
	}
}

const setAssetsDependenciesAction = (data) => {
	return {
		action: projectActionTypes.PROJECT_SET_ASSETS_DEPENDENCIES,
		payload: data,
	}
}
const setAssetsDependencyIdAction = (data) => {
	return {
		action: projectActionTypes.PROJECT_SET_ASSETS_DEPENDENCY_ID,
		payload: data,
	}
}

const setAssetsNewDependenciesAction = (data) => {
	return {
		action: projectActionTypes.PROJECT_SET_ASSETS_NEW_DEPENDENCIES,
		payload: data,
	}
}

const setAssetsClassCatalogAction = (data) => {
	return {
		action: projectActionTypes.PROJECT_SET_ASSETS_CLASS_CATALOG,
		payload: data,
	}
}

const setAssetsValuationCatalogAction = (data) => {
	return {
		action: projectActionTypes.PROJECT_SET_ASSETS_VALUATION_CATALOG,
		payload: data,
	}
}

export {
	projectsGetDataAction,
	assetsGetDataAction,
	setAssetsDependenciesAction,
	setAssetsDependencyIdAction,
	setAssetsNewDependenciesAction,
	setAssetsClassCatalogAction,
	setAssetsValuationCatalogAction,
}
