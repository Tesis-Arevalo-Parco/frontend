import { useState, useReducer, useEffect, useContext } from 'react'
import { Modal } from 'antd'

const SafeguardSelectModal = ({ toggleModal, setToggleModal, dataModal }) => {
	const handleCancel = () => {
		setToggleModal(false)
	}

	const handleOk = async () => {
		console.log('Successful')
	}

	return (
		<>
			<Modal
				title='Seleciona la Salvaguarda'
				centered
				visible={toggleModal}
				onOk={handleOk}
				onCancel={handleCancel}
				width={1000}
			>
				<p>some contents...</p>
				<p>some contents...</p>
				<p>some contents...</p>
			</Modal>
		</>
	)
}

export default SafeguardSelectModal
