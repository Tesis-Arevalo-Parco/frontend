import { useState, useEffect, useContext } from 'react'
import { Table, Button, Space, Popconfirm, Slider } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { POPCONFIRM_MESSAGES } from 'constants/popconfirmMessages'
import images from 'constants/assets'
import EmptyImage from 'components/EmptyImage'
import ProjectsFormContext from 'store/context/ProjectsFormContext'
import { deleteAssets } from 'epics/assetsEpics'
import ProjectsContext from 'store/context/ProjectsContext'
import ParamsContext from 'store/context/ParamsContext'
import { updateDependencies } from 'epics/dependenciesEpics'
import AssetsValueModal from 'components/AssetsValueModal'

const TableAssetsValue = ({ assets }) => {
	const [localAssets, setLocalAssets] = useState([])
	const [toggleModal, setToggleModal] = useState(false)
	const { getAssetsData, assetsDependencies, assetsDependencyId } = useContext(
		ProjectsContext
	)
	const { assetsParams } = useContext(ParamsContext)
	const { setAssetsFormToggle, setAssetsFormData } = useContext(
		ProjectsFormContext
	)
	const dataAssetsValue = {
		availability: 'availability',
		integrity: 'integrity',
		confidentiality: 'confidentiality',
		authenticity: 'authenticity',
		traceability: 'traceability',
	}

	const updateAssets = (id, name, key) => {
		console.log(id, name, key)
		setToggleModal(true)
		/* setAssetsFormData(id, identification, name, model, classType)
		setAssetsFormToggle() */
	}

	const deleteAssetsById = async (id) => {
		/* await deleteAssets(id)
		await getAssetsData(assetsParams)
		await deleteAssetDependencies(id) */
	}

	const deleteAssetDependencies = async (id) => {
		if (assetsDependencies.length) {
			const newDependency = []
			assetsDependencies.forEach((dependency) => {
				if (
					dependency.firstAsset.id !== id &&
					dependency.secondAsset.id !== id
				) {
					newDependency.push(dependency)
				}
			})
			await updateDependencies(assetsDependencyId, newDependency, assetsParams)
		}
	}

	const tableActions = (dataItem, key) => {
		return (
			<Space className='table-button-actions'>
				<Button
					key='edit'
					onClick={() => updateAssets(dataItem.key, dataItem.name, key)}
					className='update-button'
				>
					&nbsp;
				</Button>
			</Space>
		)
	}
	const filterAssets = (assets) =>
		assets.map((asset) => ({
			key: asset.id,
			name: asset.name,
			availability: '',
			integrity: '',
			confidentiality: '',
			authenticity: '',
			traceability: '',
		}))

	const columns = [
		{
			title: 'Nombre',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: '[D] Disponibilidad',
			dataIndex: dataAssetsValue.availability,
			key: dataAssetsValue.availability,
			render: (_, record) => tableActions(record, dataAssetsValue.availability),
			align: 'center',
		},
		{
			title: '[I] Integridad',
			dataIndex: dataAssetsValue.integrity,
			key: dataAssetsValue.integrity,
			render: (_, record) => tableActions(record, dataAssetsValue.integrity),
			align: 'center',
		},
		{
			title: '[C] Confidencialidad',
			dataIndex: dataAssetsValue.confidentiality,
			key: dataAssetsValue.confidentiality,
			render: (_, record) =>
				tableActions(record, dataAssetsValue.confidentiality),
			align: 'center',
		},
		{
			title: '[A] Autenticidad',
			dataIndex: dataAssetsValue.authenticity,
			key: dataAssetsValue.authenticity,
			render: (_, record) => tableActions(record, dataAssetsValue.authenticity),
			align: 'center',
		},
		{
			title: '[T] Trazabilidad',
			dataIndex: dataAssetsValue.traceability,
			key: dataAssetsValue.traceability,
			render: (_, record) => tableActions(record, dataAssetsValue.traceability),
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
			/>
		</div>
	)
}

export default TableAssetsValue
