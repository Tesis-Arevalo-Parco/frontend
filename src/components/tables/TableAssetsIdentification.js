import { useState, useEffect, useContext } from 'react'
import { Table, Button, Space, Popconfirm } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import SearchInput from 'components/SearchInput'
import { POPCONFIRM_MESSAGES } from 'constants/popconfirmMessages'
import images from 'constants/assets'
import EmptyImage from 'components/EmptyImage'
import ProjectsFormContext from 'store/context/ProjectsFormContext'
import { deleteAssets } from 'epics/assetsEpics'
import ProjectsContext from 'store/context/ProjectsContext'
import ParamsContext from 'store/context/ParamsContext'
import { updateDependencies } from 'epics/dependenciesEpics'

const TableAssetsIdentification = ({ assets }) => {
	const [localAssets, setLocalAssets] = useState([])
	const { getAssetsData, assetsDependencies, assetsDependencyId } = useContext(
		ProjectsContext
	)
	const { assetsParams } = useContext(ParamsContext)
	const { setAssetsFormToggle, setAssetsFormData } = useContext(
		ProjectsFormContext
	)

	const updateAssets = (id, identification, name, model, classType) => {
		setAssetsFormData(id, identification, name, model, classType)
		setAssetsFormToggle()
	}

	const deleteAssetsById = async (id) => {
		await deleteAssets(id)
		await getAssetsData(assetsParams)
		await deleteAssetDependencies(id)
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

	const tableActions = (dataItem) => {
		return (
			<Space className='table-button-actions'>
				<Button
					key='edit'
					onClick={() =>
						updateAssets(
							dataItem.key,
							dataItem.identification,
							dataItem.name,
							dataItem.model,
							dataItem.classType
						)
					}
					icon={<EditOutlined />}
					className='update-button'
				/>
				<Popconfirm
					okText={POPCONFIRM_MESSAGES.YES}
					cancelText={POPCONFIRM_MESSAGES.NO}
					title={`¿Desea eliminar el activo ${dataItem.name}?`}
					onConfirm={() => deleteAssetsById(dataItem.key)}
				>
					<Button
						key='delete'
						icon={<DeleteOutlined />}
						className='delete-button'
					/>
				</Popconfirm>
			</Space>
		)
	}

	const filterAssets = (assets) =>
		assets.map((asset) => ({
			key: asset.id,
			identification: asset.identification,
			name: asset.name,
			model: asset.model,
			classType: asset.classType,
		}))

	const columns = [
		{
			title: 'Identificación',
			dataIndex: 'identification',
			key: 'identification',
			width: '30%',
		},
		{
			title: 'Nombre',
			dataIndex: 'name',
			key: 'name',
			width: '30%',
		},
		{
			title: 'Modelo',
			dataIndex: 'model',
			key: 'model',
			width: '30%',
		},
		{
			title: 'Acción',
			dataIndex: '',
			key: 'action',
			render: (_, record) => tableActions(record),
			width: '10%',
		},
	]

	useEffect(() => {
		setLocalAssets(assets)
	}, [assets])

	return (
		<div className='table-assets-expandable'>
			<SearchInput
				data={assets}
				setFilteredData={setLocalAssets}
				searchName='name'
				placeholder='Buscar Activo'
			/>
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
		</div>
	)
}

export default TableAssetsIdentification
