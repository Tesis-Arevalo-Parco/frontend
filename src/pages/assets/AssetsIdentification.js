import { useEffect, useState } from 'react'
import { Spin } from 'antd'
import { useParams } from 'react-router-dom'
import { getProjectById } from 'epics/projectsEpics'
import { CODE_HTTP_RESPONSE } from 'constants/codeHttpResponse'
import TableAssetsIdentification from 'components/tables/TableAssetsIdentification'

const AssetsIdentification = () => {
	const [assets, setAssets] = useState([])
	const [spinner, setSpinner] = useState(false)
	const { id } = useParams()
	useEffect(async () => {
		setSpinner(true)
		const response = await getProjectById(id)
		if (response?.status === CODE_HTTP_RESPONSE.SUCCESS_200) {
			setAssets(response.data.assets)
		}
		setSpinner(false)
	}, [id])
	return (
		<Spin spinning={spinner}>
			<div className='assets-identification'>
				<TableAssetsIdentification assets={assets} />
			</div>
		</Spin>
	)
}

export default AssetsIdentification
