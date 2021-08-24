import { useState } from 'react'
import { Modal, Radio, Slider, Space } from 'antd'

const AssetsValueModal = ({ toggleModal, setToggleModal }) => {
	const [radioOption, setRadioOption] = useState(1)
	const marks = {
		1: 'Despreciable',
		2: 'Bajo',
		3: 'Bajo (+)',
		4: 'Medio (-)',
		5: 'Medio',
		6: 'Alto (-)',
		7: 'Alto',
		8: 'Alto (+)',
		9: 'Nivel 9',
		10: 'Nivel 10',
	}

	const handleCancel = () => {
		setToggleModal(false)
	}

	const onChange = (e) => {
		console.log('radio checked', e.target.value)
		setRadioOption(e.target.value)
	}

	return (
		<>
			<Modal
				className='modal-assets-value'
				title='Valorar Activo'
				visible={toggleModal}
				/* 		
				onOk={handleOk}
				onCancel={handleCancel} */
				onCancel={handleCancel}
				okText='Guardar'
				cancelText='Cancelar'
				destroyOnClose={true}
				width='750px'
			>
				<Radio.Group
					onChange={onChange}
					value={radioOption}
					className='radio-group-vertical'
				>
					<Space direction='vertical'>
						<Radio value={1}>No Aplica</Radio>
						<Radio value={2}></Radio>
						<Slider
							marks={marks}
							step={10}
							defaultValue={1}
							min={1}
							max={10}
							className='slider-values'
						/>
						<Radio value={3}>Option C</Radio>
					</Space>
				</Radio.Group>
			</Modal>
		</>
	)
}

export default AssetsValueModal
