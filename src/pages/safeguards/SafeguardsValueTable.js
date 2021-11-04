import { useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import ProjectsContext from 'store/context/ProjectsContext'
import TableSafeguardsValue from 'components/tables/TableSafeguardsValue'
import ParamsContext from 'store/context/ParamsContext'
import SpinnerContext from 'store/context/SpinnerContext'

const SafeguardsValueTable = () => {
	const { setAssetsParams } = useContext(ParamsContext)
	const { safeguards, getAssetsData } = useContext(ProjectsContext)
	const { activeSpinner } = useContext(SpinnerContext)
	const { id } = useParams()

	useEffect(async () => {
		activeSpinner(true)
		setAssetsParams(id)
		await getAssetsData(id)
		activeSpinner(false)
	}, [id])

	return (
		<div className='safeguard-value-table'>
			<TableSafeguardsValue safeguards={safeguards} />
		</div>
	)
}

export default SafeguardsValueTable
