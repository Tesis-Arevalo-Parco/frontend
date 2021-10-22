/* eslint-disable array-callback-return */
import { useState, useContext } from 'react'
import { Modal, Upload, Spin } from 'antd'
import { InboxOutlined } from '@ant-design/icons'
import ProjectsFormContext from 'store/context/ProjectsFormContext'
import { ExcelRenderer } from 'react-excel-renderer'
import ProjectsContext from 'store/context/ProjectsContext'
import ParamsContext from 'store/context/ParamsContext'
import { saveAssets } from 'epics/assetsEpics'

const Uploader = () => {
	const { Dragger } = Upload
	const { setUploadToggle, toggleUpload } = useContext(ProjectsFormContext)
	const { assetsParams } = useContext(ParamsContext)
	const { getAssetsData } = useContext(ProjectsContext)
	const [uploadedAssets, setUploadedAssets] = useState([])
	const [spinner, setSpinner] = useState(false)

	const handleOk = async () => {
		setSpinner(true)
		if (uploadedAssets.length) {
			for (const asset of uploadedAssets) {
				await saveAssets(
					asset.identification,
					asset.name,
					asset.model,
					assetsParams,
					[],
					[]
				)
			}
			await getAssetsData(assetsParams)
		}
		setUploadToggle(false)
		setSpinner(false)
	}

	const handleCancel = () => {
		setUploadToggle(false)
	}

	const beforeUploadAssets = (file) => {
		if (!file) {
			return false
		}
		if (
			!(
				file.type === 'application/vnd.ms-excel' ||
				file.type ===
					'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
			)
		) {
			return false
		}
		ExcelRenderer(file, (error, response) => {
			if (error) {
				return false
			} else {
				const newRows = []
				if (!response.rows.length) {
					return false
				}
				const upperCasedTitle = response.rows[0].map((title) =>
					title.toUpperCase()
				)
				if (
					upperCasedTitle.includes('ID') &&
					upperCasedTitle.includes('NOMBRE') &&
					upperCasedTitle.includes('MODELO')
				) {
					const idIndex = upperCasedTitle.indexOf('ID')
					const nameIndex = upperCasedTitle.indexOf('NOMBRE')
					const modelIndex = upperCasedTitle.indexOf('MODELO')
					response.rows.slice(1).map((row, index) => {
						if (row && row.length) {
							newRows.push({
								identification: row[idIndex],
								name: row[nameIndex],
								model: row[modelIndex],
							})
						}
					})
					if (newRows.length) {
						setUploadedAssets(newRows)
					}
				}
			}
		})
		return false
	}

	return (
		<>
			<Modal
				className='modal'
				title='Cargar Activos'
				visible={toggleUpload}
				onOk={handleOk}
				onCancel={handleCancel}
				okText='Cargar'
				cancelText='Cancelar'
				destroyOnClose={true}
			>
				<Spin spinning={spinner}>
					<Dragger
						multiple={false}
						beforeUpload={beforeUploadAssets}
						accept='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel'
						maxCount={1}
					>
						<p className='ant-upload-drag-icon'>
							<InboxOutlined />
						</p>
						<p className='ant-upload-hint'>
							Haga clic o arrastre un archivo de excel a esta área para cargarlo
						</p>
					</Dragger>
				</Spin>
			</Modal>
		</>
	)
}

export default Uploader
