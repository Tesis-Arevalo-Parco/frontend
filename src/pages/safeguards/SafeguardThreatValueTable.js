import { useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import ProjectsContext from 'store/context/ProjectsContext'
import TableSafeguardThreatsValue from 'components/tables/TableSafeguardThreatsValue'
import ParamsContext from 'store/context/ParamsContext'
import SpinnerContext from 'store/context/SpinnerContext'

const SafeguardThreatValueTable = () => {
	const { setAssetsParams } = useContext(ParamsContext)
	const { getSafeguardsWithThreat, safeguardsWithThreat } = useContext(
		ProjectsContext
	)
	const { activeSpinner } = useContext(SpinnerContext)
	const { id } = useParams()

	useEffect(async () => {
		activeSpinner(true)
		setAssetsParams(id)
		await getSafeguardsWithThreat(id)
		activeSpinner(false)
	}, [id])

	return (
		<div className='assets-value-table'>
			<TableSafeguardThreatsValue safeguardsWithThreat={safeguardsWithThreat} />
		</div>
	)
}

export default SafeguardThreatValueTable
