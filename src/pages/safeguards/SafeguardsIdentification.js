import { useEffect, useContext } from 'react'
import { Spin } from 'antd'
import { useParams } from 'react-router-dom'
import ProjectsContext from 'store/context/ProjectsContext'
import TableSafeguardsIdentification from 'components/tables/TableSafeguardsIdentification'
import ParamsContext from 'store/context/ParamsContext'
import SpinnerContext from 'store/context/SpinnerContext'

const SafeguardsIdentification = () => {
	const { setSafeguardsParams } = useContext(ParamsContext)
	const { safeguards, getSafeguardsData } = useContext(ProjectsContext)
	const { active, activeSpinner } = useContext(SpinnerContext)
	const { id } = useParams()

	useEffect(async () => {
		activeSpinner(true)
		setSafeguardsParams(id)
		await getSafeguardsData(id)
		activeSpinner(false)
	}, [id])

	return (
		<Spin spinning={active}>
			<div className='assets-identification'>
				<TableSafeguardsIdentification safeguards={safeguards} />
			</div>
		</Spin>
	)
}

export default SafeguardsIdentification
