import { useContext } from 'react'
import { Collapse, Table, Form, Spin } from 'antd'

import { DATA_ASSETS_VALUE } from 'constants/constants'
import SpinnerContext from 'store/context/SpinnerContext'

const TablePotentialImpactComputation = ({ assets }) => {
	const matrizImpacto = [
		['M', 'B', 'MB', 'MB', 'MB'],
		['A', 'M', 'B', 'MB', 'MB'],
		['MA', 'A', 'M', 'B', 'MB'],
	]

	const matrizRiesgo = [
		['A', 'M', 'B', 'MB', 'MB'],
		['MA', 'A', 'M', 'B', 'MB'],
		['MA', 'A', 'M', 'B', 'MB'],
		['MA', 'MA', 'A', 'M', 'B'],
		['MA', 'MA', 'A', 'M', 'B'],
	]

	const calculoImpacto = (valorActivo, valorDegradacion) => {
		// valorActivo = 5  10 7 4 1 0
		// 0 < valorActivo < 0.9 indice=4
		// 1 < valorActivo < 3.9 indice=3
		// 4 < valorActivo < 6.9 indice=2
		// 7 < valorActivo < 9.9 indice=1
		// valorActivo = 10      indice=0
		// valorDegradacion = 30%    1%-20%	30%-70%	80%-100%
		// 0 < valorDegradacion < 29 indice=0
		// 30 < valorDegradacion < 79 indice=1
		// 80 < valorDegradacion < 100 indice=2

		let valorX = -1
		let valorY = -1

		if (valorDegradacion >= 80 && valorDegradacion <= 100) {
			valorX = 2
		} else if (valorDegradacion >= 30 && valorDegradacion <= 79) {
			valorX = 1
		} else if (valorDegradacion >= 0 && valorDegradacion <= 29) {
			valorX = 0
		}

		if (valorActivo === 10) {
			valorY = 0
		} else if (valorActivo >= 7 && valorActivo <= 9.9) {
			valorY = 1
		} else if (valorActivo >= 4 && valorActivo <= 6.9) {
			valorY = 2
		} else if (valorActivo >= 1 && valorActivo <= 3.9) {
			valorY = 3
		} else if (valorActivo >= 0 && valorActivo <= 0.9) {
			valorY = 4
		}
		const result = matrizImpacto[valorX][valorY]
		return result
	}

	// eslint-disable-next-line no-unused-vars
	const calculoRiesgo = (valoProbabilidad, valorImpacto) => {
		let valorX = -1
		let valorY = -1

		if (valoProbabilidad === 'MB') {
			valorX = 0
		} else if (valoProbabilidad === 'B') {
			valorX = 1
		} else if (valoProbabilidad === 'M') {
			valorX = 2
		} else if (valoProbabilidad === 'A') {
			valorX = 3
		} else if (valoProbabilidad === 'MA') {
			valorX = 4
		}

		if (valorImpacto === 'MA') {
			valorY = 0
		} else if (valorImpacto === 'A') {
			valorY = 1
		} else if (valorImpacto === 'M') {
			valorY = 2
		} else if (valorImpacto === 'B') {
			valorY = 3
		} else if (valorImpacto === 'MB') {
			valorY = 4
		}
		const result = matrizRiesgo[valorX][valorY]
		return result
	}

	const { Panel } = Collapse
	const [form] = Form.useForm()
	const { active } = useContext(SpinnerContext)

	const columns = [
		{
			title: 'Amenazas',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: 'Impacto Acumulado',
			children: [
				{
					title: DATA_ASSETS_VALUE.availability.label,
					dataIndex: DATA_ASSETS_VALUE.availability.value,
					key: DATA_ASSETS_VALUE.availability.value,
					editable: true,
					align: 'center',
				},
				{
					title: DATA_ASSETS_VALUE.integrity.label,
					dataIndex: DATA_ASSETS_VALUE.integrity.value,
					key: DATA_ASSETS_VALUE.integrity.value,
					editable: true,
					align: 'center',
				},
				{
					title: DATA_ASSETS_VALUE.confidentiality.label,
					dataIndex: DATA_ASSETS_VALUE.confidentiality.value,
					key: DATA_ASSETS_VALUE.confidentiality.value,
					editable: true,
					align: 'center',
				},
				{
					title: DATA_ASSETS_VALUE.authenticity.label,
					dataIndex: DATA_ASSETS_VALUE.authenticity.value,
					key: DATA_ASSETS_VALUE.authenticity.value,
					editable: true,
					align: 'center',
				},
				{
					title: DATA_ASSETS_VALUE.traceability.label,
					dataIndex: DATA_ASSETS_VALUE.traceability.value,
					key: DATA_ASSETS_VALUE.traceability.value,
					editable: true,
					align: 'center',
				},
			],
		},
		{
			title: 'Impacto Residual',
			children: [
				{
					title: DATA_ASSETS_VALUE.availability.label,
					dataIndex: DATA_ASSETS_VALUE.availability.value,
					key: DATA_ASSETS_VALUE.availability.value,
					editable: true,
					align: 'center',
				},
				{
					title: DATA_ASSETS_VALUE.integrity.label,
					dataIndex: DATA_ASSETS_VALUE.integrity.value,
					key: DATA_ASSETS_VALUE.integrity.value,
					editable: true,
					align: 'center',
				},
				{
					title: DATA_ASSETS_VALUE.confidentiality.label,
					dataIndex: DATA_ASSETS_VALUE.confidentiality.value,
					key: DATA_ASSETS_VALUE.confidentiality.value,
					editable: true,
					align: 'center',
				},
				{
					title: DATA_ASSETS_VALUE.authenticity.label,
					dataIndex: DATA_ASSETS_VALUE.authenticity.value,
					key: DATA_ASSETS_VALUE.authenticity.value,
					editable: true,
					align: 'center',
				},
				{
					title: DATA_ASSETS_VALUE.traceability.label,
					dataIndex: DATA_ASSETS_VALUE.traceability.value,
					key: DATA_ASSETS_VALUE.traceability.value,
					editable: true,
					align: 'center',
				},
			],
		},
	]

	const valueData = (threat, key, valueKey, data) => {
		const threatDataF = threat[valueKey]?.find((item) => item?.keyValue === key)
		const assetValueA = data[DATA_ASSETS_VALUE.availability.value]
		const assetValueI = data[DATA_ASSETS_VALUE.integrity.value]
		const assetValueC = data[DATA_ASSETS_VALUE.confidentiality.value]
		const assetValueAU = data[DATA_ASSETS_VALUE.authenticity.value]
		const assetValueT = data[DATA_ASSETS_VALUE.traceability.value]
		if (
			valueKey === DATA_ASSETS_VALUE.availability.value &&
			threatDataF?.value &&
			assetValueA?.value
		) {
			return calculoImpacto(+assetValueA.value, +threatDataF.value)
		} else if (
			valueKey === DATA_ASSETS_VALUE.integrity.value &&
			threatDataF?.value &&
			assetValueI?.value
		) {
			return calculoImpacto(+assetValueI.value, +threatDataF.value)
		} else if (
			valueKey === DATA_ASSETS_VALUE.confidentiality.value &&
			threatDataF?.value &&
			assetValueC?.value
		) {
			return calculoImpacto(+assetValueC.value, +threatDataF.value)
		} else if (
			valueKey === DATA_ASSETS_VALUE.authenticity.value &&
			threatDataF?.value &&
			assetValueAU?.value
		) {
			return calculoImpacto(+assetValueAU.value, +threatDataF.value)
		} else if (
			valueKey === DATA_ASSETS_VALUE.traceability.value &&
			threatDataF?.value &&
			assetValueT?.value
		) {
			return calculoImpacto(+assetValueT.value, +threatDataF.value)
		} else {
			return ''
		}
	}

	const buildThreatTable = (data) => {
		const { threat } = data
		const filterData = threat?.threats?.map((threatData) => ({
			key: threatData?.key,
			name: threatData?.title,
			availability: valueData(
				threat,
				threatData?.key,
				DATA_ASSETS_VALUE.availability.value,
				data
			),
			integrity: valueData(
				threat,
				threatData?.key,
				DATA_ASSETS_VALUE.integrity.value,
				data
			),
			confidentiality: valueData(
				threat,
				threatData?.key,
				DATA_ASSETS_VALUE.confidentiality.value,
				data
			),
			authenticity: valueData(
				threat,
				threatData?.key,
				DATA_ASSETS_VALUE.authenticity.value,
				data
			),
			traceability: valueData(
				threat,
				threatData?.key,
				DATA_ASSETS_VALUE.traceability.value,
				data
			),
			vulnerability: threat?.vulnerabilities,
			threatId: threat?.id,
			dimensions: threatData?.dimensions,
		}))
		return (
			<Form form={form} component={false}>
				<Spin spinning={active}>
					<Table
						className='table-threats'
						rowClassName='editable-row'
						columns={columns}
						bordered
						dataSource={filterData}
					/>
				</Spin>
			</Form>
		)
	}

	const getPanel = () => {
		return assets.map((data, key) => (
			<Panel
				header={`${data?.name} / ${data?.model} / ${data?.identification}`}
				key={key}
			>
				{buildThreatTable(data)}
			</Panel>
		))
	}

	return <Collapse defaultActiveKey={[0]}>{getPanel()}</Collapse>
}

export default TablePotentialImpactComputation
