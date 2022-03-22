import { useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import ProjectsContext from 'store/context/ProjectsContext'
import TablePotentialImpactComputation from 'components/tables/TablePotentialImpactComputation'
import ParamsContext from 'store/context/ParamsContext'
import SpinnerContext from 'store/context/SpinnerContext'

const PotentialImpact = () => {
	const { setAssetsParams } = useContext(ParamsContext)
	const { assets, assetsDependencies, getAssetsData } = useContext(
		ProjectsContext
	)
	const { activeSpinner } = useContext(SpinnerContext)
	const { id } = useParams()

	useEffect(async () => {
		activeSpinner(true)
		setAssetsParams(id)
		await getAssetsData(id)
		activeSpinner(false)
	}, [id])

	return (
		<div className='potential-impact-table'>
			<TablePotentialImpactComputation
				assetsDependencies={assetsDependencies}
				assets={assets}
			/>
		</div>
	)
}

export default PotentialImpact
