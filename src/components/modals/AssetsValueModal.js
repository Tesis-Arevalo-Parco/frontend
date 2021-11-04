import { useState, useReducer, useEffect, useContext } from 'react'
import { Modal, Radio, Slider, Space, Tree, Typography, Spin } from 'antd'
import { DATA_ASSETS_VALUE } from 'constants/constants'
import { updateAssetsValue } from 'epics/assetsEpics'
import ProjectsContext from 'store/context/ProjectsContext'
import ParamsContext from 'store/context/ParamsContext'

const AssetsValueModal = ({ toggleModal, setToggleModal, dataModal }) => {
	const { Text } = Typography
	const [tree, setTree] = useState([])
	const [treeData, setTreeData] = useState([])
	const [sliderValue, setSliderValue] = useState(1)
	const [slider, setSlider] = useState(1)
	const [radioOption, setRadioOption] = useState(1)
	const [treeValue, setTreeValue] = useState(1)
	const [spinner, setSpinner] = useState(false)
	const { getAssetsData, assetsValuationCatalog } = useContext(ProjectsContext)
	const { assetsParams } = useContext(ParamsContext)

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

	const initialState = {
		radioFirstValue: false,
		radioSecondValue: true,
		radioThirdValue: true,
	}

	const [stateRadio, dispatch] = useReducer((state, action) => {
		switch (action.type) {
			case 'FIRST_RADIO':
				return {
					...state,
					radioFirstValue: false,
					radioSecondValue: true,
					radioThirdValue: true,
				}
			case 'SECOND_RADIO':
				return {
					...state,
					radioFirstValue: true,
					radioSecondValue: false,
					radioThirdValue: true,
				}
			case 'THIRD_RADIO':
				return {
					...state,
					radioFirstValue: true,
					radioSecondValue: true,
					radioThirdValue: false,
				}
		}
		return state
	}, initialState)

	const handleCancel = () => {
		setToggleModal(false)
		setRadioOption(1)
		dispatch({ type: 'FIRST_RADIO' })
	}

	const dispatchRadio = (value) => {
		if (value === 1) {
			dispatch({ type: 'FIRST_RADIO' })
		} else if (value === 2) {
			dispatch({ type: 'SECOND_RADIO' })
		} else if (value === 3) {
			dispatch({ type: 'THIRD_RADIO' })
		}
	}

	const onChange = (e) => {
		setRadioOption(e.target.value)
		dispatchRadio(e.target.value)
	}

	const handleOk = async () => {
		if (radioOption === 1) {
			saveAssetsValue(null, radioOption)
		} else if (radioOption === 2) {
			saveAssetsValue(sliderValue, radioOption)
		} else if (radioOption === 3) {
			saveAssetsValue(treeValue, radioOption)
		}
	}

	const saveAssetsValue = async (value, option) => {
		setSpinner(true)
		let data = {}
		if (option === 3) {
			data = {
				key: dataModal.key,
				value,
				option,
				tree,
			}
		} else if (option === 2) {
			data = {
				key: dataModal.key,
				value,
				option,
			}
		}
		if (dataModal.key === DATA_ASSETS_VALUE.availability.value) {
			await updateAssetsValue(dataModal.id, data, null, null, null, null)
		} else if (dataModal.key === DATA_ASSETS_VALUE.integrity.value) {
			await updateAssetsValue(dataModal.id, null, data, null, null, null)
		} else if (dataModal.key === DATA_ASSETS_VALUE.confidentiality.value) {
			await updateAssetsValue(dataModal.id, null, null, data, null, null)
		} else if (dataModal.key === DATA_ASSETS_VALUE.authenticity.value) {
			await updateAssetsValue(dataModal.id, null, null, null, data, null)
		} else if (dataModal.key === DATA_ASSETS_VALUE.traceability.value) {
			await updateAssetsValue(dataModal.id, null, null, null, null, data)
		}
		setSpinner(false)
		handleCancel()
		await getAssetsData(assetsParams)
	}

	const onChangeSlider = (value) => {
		setSliderValue(value)
	}

	const onCheck = (checkedKeys, info) => {
		setTree([info?.node?.key])
		setTreeValue(+info?.node?.value)
	}

	useEffect(() => {
		if (dataModal?.data?.option) {
			setRadioOption(dataModal?.data?.option)
			dispatchRadio(dataModal?.data?.option)
			if (dataModal?.data?.option === 2) {
				setSlider(dataModal?.data?.value)
			} else if (dataModal?.data?.option === 3) {
				setTree(dataModal?.data?.tree)
				setSlider(1)
			} else {
				setSlider(1)
			}
		} else {
			setSlider(1)
		}
	}, [dataModal])

	useEffect(() => {
		if (assetsValuationCatalog?.length !== 0 && assetsValuationCatalog) {
			setTreeData(assetsValuationCatalog)
		}
	}, [assetsValuationCatalog])

	return (
		<>
			<Modal
				className='modal-assets-value'
				title={`Valorar Activo - ${dataModal.name} - ${
					DATA_ASSETS_VALUE[dataModal.key]?.label
				}`.toUpperCase()}
				visible={toggleModal}
				onOk={handleOk}
				onCancel={handleCancel}
				okText='Guardar'
				cancelText='Cancelar'
				destroyOnClose={true}
				width='750px'
			>
				<Spin spinning={spinner}>
					<Radio.Group
						onChange={onChange}
						value={radioOption}
						className='radio-group-vertical'
					>
						<Space direction='vertical'>
							<Radio value={1}>
								<Text disabled={stateRadio.radioFirstValue}>No Aplica</Text>
							</Radio>
							<Radio value={2} />
							<Slider
								marks={marks}
								step={1}
								defaultValue={slider}
								min={1}
								max={10}
								className='slider-values'
								disabled={stateRadio.radioSecondValue}
								onChange={onChangeSlider}
							/>
							<Radio value={3} />
							<Tree
								checkable
								onCheck={onCheck}
								treeData={treeData}
								disabled={stateRadio.radioThirdValue}
								checkedKeys={tree}
								defaultExpandedKeys={dataModal?.data?.tree}
							/>
						</Space>
					</Radio.Group>
				</Spin>
			</Modal>
		</>
	)
}

export default AssetsValueModal
