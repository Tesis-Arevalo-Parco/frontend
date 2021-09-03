import { useState, useEffect, useContext } from 'react'
import { Table, Button, Space } from 'antd'
import images from 'constants/assets'
import EmptyImage from 'components/EmptyImage'
import ProjectsFormContext from 'store/context/ProjectsFormContext'
import AssetsValueModal from 'components/AssetsValueModal'
import { DATA_ASSETS_VALUE } from 'constants/constants'

const TableAssetsValue = ({ assets }) => {
	const [localAssets, setLocalAssets] = useState([])
	const [toggleModal, setToggleModal] = useState(false)
	const [dataModal, setDataModal] = useState({})
	const { setAssetsFormToggle } = useContext(ProjectsFormContext)

	const onClickAssets = (id, name, key, data) => {
		setDataModal({
			id,
			name,
			key,
			data,
		})
		setToggleModal(true)
	}

	const tableActions = (dataItem, key) => {
		const data = getDataAssetValue(dataItem, key)
		return (
			<Space className='table-button-actions'>
				<Button
					key='edit'
					onClick={() => onClickAssets(dataItem.key, dataItem.name, key, data)}
					className='update-button'
				>
					{data?.value ?? ' '}
				</Button>
			</Space>
		)
	}

	const getDataAssetValue = (dataItem, key) => {
		let data = {}
		if (
			DATA_ASSETS_VALUE[key]?.value === DATA_ASSETS_VALUE.availability.value
		) {
			data = dataItem?.availability
		} else if (
			DATA_ASSETS_VALUE[key]?.value === DATA_ASSETS_VALUE.integrity.value
		) {
			data = dataItem?.integrity
		} else if (
			DATA_ASSETS_VALUE[key]?.value === DATA_ASSETS_VALUE.confidentiality.value
		) {
			data = dataItem?.confidentiality
		} else if (
			DATA_ASSETS_VALUE[key]?.value === DATA_ASSETS_VALUE.authenticity.value
		) {
			data = dataItem?.authenticity
		} else if (
			DATA_ASSETS_VALUE[key]?.value === DATA_ASSETS_VALUE.traceability.value
		) {
			data = dataItem?.traceability
		}
		return data
	}

	const filterAssets = (assets) =>
		assets.map((asset) => ({
			key: asset.id,
			name: asset.name,
			availability: asset?.availability ?? '',
			integrity: asset?.integrity ?? '',
			confidentiality: asset?.confidentiality ?? '',
			authenticity: asset?.authenticity ?? '',
			traceability: asset?.traceability ?? '',
		}))

	const columns = [
		{
			title: 'Nombre',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: DATA_ASSETS_VALUE.availability.label,
			dataIndex: DATA_ASSETS_VALUE.availability.value,
			key: DATA_ASSETS_VALUE.availability.value,
			render: (_, record) =>
				tableActions(record, DATA_ASSETS_VALUE.availability.value),
			align: 'center',
		},
		{
			title: DATA_ASSETS_VALUE.integrity.label,
			dataIndex: DATA_ASSETS_VALUE.integrity.value,
			key: DATA_ASSETS_VALUE.integrity.value,
			render: (_, record) =>
				tableActions(record, DATA_ASSETS_VALUE.integrity.value),
			align: 'center',
		},
		{
			title: DATA_ASSETS_VALUE.confidentiality.label,
			dataIndex: DATA_ASSETS_VALUE.confidentiality.value,
			key: DATA_ASSETS_VALUE.confidentiality.value,
			render: (_, record) =>
				tableActions(record, DATA_ASSETS_VALUE.confidentiality.value),
			align: 'center',
		},
		{
			title: DATA_ASSETS_VALUE.authenticity.label,
			dataIndex: DATA_ASSETS_VALUE.authenticity.value,
			key: DATA_ASSETS_VALUE.authenticity.value,
			render: (_, record) =>
				tableActions(record, DATA_ASSETS_VALUE.authenticity.value),
			align: 'center',
		},
		{
			title: DATA_ASSETS_VALUE.traceability.label,
			dataIndex: DATA_ASSETS_VALUE.traceability.value,
			key: DATA_ASSETS_VALUE.traceability.value,
			render: (_, record) =>
				tableActions(record, DATA_ASSETS_VALUE.traceability.value),
			align: 'center',
		},
	]

	useEffect(() => {
		setLocalAssets(assets)
	}, [assets])

	return (
		<div className='table-assets-value-expandable'>
			<Table
				columns={columns}
				bordered={true}
				dataSource={filterAssets(localAssets)}
				locale={{
					emptyText: (
						<EmptyImage
							buttonText='Crear activo'
							image={images.EMPTY_IMG}
							description='No se logró encontrar activos'
							onClick={setAssetsFormToggle}
						/>
					),
				}}
			/>
			<AssetsValueModal
				toggleModal={toggleModal}
				setToggleModal={setToggleModal}
				dataModal={dataModal}
			/>
		</div>
	)
}

export default TableAssetsValue
