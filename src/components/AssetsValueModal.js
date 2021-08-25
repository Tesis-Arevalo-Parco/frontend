import { useState, useReducer } from 'react'
import { Modal, Radio, Slider, Space, Tree, Typography } from 'antd'

const AssetsValueModal = ({ toggleModal, setToggleModal, dataModal }) => {
	const { Text } = Typography
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
		setRadioOption(1)
		dispatch({ type: 'FIRST_RADIO' })
	}

	const onChange = (e) => {
		setRadioOption(e.target.value)
		if (e.target.value === 1) {
			dispatch({ type: 'FIRST_RADIO' })
		} else if (e.target.value === 2) {
			dispatch({ type: 'SECOND_RADIO' })
		} else if (e.target.value === 3) {
			dispatch({ type: 'THIRD_RADIO' })
		}
	}

	const onCheck = (checkedKeys, test) => {
		console.log(checkedKeys)
		console.log(test)
	}

	const treeData = [
		{
			title: '[pi] Información de carácter personal',
			key: 'pi',
			children: [
				{
					title:
						'6.pi1 probablemente afecte gravemente a un grupo de individuos',
					key: '6.pi1',
					value: '6',
				},
				{
					title:
						'6.pi2 probablemente quebrante seriamente la ley o algún reglamento de protección de información personal',
					key: '6.pi2',
					value: '6',
				},
				{
					title: '5.pi1 probablemente afecte gravemente a un individuo',
					key: '5.pi1',
					value: '5',
				},
				{
					title:
						'5.pi2 probablemente quebrante seriamente leyes o regulaciones',
					key: '5.pi2',
					value: '5',
				},
				{
					title: '4.pi1 probablemente afecte a un grupo de individuos',
					key: '4.pi1',
					value: '4',
				},
				{
					title: '4.pi2 probablemente quebrante leyes o regulaciones',
					key: '4.pi2',
					value: '4',
				},
				{
					title: '3.pi1 probablemente afecte a un individuo',
					key: '3.pi1',
					value: '3',
				},
				{
					title:
						'3.pi2 probablemente suponga el incumplimiento de una ley o regulación',
					key: '3.pi2',
					value: '3',
				},
				{
					title: '2.pi1 pudiera causar molestias a un individuo',
					key: '2.pi1',
					value: '2',
				},
				{
					title: '2.pi2 pudiera quebrantar de forma leve leyes o regulaciones',
					key: '2.pi2',
					value: '2',
				},
				{
					title: '1.pi1 pudiera causar molestias a un individuo',
					key: '1.pi1',
					value: '1',
				},
			],
		},
		{
			title: '[lpo] Obligaciones legales',
			key: 'lpo',
			children: [
				{
					title:
						'9.lro probablemente cause un incumplimiento excepcionalmente grave de una ley o regulación',
					key: '9.lro',
					value: '9',
				},
				{
					title:
						'7.lro probablemente cause un incumplimiento grave de una ley o regulación',
					key: '7.lro',
					value: '7',
				},
				{
					title:
						'5.lro probablemente sea causa de incumplimiento de una ley o regulación',
					key: '5.lro',
					value: '5',
				},
				{
					title:
						'3.lro probablemente sea causa de incumplimiento leve o técnico de una ley o regulación',
					key: '3.lro',
					value: '3',
				},
				{
					title:
						'1.lro pudiera causar el incumplimiento leve o técnico de una ley o regulación',
					key: '1.lro',
					value: '1',
				},
			],
		},
		{
			title: '[si] Seguridad',
			key: 'si',
			children: [
				{
					title:
						'10.si probablemente sea causa de un incidente excepcionalmente serio de seguridad o dificulte la investigación de incidentes excepcionalmente serios',
					key: '10.si',
					value: '10',
				},
				{
					title:
						'9.si probablemente sea causa de un serio incidente de seguridad o dificulte la investigación de incidentes serios',
					key: '9.si',
					value: '9',
				},
				{
					title:
						'7.si probablemente sea causa de un grave incidente de seguridad o dificulte la investigación de incidentes graves',
					key: '7.si',
					value: '7',
				},
				{
					title:
						'3.si probablemente sea causa de una merma en la seguridad o dificulte la investigación de un incidente',
					key: '3.si',
					value: '3',
				},
				{
					title:
						'1.si pudiera causar una merma en la seguridad o dificultar la investigación de un incidente',
					key: '1.si',
					value: '0',
				},
			],
		},
		{
			title: '[cei] Intereses comerciales o económicos',
			key: 'cei',
			children: [
				{
					title: '9.cei.a de enorme interés para la competencia',
					key: '9.cei.a',
					value: '9',
				},
				{
					title: '9.cei.b de muy elevado valor comercial',
					key: '9.cei.b',
					value: '9',
				},
				{
					title:
						'9.cei.c causa de pérdidas económicas excepcionalmente elevadas',
					key: '9.cei.c',
					value: '9',
				},
				{
					title:
						'9.cei.d causa de muy significativas ganancias o ventajas para individuos u organizaciones',
					key: '9.cei.d',
					value: '9',
				},
				{
					title:
						'9.cei.e constituye un incumplimiento excepcionalmente grave de las obligaciones contrac tuales relativas a la seguridad de la información proporcionada por terceros',
					key: '9.cei.e',
					value: '9',
				},
				{
					title: '7.cei.a de alto interés para la competencia',
					key: '7.cei.a',
					value: '7',
				},
				{
					title: '7.cei.b de elevado valor comercial',
					key: '7.cei.b',
					value: '7',
				},
				{
					title: '7.cei.c causa de graves pérdidas económicas',
					key: '7.cei.c',
					value: '7',
				},
				{
					title:
						'7.cei.d proporciona ganancias o ventajas desmedidas a individuos u organizaciones',
					key: '7.cei.d',
					value: '7',
				},
				{
					title:
						'7.cei.e constituye un serio incumplimiento de obligaciones contractuales relativas a la se guridad de la información proporcionada por terceros',
					key: '7.cei.e',
					value: '7',
				},
				{
					title: '3.cei.a de cierto interés para la competencia',
					key: '3.cei.a',
					value: '3',
				},
				{
					title: '3.cei.b de cierto valor comercial',
					key: '3.cei.b',
					value: '3',
				},
				{
					title: '3.cei.c causa de pérdidas financieras o merma de ingresos',
					key: '3.cei.c',
					value: '3',
				},
				{
					title:
						'3.cei.d facilita ventajas desproporcionadas a individuos u organizaciones',
					key: '3.cei.d',
					value: '3',
				},
				{
					title:
						'3.cei.e constituye un incumplimiento leve de obligaciones contractuales para mantener la seguridad de la información proporcionada por terceros',
					key: '3.cei.e',
					value: '3',
				},
				{
					title: '2.cei.a de bajo interés para la competencia',
					key: '2.cei.a',
					value: '2',
				},
				{
					title: '2.cei.b de bajo valor comercial',
					key: '2.cei.b',
					value: '2',
				},
				{
					title: '1.cei.a de pequeño interés para la competencia',
					key: '1.cei.a',
					value: '1',
				},
				{
					title: '1.cei.b de pequeño valor comercial',
					key: '1.cei.b',
					value: '1',
				},
				{
					title: '0 0.3 supondría pérdidas económicas mínimas',
					key: '0.0.3',
					value: '0',
				},
			],
		},
		{
			title: '[da] Interrupción del servicio',
			key: 'da',
			children: [
				{
					title:
						'9.da Probablemente cause una interrupción excepcionalmente seria de las actividades propias de la Organización con un serio impacto en otras organizaciones',
					key: '9.da',
					value: '9',
				},
				{
					title:
						'9.da2 Probablemente tenga un serio impacto en otras organizaciones',
					key: '9.da2',
					value: '9',
				},
				{
					title:
						'7.da Probablemente cause una interrupción seria de las actividades propias de la Or?ganización con un impacto significativo en otras organizaciones',
					key: '7.da',
					value: '7',
				},
				{
					title:
						'7.da2 Probablemente tenga un gran impacto en otras organizaciones',
					key: '7.da2',
					value: '7',
				},
				{
					title:
						'5.da Probablemente cause la interrupción de actividades propias de la Organización con impacto en otras organizaciones',
					key: '5.da',
					value: '5',
				},
				{
					title:
						'5.da2 Probablemente cause un cierto impacto en otras organizaciones',
					key: '5.da2',
					value: '5',
				},
				{
					title:
						'3.da Probablemente cause la interrupción de actividades propias de la Organización',
					key: '3.da',
					value: '3',
				},
				{
					title:
						'1.da Pudiera causar la interrupción de actividades propias de la Organización ',
					key: '1.da',
					value: '1',
				},
			],
		},
		{
			title: '[po] Orden público',
			key: 'po',
			children: [
				{
					title: '9.po alteración seria del orden público',
					key: '9.po',
					value: '9',
				},
				{
					title:
						'6.po probablemente cause manifestaciones, o presiones significativas',
					key: '6.po',
					value: '6',
				},
				{
					title: '3.po causa de protestas puntuales',
					key: '3.po',
					value: '3',
				},
				{
					title: '1.po pudiera causar protestas puntuales',
					key: '1.po',
					value: '1',
				},
			],
		},
		{
			title: '[olm] Operaciones',
			key: 'olm',
			children: [
				{
					title:
						'10.olm Probablemente cause un daño excepcionalmente serio a la eficacia o seguridad de la misión operativa o logística',
					key: '10.olm',
					value: '10',
				},
				{
					title:
						'9.olm Probablemente cause un daño serio a la eficacia o seguridad de la misión operativa o logística',
					key: '9.olm',
					value: '9',
				},
				{
					title:
						'7.olm Probablemente perjudique la eficacia o seguridad de la misión operativa o logística',
					key: '7.olm',
					value: '7',
				},
				{
					title:
						'5.olm Probablemente merme la eficacia o seguridad de la misión operativa o logística más allá del ámbito local',
					key: '5.olm',
					value: '5',
				},
				{
					title:
						'3.olm Probablemente merme la eficacia o seguridad de la misión operativa o logística (alcance local)',
					key: '3.olm',
					value: '3',
				},
				{
					title:
						'1.olm Pudiera mermar la eficacia o seguridad de la misión operativa o logística (alcance local)',
					key: '1.olm',
					value: '1',
				},
			],
		},
		{
			title: '[adm] Administración y gestión',
			key: 'adm',
			children: [
				{
					title:
						'9.adm probablemente impediría seriamente la operación efectiva de la Organización, pudiendo llegar a su cierre',
					key: '9.adm',
					value: '9',
				},
				{
					title:
						'7.adm probablemente impediría la operación efectiva de la Organización',
					key: '7.adm',
					value: '7',
				},
				{
					title:
						'5.adm probablemente impediría la operación efectiva de más de una parte de la Organización',
					key: '5.adm',
					value: '5',
				},
				{
					title:
						'3.adm probablemente impediría la operación efectiva de una parte de la Organización',
					key: '3.adm',
					value: '3',
				},
				{
					title:
						'1.adm pudiera impedir la operación efectiva de una parte de la Organización',
					key: '1.adm',
					value: '1',
				},
			],
		},
		{
			title: '[lg] Pérdida de confianza (reputación)',
			key: 'lg',
			children: [
				{
					title:
						'9.lg.a Probablemente causaría una publicidad negativa generalizada por afectar de forma excepcionalmente grave a las relaciones a las relaciones con otras organizaciones ',
					key: '9.lg.a',
					value: '9',
				},
				{
					title:
						'9.lg.b Probablemente causaría una publicidad negativa generalizada por afectar de forma excepcionalmente grave a las relaciones a las relaciones con el público en general',
					key: '9.lg.b',
					value: '9',
				},
				{
					title:
						'7.lg.a Probablemente causaría una publicidad negativa generalizada por afectar grave mente a las relaciones con otras organizaciones',
					key: '7.lg.a',
					value: '7',
				},
				{
					title:
						'7.lg.b Probablemente causaría una publicidad negativa generalizada por afectar grave mente a las relaciones con el público en general',
					key: '7.lg.b',
					value: '7',
				},
				{
					title:
						'5.lg.a Probablemente sea causa una cierta publicidad negativa por afectar negativamen te a las relaciones con otras organizaciones',
					key: '5.lg.a',
					value: '5',
				},
				{
					title:
						'5.lg.b Probablemente sea causa una cierta publicidad negativa por afectar negativamen te a las relaciones con el público',
					key: '5.lg.b',
					value: '5',
				},
				{
					title:
						'3.lg Probablemente afecte negativamente a las relaciones internas de la Organización',
					key: '3.lg',
					value: '3',
				},
				{
					title:
						'2.lg Probablemente cause una pérdida menor de la confianza dentro de la Organización',
					key: '2.lg',
					value: '2',
				},
				{
					title:
						'1.lg Pudiera causar una pérdida menor de la confianza dentro de la Organización',
					key: '1.lg',
					value: '1',
				},
				{
					title:
						'0.4 no supondría daño a la reputación o buena imagen de las personas u organizaciones',
					key: '0.4',
					value: '0',
				},
			],
		},
		{
			title: '[crm] Persecución de delitos',
			key: 'crm',
			children: [
				{
					title:
						'8.crm Impida la investigación de delitos graves o facilite su comisión',
					key: '8.crm',
					value: '8',
				},
				{
					title:
						'4.crm Dificulte la investigación o facilite la comisión de delitos',
					key: '4.crm',
					value: '4',
				},
			],
		},
		{
			title: '[rto] Tiempo de recuperación del servicio',
			key: 'rto',
			children: [
				{
					title: '7.rto RTO < 4 horas',
					key: '7.rto',
					value: '7',
				},
				{
					title: '4.rto 4 horas < RTO < 1 día',
					key: '4.rto',
					value: '4',
				},
				{
					title: '1.rto 1 día < RTO < 5 días',
					key: '1.rto',
					value: '1',
				},
				{
					title: '0.rto 5 días < RTO',
					key: '0.rto',
					value: '0',
				},
			],
		},
		{
			title: '[lbl.nat] Información clasificada (nacional)',
			key: 'lbl.nat',
			children: [
				{
					title: '10.lbl Secreto',
					key: '10.lbl',
					value: '10',
				},
				{
					title: '9.lbl Reservado',
					key: '9.lbl',
					value: '9',
				},
				{
					title: '8.lbl Confidencial',
					key: '8.lbl',
					value: '8',
				},
				{
					title: '7.lbl Confidencial',
					key: '7.lbl',
					value: '7',
				},
				{
					title: '6.lbl Difusión limitada',
					key: '6.lbl',
					value: '6',
				},
				{
					title: '5.lbl Difusión limitada',
					key: '5.lbl',
					value: '5',
				},
				{
					title: '4.lbl Difusión limitada',
					key: '4.lbl',
					value: '4',
				},
				{
					title: '3.lbl Difusión limitada',
					key: '3.lbl',
					value: '3',
				},
				{
					title: '2.lbl Sin clasificar',
					key: '2.lbl',
					value: '2',
				},
				{
					title: '1.lbl Sin clasificar ',
					key: '1.lbl',
					value: '1',
				},
			],
		},
		{
			title: '[lbl.ue] Información clasificada (Unión Europea)',
			key: 'lbl.ue',
			children: [
				{
					title: '10.ue TRES SECRET UE',
					key: '10.ue',
					value: '10',
				},
				{
					title: '9.ue SECRET UE',
					key: '9.ue',
					value: '9',
				},
				{
					title: '8.ue CONFIDENTIEL UE',
					key: '8.ue',
					value: '8',
				},
				{
					title: '7.ue CONFIDENTIEL UE',
					key: '7.ue',
					value: '7',
				},
				{
					title: '6.ue RESTREINT UE',
					key: '6.ue',
					value: '6',
				},
				{
					title: '5.ue RESTREINT UE',
					key: '5.ue',
					value: '5',
				},
				{
					title: '4.ue RESTREINT UE',
					key: '4.ue',
					value: '4',
				},
				{
					title: '3.ue RESTREINT UE',
					key: '3.ue',
					value: '3',
				},
			],
		},
	]

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
						<Radio value={1}>
							<Text disabled={stateRadio.radioFirstValue}>No Aplica</Text>
						</Radio>
						<Radio value={2} />
						<Slider
							marks={marks}
							step={1}
							defaultValue={1}
							min={1}
							max={10}
							className='slider-values'
							disabled={stateRadio.radioSecondValue}
						/>
						<Radio value={3} />
						<Tree
							checkable
							onCheck={onCheck}
							treeData={treeData}
							disabled={stateRadio.radioThirdValue}
							// defaultCheckedKeys={assetsFormData.classType}
							// checkedKeys={tree}
							// style={{ marginBottom: '12px' }}
						/>
					</Space>
				</Radio.Group>
				<div>
					{dataModal.id}-{dataModal.name}-{dataModal.key}
				</div>
			</Modal>
		</>
	)
}

export default AssetsValueModal
