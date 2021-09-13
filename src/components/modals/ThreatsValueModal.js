import { useEffect, useState } from 'react'
import { Modal, Form, Input, Spin } from 'antd'
import { updateAssetsVulnerability } from 'epics/assetsEpics'

const ThreatsValueModal = ({ toggleModal, setToggleModal, dataModal }) => {
	const [form] = Form.useForm()
	const [comment, setComment] = useState('')
	const [vulnerability, setVulnerability] = useState('')
	const [spinner, setSpinner] = useState(false)

	const handleCancel = () => {
		setToggleModal(false)
	}

	const onChangeVulnerability = (e) => {
		setVulnerability(e.target.value)
	}

	const onChangeComment = (e) => {
		setComment(e.target.value)
	}

	const handleOk = async () => {
		setSpinner(true)
		const vulnerabilities = dataModal?.vulnerability
			? [...dataModal?.vulnerability]
			: []
		const data = {
			value: vulnerability,
			comment: comment,
			key: dataModal.key,
		}
		const index = vulnerabilities.findIndex((item) => item.key === data.key)
		if (index !== -1 && index !== undefined) {
			vulnerabilities[index] = data
		} else {
			vulnerabilities.push(data)
		}
		await updateAssetsVulnerability(dataModal?.assetId, vulnerabilities)
		setSpinner(false)
		handleCancel()
	}

	const findVulnerability = () =>
		dataModal?.vulnerability?.find((item) => item.key === dataModal.key)

	useEffect(() => {
		const vulnerabilityData = findVulnerability()
		form.setFieldsValue({
			vulnerability: vulnerabilityData?.value || '',
			comment: vulnerabilityData?.comment || '',
		})
	}, [dataModal])

	return (
		<Modal
			className='modal-threat-value'
			title={dataModal?.name}
			visible={toggleModal}
			onOk={handleOk}
			onCancel={handleCancel}
			okText='Guardar'
			cancelText='Cancelar'
			destroyOnClose={true}
		>
			<Spin spinning={spinner}>
				<Form
					name='threat-form'
					className='assets-form'
					layout='vertical'
					form={form}
				>
					<Form.Item
						label='Vulnerabilidades'
						name='vulnerability'
						className='main-form-item'
					>
						<Input.TextArea
							type='text'
							rows={5}
							onChange={onChangeVulnerability}
						/>
					</Form.Item>
					<Form.Item
						label='Comentario'
						name='comment'
						className='main-form-item'
					>
						<Input.TextArea type='text' onChange={onChangeComment} rows={3} />
					</Form.Item>
				</Form>
			</Spin>
		</Modal>
	)
}

export default ThreatsValueModal
