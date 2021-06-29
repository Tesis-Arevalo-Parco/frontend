/* eslint-disable array-callback-return */
import { useState, useContext } from 'react'
import { Modal, Upload, message } from 'antd'
import { InboxOutlined } from '@ant-design/icons'
import ProjectsFormContext from 'store/context/ProjectsFormContext'
import { ExcelRenderer } from 'react-excel-renderer'

const Uploader = () => {
	const { Dragger } = Upload
	const { setUploadToggle, toggleUpload } = useContext(ProjectsFormContext)
	const props = {
		name: 'file',
		multiple: false,
		beforeUpload: (file) => {
			console.log('file', file)
			ExcelRenderer(file, (err, resp) => {
				if (err) {
					console.log(err, 'err')
				} else {
					const newRows = []
					console.log('hello', resp)
					resp.rows.slice(1).map((row, index) => {
						if (row && row.length) {
							console.log(row, 'row')
							newRows.push({
								key: index,
								name: row[0],
								age: row[1],
								gender: row[2],
							})
						}
					})
					console.log('newRows', newRows)
					if (newRows.length === 0) {
						/* this.setState({
							errorMessage: 'No data found in file!',
						}) */
						return false
					} else {
						/* this.setState({
							cols: resp.cols,
							rows: newRows,
							errorMessage: null,
						}) */
					}
				}
			})
			return false
		},
		onDrop(e) {
			console.log('Dropped files', e.dataTransfer.files)
		},
	}

	const showModal = () => {}

	const handleOk = () => {}

	const handleCancel = () => {}

	return (
		<>
			<Modal
				title='Basic Modal'
				visible={toggleUpload}
				onOk={handleOk}
				onCancel={() => setUploadToggle(false)}
			>
				<Dragger
					{...props}
					accept='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel'
				>
					<p className='ant-upload-drag-icon'>
						<InboxOutlined />
					</p>
					<p className='ant-upload-text'>
						Click or drag file to this area to upload
					</p>
					<p className='ant-upload-hint'>
						Support for a single or bulk upload. Strictly prohibit from
						uploading company data or other band files
					</p>
				</Dragger>
			</Modal>
		</>
	)
}

export default Uploader
