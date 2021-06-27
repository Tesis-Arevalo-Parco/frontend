import { useState, useEffect } from 'react'
import { Table, Button, Space, Popconfirm } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import SearchInput from 'components/SearchInput'
import { POPCONFIRM_MESSAGES } from 'constants/popconfirmMessages'
import images from 'constants/assets'
import EmptyImage from 'components/EmptyImage'

const TableAssetsIdentification = ({ assets }) => {
	const [localAssets, setLocalAssets] = useState([])

	const tableActions = (dataItem) => {
		return (
			<Space className='table-button-actions'>
				<Button
					key='edit'
					// onClick={}
					icon={<EditOutlined />}
					className='update-button'
				/>
				<Popconfirm
					okText={POPCONFIRM_MESSAGES.YES}
					cancelText={POPCONFIRM_MESSAGES.NO}
					title={`¿Desea eliminar el proyecto ${dataItem.name}?`}
					// onConfirm={() => deleteProjects(dataItem.key)}
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
				placeholder='Buscar proyecto'
			/>
			<Table
				columns={columns}
				bordered={true}
				dataSource={filterAssets(localAssets)}
				locale={{
					emptyText: (
						<EmptyImage
							buttonText='Crear proyecto'
							image={images.EMPTY_IMG}
							description='No se logró encontrar proyectos'
							// onClick={toggleProjectsForm}
						/>
					),
				}}
			/>
		</div>
	)
}

export default TableAssetsIdentification
