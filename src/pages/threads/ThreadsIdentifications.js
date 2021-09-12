import { useEffect, useContext } from 'react'
import { Spin } from 'antd'
import { useParams } from 'react-router-dom'
import ProjectsContext from 'store/context/ProjectsContext'
import CollapseThreats from 'components/CollapseThreats'
import ParamsContext from 'store/context/ParamsContext'
import SpinnerContext from 'store/context/SpinnerContext'

const ThreadsIdentifications = () => {
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
			<CollapseThreats assets={assets} />
		</Spin>
	)
}

export default ThreadsIdentifications
