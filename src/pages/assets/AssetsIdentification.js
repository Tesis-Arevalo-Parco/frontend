import { useEffect, useContext } from 'react'
import { Spin } from 'antd'
import { useParams } from 'react-router-dom'
import ProjectsContext from 'store/context/ProjectsContext'
import TableAssetsIdentification from 'components/tables/TableAssetsIdentification'
import ParamsContext from 'store/context/ParamsContext'
import SpinnerContext from 'store/context/SpinnerContext'

const AssetsIdentification = () => {
	const { setAssetsParams } = useContext(ParamsContext)
	const { assets, getAssetsData } = useContext(ProjectsContext)
	const { active, activeSpinner } = useContext(SpinnerContext)
	const { id } = useParams()

	useEffect(async () => {
		activeSpinner(true)
		setAssetsParams(id)
		await getAssetsData(id)
		activeSpinner(false)
	}, [id])

	return (
		<Spin spinning={active}>
			<div className='assets-identification'>
				<TableAssetsIdentification assets={assets} />
			</div>
		</Spin>
	)
}

export default AssetsIdentification
