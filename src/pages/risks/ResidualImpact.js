import { useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import ProjectsContext from 'store/context/ProjectsContext'
import TableResidualImpactComputation from 'components/tables/TableResidualImpactComputation'
import ParamsContext from 'store/context/ParamsContext'
import SpinnerContext from 'store/context/SpinnerContext'

const PotentialImpact = () => {
	const { setAssetsParams } = useContext(ParamsContext)
	const {
		assets,
		assetsDependencies,
		getAssetsData,
		getSafeguardsWithThreat,
		safeguardsWithThreat,
	} = useContext(ProjectsContext)
	const { activeSpinner } = useContext(SpinnerContext)
	const { id } = useParams()

	useEffect(async () => {
		activeSpinner(true)
		setAssetsParams(id)
		await getAssetsData(id)
		await getSafeguardsWithThreat(id)
		activeSpinner(false)
	}, [id])

	return (
		<div className='residual-impact-table'>
			<TableResidualImpactComputation
				assets={assets}
				assetsDependencies={assetsDependencies}
				safeguardsWithThreat={safeguardsWithThreat}
			/>
		</div>
	)
}

export default PotentialImpact
