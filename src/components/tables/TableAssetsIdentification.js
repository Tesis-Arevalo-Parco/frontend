/* eslint-disable no-unreachable-loop */
/* eslint-disable camelcase */
import { useState, useEffect, useContext } from 'react'
import { Table, Button, Space, Popconfirm, Tag } from 'antd'
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
	const [dataAssetTypes, setDataAssetTypes] = useState([])
	const {
		getAssetsData,
		assetsDependencies,
		assetsDependencyId,
		assetsClassCatalog,
	} = useContext(ProjectsContext)
	const { assetsParams } = useContext(ParamsContext)
	const { setAssetsFormToggle, setAssetsFormData } = useContext(
		ProjectsFormContext
	)

	const updateAssets = (
		id,
		identification,
		name,
		person_charge,
		location,
		quantity,
		description_asset,
		specific_characteristics,
		classType
	) => {
		setAssetsFormData(
			id,
			identification,
			name,
			person_charge,
			location,
			quantity,
			description_asset,
			specific_characteristics,
			classType
		)
		setAssetsFormToggle()
	}

	const deleteAssetsById = async (id) => {
		await deleteAssets(id)
		await getAssetsData(assetsParams)
		await deleteAssetDependencies(id)
	}

	const deleteAssetDependencies = async (id) => {
		if (assetsDependencies?.length) {
			const newDependency = []
			assetsDependencies?.forEach((dependency) => {
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
							dataItem.person_charge,
							dataItem.location,
							dataItem.quantity,
							dataItem.description_asset,
							dataItem.specific_characteristics,
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
	const arrayToObject = (type) => {
		// Devolver un array
		const arrayTitle = []
		type?.forEach((tipo) =>
			dataAssetTypes?.forEach((objeto) => {
				const a = findType(tipo, objeto)
				if (a !== false) {
					arrayTitle.push(a)
				}
			})
		)
		return arrayTitle
	}

	const findType = (type, assetsCatalog) => {
		let result, i, currentChild
		if (type === assetsCatalog.key || type === assetsCatalog.value) {
			return assetsCatalog.title
		} else {
			for (i = 0; i < assetsCatalog?.children?.length; i += 1) {
				currentChild = assetsCatalog.children[i]
				// Search in the current child
				result = findType(type, currentChild)
				// Return the result if the node has been found
				if (result !== false) {
					return result
				}
			}
			return false
		}
	}

	const filterAssets = (assets) =>
		assets.map((asset) => ({
			key: asset.id,
			identification: asset.identification,
			name: asset.name,
			person_charge: asset.person_charge,
			location: asset.location,
			quantity: asset.quantity,
			description_asset: asset.description_asset,
			specific_characteristics: asset.specific_characteristics,
			assetclassType: arrayToObject(asset.classType.parentValueData),
			assetclassSubType: arrayToObject(asset.classType.tree),
			classType: asset.classType,
		}))

	const columns = [
		{
			title: 'Código',
			dataIndex: 'identification',
			key: 'identification',
			width: 100,
			fixed: 'left',
		},
		{
			title: 'Nombre',
			dataIndex: 'name',
			key: 'name',
			width: 100,
			fixed: 'left',
		},
		{
			title: 'Persona a Cargo',
			dataIndex: 'person_charge',
			key: 'person_charge',
			width: '10%',
		},
		{
			title: 'Tipo',
			dataIndex: 'assetclassType',
			key: 'assetclassType',
			width: '20%',
			render: (tipos) => (
				<span>
					{tipos.map((tipo) => (
						<Tag color='cyan' style={{ fontSize: 10 }} key={tipo}>
							{tipo}
						</Tag>
					))}
				</span>
			),
		},
		{
			title: 'Subtipo',
			dataIndex: 'assetclassSubType',
			key: 'assetclassSubType',
			width: '20%',
			render: (subTipos) => (
				<span>
					{subTipos.map((subTipo) => (
						<Tag color='cyan' style={{ fontSize: 10 }} key={subTipo}>
							{subTipo}
						</Tag>
					))}
				</span>
			),
		},
		{
			title: 'Ubicación',
			dataIndex: 'location',
			key: 'location',
			width: '10%',
		},
		{
			title: 'Cantidad',
			dataIndex: 'quantity',
			key: 'quantity',
			width: '10%',
		},
		{
			title: 'Descripción',
			dataIndex: 'description_asset',
			key: 'description_asset',
			width: '20%',
		},
		{
			title: 'Características Específicas',
			dataIndex: 'specific_characteristics',
			key: 'specific_characteristics',
			width: '20%',
		},
		{
			title: 'Acción',
			dataIndex: '',
			key: 'action',
			render: (_, record) => tableActions(record),
			width: 100,
			fixed: 'right',
		},
	]

	useEffect(() => {
		setLocalAssets(assets)
	}, [assets])

	useEffect(() => {
		if (assetsClassCatalog?.length !== 0 && assetsClassCatalog) {
			setDataAssetTypes(assetsClassCatalog)
		}
	}, [assetsClassCatalog])

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
				scroll={{ x: 2000 }}
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
