import { useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import ProjectsContext from 'store/context/ProjectsContext'
import TablePotentialRisk from 'components/tables/TablePotentialRisk'
import ParamsContext from 'store/context/ParamsContext'
import SpinnerContext from 'store/context/SpinnerContext'

const PotentialRisk = () => {
	const { setAssetsParams } = useContext(ParamsContext)
	const {
		assets,
		getSafeguardsWithThreatRisk,
		safeguardsWithThreatRisk,
	} = useContext(ProjectsContext)
	const { activeSpinner } = useContext(SpinnerContext)
	const { id } = useParams()

	useEffect(async () => {
		activeSpinner(true)
		setAssetsParams(id)
		await getSafeguardsWithThreatRisk(id)
		activeSpinner(false)
	}, [id])

	return (
		<div className='residual-impact-table'>
			<TablePotentialRisk
				assets={assets}
				safeguardsWithThreatRisk={safeguardsWithThreatRisk}
			/>
		</div>
	)
}

export default PotentialRisk
