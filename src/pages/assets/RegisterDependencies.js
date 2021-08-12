import { useEffect, useContext } from 'react'
import { Spin } from 'antd'
import { useParams } from 'react-router-dom'
import ProjectsContext from 'store/context/ProjectsContext'
import TableRegisterDependencies from 'components/tables/TableRegisterDependencies'
import ParamsContext from 'store/context/ParamsContext'
import SpinnerContext from 'store/context/SpinnerContext'

const AssetsIdentification = () => {
	const { setAssetsParams } = useContext(ParamsContext)
	const { assets, getAssetsData, assetsDependencies } = useContext(
		ProjectsContext
	)
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
			<div className='assets-dependencies'>
				<TableRegisterDependencies
					assets={assets}
					assetsDependencies={assetsDependencies}
				/>
			</div>
		</Spin>
	)
}

export default AssetsIdentification
