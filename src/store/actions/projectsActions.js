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

const safeguardsGetDataAction = (data) => {
	return {
		action: projectActionTypes.SAFEGUARDS_GET_DATA,
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

const setThreatCatalogAction = (data) => {
	return {
		action: projectActionTypes.PROJECT_SET_THREAT_CATALOG,
		payload: data,
	}
}

const setSafeguardsCatalogAction = (data) => {
	return {
		action: projectActionTypes.PROJECT_SET_SAFEGUARDS_CATALOG,
		payload: data,
	}
}

const setSafeguardsWithThreatDataAction = (data) => {
	return {
		action: projectActionTypes.PROJECT_SET_SAFEGUARDS_WITH_THREAT_DATA,
		payload: data,
	}
}

const setSafeguardsWithThreatRiskDataAction = (data) => {
	return {
		action: projectActionTypes.PROJECT_SET_SAFEGUARDS_WITH_THREAT__RISK_DATA,
		payload: data,
	}
}

export {
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
}
