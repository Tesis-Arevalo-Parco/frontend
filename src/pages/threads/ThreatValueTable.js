import { useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import ProjectsContext from 'store/context/ProjectsContext'
import TableThreatsValue from 'components/tables/TableThreatsValue'
import ParamsContext from 'store/context/ParamsContext'
import SpinnerContext from 'store/context/SpinnerContext'

const ThreatValueTable = () => {
	const { setAssetsParams } = useContext(ParamsContext)
	const { assets, getAssetsData } = useContext(ProjectsContext)
	const { activeSpinner } = useContext(SpinnerContext)
	const { id } = useParams()

	useEffect(async () => {
		activeSpinner(true)
		setAssetsParams(id)
		await getAssetsData(id)
		activeSpinner(false)
	}, [id])

	return (
		<div className='assets-value-table'>
			<TableThreatsValue assets={assets} />
		</div>
	)
}

export default ThreatValueTable
