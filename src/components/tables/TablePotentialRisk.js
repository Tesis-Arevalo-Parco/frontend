import { useContext, useEffect, useState } from 'react'
import { Collapse, Table, Form, Spin } from 'antd'
import {
	DATA_ASSETS_VALUE,
	matrizImpacto,
	matrizRiesgo,
} from 'constants/constants'
import SpinnerContext from 'store/context/SpinnerContext'

const TablePotentialRisk = ({ assets, assetsDependencies }) => {
	const [accumulatedValuesData, setAccumulatedValuesData] = useState([])
	const getDependenciesAssetsLevels = (dependencies, level) =>
		dependencies.filter((item) => item?.value === level)

	const findNodeIndex = (arrayNode, id) =>
		arrayNode.find((item) => item?.id === id)

	const getNodeIds = (nodeLevels) => {
		const nodes = []
		nodeLevels?.forEach((itemLevel) => {
			if (!findNodeIndex(nodes, itemLevel?.firstAsset?.id)) {
				nodes.push({
					id: itemLevel?.firstAsset?.id,
					name: itemLevel?.firstAsset?.name,
					availability: itemLevel?.firstAsset?.availability,
					integrity: itemLevel?.firstAsset?.integrity,
					confidentiality: itemLevel?.firstAsset?.confidentiality,
					authenticity: itemLevel?.firstAsset?.authenticity,
					traceability: itemLevel?.firstAsset?.traceability,
					threat: itemLevel?.firstAsset?.threat,
				})
			}
			if (!findNodeIndex(nodes, itemLevel?.secondAsset?.id)) {
				nodes.push({
					id: itemLevel?.secondAsset?.id,
					name: itemLevel?.secondAsset?.name,
					availability: itemLevel?.secondAsset?.availability,
					integrity: itemLevel?.secondAsset?.integrity,
					confidentiality: itemLevel?.secondAsset?.confidentiality,
					authenticity: itemLevel?.secondAsset?.authenticity,
					traceability: itemLevel?.secondAsset?.traceability,
					threat: itemLevel?.secondAsset?.threat,
				})
			}
		})
		return nodes
	}
	const treeData = {
		levelOne: [],
		levelTwo: [],
		levelThree: [],
		levelFour: [],
		levelFive: [],
	}

	const fillTreeData = (firstNodes, secondNodes, thirdNodes, fourthNode) => {
		firstNodes?.forEach((node) => {
			const secondNode = secondNodes.find((item) => item.id === node.id)
			if (!secondNode) {
				treeData.levelOne.push({
					id: node.id,
					name: node.name,
					availability: node?.availability,
					integrity: node?.integrity,
					confidentiality: node?.confidentiality,
					authenticity: node?.authenticity,
					traceability: node?.traceability,
					threat: node?.threat,
					parent: [],
				})
			}
		})
		secondNodes?.forEach((node) => {
			const firstNode = firstNodes.find((item) => item.id === node.id)
			if (firstNode) {
				treeData.levelTwo.push({
					id: node.id,
					name: node.name,
					availability: node?.availability,
					integrity: node?.integrity,
					confidentiality: node?.confidentiality,
					authenticity: node?.authenticity,
					traceability: node?.traceability,
					threat: node?.threat,
					parent: [],
				})
			}
		})
		thirdNodes?.forEach((node) => {
			const secondNode = secondNodes.find((item) => item.id === node.id)
			if (secondNode) {
				treeData.levelThree.push({
					id: node.id,
					name: node.name,
					availability: node?.availability,
					integrity: node?.integrity,
					confidentiality: node?.confidentiality,
					authenticity: node?.authenticity,
					traceability: node?.traceability,
					threat: node?.threat,
					parent: [],
				})
			}
		})
		fourthNode?.forEach((node) => {
			const thirdNode = thirdNodes.find((item) => item.id === node.id)
			if (thirdNode) {
				treeData.levelFour.push({
					id: node.id,
					name: node.name,
					availability: node?.availability,
					integrity: node?.integrity,
					confidentiality: node?.confidentiality,
					authenticity: node?.authenticity,
					traceability: node?.traceability,
					threat: node?.threat,
					parent: [],
				})
			} else {
				treeData.levelFive.push({
					id: node.id,
					name: node.name,
					availability: node?.availability,
					integrity: node?.integrity,
					confidentiality: node?.confidentiality,
					authenticity: node?.authenticity,
					traceability: node?.traceability,
					threat: node?.threat,
					parent: [],
				})
			}
		})
	}

	const fillTreeDataWithValues = (level, treeDataLevel, levelName) => {
		level.forEach((itemLevel) => {
			const findFirstAsset = treeDataLevel.find(
				(item) => item?.id === itemLevel?.firstAsset?.id
			)
			const findSecondAsset = treeDataLevel.find(
				(item) => item?.id === itemLevel?.secondAsset?.id
			)
			if (findFirstAsset) {
				const findParent = treeData[levelName].find(
					(item) => item?.id === itemLevel?.secondAsset?.id
				)
				if (findParent) {
					if (levelName === 'levelThree') {
						const levelTwoData = treeData.levelTwo.find(
							(item) => item?.id === itemLevel?.firstAsset?.id
						)
						if (levelTwoData) {
							const finalData = [
								...findParent?.parent,
								...levelTwoData?.parent,
								{
									id: itemLevel?.firstAsset?.id,
									name: itemLevel?.firstAsset?.name,
									availability: itemLevel?.firstAsset?.availability,
									integrity: itemLevel?.firstAsset?.integrity,
									confidentiality: itemLevel?.firstAsset?.confidentiality,
									authenticity: itemLevel?.firstAsset?.authenticity,
									traceability: itemLevel?.firstAsset?.traceability,
									threat: itemLevel?.firstAsset?.threat,
								},
							]
							findParent?.parent?.push(...finalData?.flat())
						} else {
							findParent?.parent?.push({
								id: itemLevel?.firstAsset?.id,
								name: itemLevel?.firstAsset?.name,
								availability: itemLevel?.firstAsset?.availability,
								integrity: itemLevel?.firstAsset?.integrity,
								confidentiality: itemLevel?.firstAsset?.confidentiality,
								authenticity: itemLevel?.firstAsset?.authenticity,
								traceability: itemLevel?.firstAsset?.traceability,
								threat: itemLevel?.firstAsset?.threat,
							})
						}
					} else if (levelName === 'levelFour') {
						const levelThreeData = treeData.levelThree.find(
							(item) => item?.id === itemLevel?.firstAsset?.id
						)
						if (levelThreeData) {
							const finalData = [
								...findParent?.parent,
								...levelThreeData?.parent,
								{
									id: itemLevel?.firstAsset?.id,
									name: itemLevel?.firstAsset?.name,
									availability: itemLevel?.firstAsset?.availability,
									integrity: itemLevel?.firstAsset?.integrity,
									confidentiality: itemLevel?.firstAsset?.confidentiality,
									authenticity: itemLevel?.firstAsset?.authenticity,
									traceability: itemLevel?.firstAsset?.traceability,
									threat: itemLevel?.firstAsset?.threat,
								},
							]
							findParent?.parent?.push(...finalData?.flat())
						} else {
							findParent?.parent?.push({
								id: itemLevel?.firstAsset?.id,
								name: itemLevel?.firstAsset?.name,
								availability: itemLevel?.firstAsset?.availability,
								integrity: itemLevel?.firstAsset?.integrity,
								confidentiality: itemLevel?.firstAsset?.confidentiality,
								authenticity: itemLevel?.firstAsset?.authenticity,
								traceability: itemLevel?.firstAsset?.traceability,
								threat: itemLevel?.firstAsset?.threat,
							})
						}
					} else if (levelName === 'levelFive') {
						const levelFourData = treeData.levelFour.find(
							(item) => item?.id === itemLevel?.firstAsset?.id
						)
						if (levelFourData) {
							const finalData = [
								...findParent?.parent,
								...levelFourData?.parent,
								{
									id: itemLevel?.firstAsset?.id,
									name: itemLevel?.firstAsset?.name,
									availability: itemLevel?.firstAsset?.availability,
									integrity: itemLevel?.firstAsset?.integrity,
									confidentiality: itemLevel?.firstAsset?.confidentiality,
									authenticity: itemLevel?.firstAsset?.authenticity,
									traceability: itemLevel?.firstAsset?.traceability,
									threat: itemLevel?.firstAsset?.threat,
								},
							]
							findParent?.parent?.push(...finalData?.flat())
						} else {
							findParent?.parent?.push({
								id: itemLevel?.firstAsset?.id,
								name: itemLevel?.firstAsset?.name,
								availability: itemLevel?.firstAsset?.availability,
								integrity: itemLevel?.firstAsset?.integrity,
								confidentiality: itemLevel?.firstAsset?.confidentiality,
								authenticity: itemLevel?.firstAsset?.authenticity,
								traceability: itemLevel?.firstAsset?.traceability,
								threat: itemLevel?.firstAsset?.threat,
							})
						}
					} else {
						findParent?.parent?.push({
							id: itemLevel?.firstAsset?.id,
							name: itemLevel?.firstAsset?.name,
							availability: itemLevel?.firstAsset?.availability,
							integrity: itemLevel?.firstAsset?.integrity,
							confidentiality: itemLevel?.firstAsset?.confidentiality,
							authenticity: itemLevel?.firstAsset?.authenticity,
							traceability: itemLevel?.firstAsset?.traceability,
							threat: itemLevel?.firstAsset?.threat,
						})
					}
				}
			}
			if (findSecondAsset) {
				const findParent = treeData[levelName].find(
					(item) => item?.id === itemLevel?.firstAsset?.id
				)
				if (findParent) {
					if (levelName === 'levelThree') {
						const levelTwoData = treeData.levelTwo.find(
							(item) => item?.id === itemLevel?.secondAsset?.id
						)
						if (levelTwoData) {
							const finalData = [
								...findParent?.parent,
								...levelTwoData?.parent,
								{
									id: itemLevel?.secondAsset?.id,
									name: itemLevel?.secondAsset?.name,
									availability: itemLevel?.secondAsset?.availability,
									integrity: itemLevel?.secondAsset?.integrity,
									confidentiality: itemLevel?.secondAsset?.confidentiality,
									authenticity: itemLevel?.secondAsset?.authenticity,
									traceability: itemLevel?.secondAsset?.traceability,
									threat: itemLevel?.secondAsset?.threat,
								},
							]
							findParent?.parent?.push(...finalData?.flat())
						} else {
							findParent?.parent?.push({
								id: itemLevel?.secondAsset?.id,
								name: itemLevel?.secondAsset?.name,
								availability: itemLevel?.secondAsset?.availability,
								integrity: itemLevel?.secondAsset?.integrity,
								confidentiality: itemLevel?.secondAsset?.confidentiality,
								authenticity: itemLevel?.secondAsset?.authenticity,
								traceability: itemLevel?.secondAsset?.traceability,
								threat: itemLevel?.secondAsset?.threat,
							})
						}
					} else if (levelName === 'levelFour') {
						const levelThreeData = treeData.levelThree.find(
							(item) => item?.id === itemLevel?.secondAsset?.id
						)
						if (levelThreeData) {
							const finalData = [
								...findParent?.parent,
								...levelThreeData?.parent,
								{
									id: itemLevel?.secondAsset?.id,
									name: itemLevel?.secondAsset?.name,
									availability: itemLevel?.secondAsset?.availability,
									integrity: itemLevel?.secondAsset?.integrity,
									confidentiality: itemLevel?.secondAsset?.confidentiality,
									authenticity: itemLevel?.secondAsset?.authenticity,
									traceability: itemLevel?.secondAsset?.traceability,
									threat: itemLevel?.secondAsset?.threat,
								},
							]
							findParent?.parent?.push(...finalData?.flat())
						} else {
							findParent?.parent?.push({
								id: itemLevel?.secondAsset?.id,
								name: itemLevel?.secondAsset?.name,
								availability: itemLevel?.secondAsset?.availability,
								integrity: itemLevel?.secondAsset?.integrity,
								confidentiality: itemLevel?.secondAsset?.confidentiality,
								authenticity: itemLevel?.secondAsset?.authenticity,
								traceability: itemLevel?.secondAsset?.traceability,
								threat: itemLevel?.secondAsset?.threat,
							})
						}
					} else if (levelName === 'levelFive') {
						const levelFourData = treeData.levelFour.find(
							(item) => item?.id === itemLevel?.secondAsset?.id
						)
						if (levelFourData) {
							const finalData = [
								...findParent?.parent,
								...levelFourData?.parent,
								{
									id: itemLevel?.secondAsset?.id,
									name: itemLevel?.secondAsset?.name,
									availability: itemLevel?.secondAsset?.availability,
									integrity: itemLevel?.secondAsset?.integrity,
									confidentiality: itemLevel?.secondAsset?.confidentiality,
									authenticity: itemLevel?.secondAsset?.authenticity,
									traceability: itemLevel?.secondAsset?.traceability,
									threat: itemLevel?.secondAsset?.threat,
								},
							]
							findParent?.parent?.push(...finalData?.flat())
						} else {
							findParent?.parent?.push({
								id: itemLevel?.secondAsset?.id,
								name: itemLevel?.secondAsset?.name,
								availability: itemLevel?.secondAsset?.availability,
								integrity: itemLevel?.secondAsset?.integrity,
								confidentiality: itemLevel?.secondAsset?.confidentiality,
								authenticity: itemLevel?.secondAsset?.authenticity,
								traceability: itemLevel?.secondAsset?.traceability,
								threat: itemLevel?.secondAsset?.threat,
							})
						}
					} else {
						findParent?.parent?.push({
							id: itemLevel?.secondAsset?.id,
							name: itemLevel?.secondAsset?.name,
							availability: itemLevel?.secondAsset?.availability,
							integrity: itemLevel?.secondAsset?.integrity,
							confidentiality: itemLevel?.secondAsset?.confidentiality,
							authenticity: itemLevel?.secondAsset?.authenticity,
							traceability: itemLevel?.secondAsset?.traceability,
							threat: itemLevel?.secondAsset?.threat,
						})
					}
				}
			}
		})
	}

	const getValuesData = (item, dimension) => {
		const parentValue = item[dimension]?.value
		const childValue = item?.parent?.map(
			(parentValue) => parentValue[dimension]?.value
		)

		return { parentValue, childValue }
	}

	const generateAccumulatedValues = (item, accumulatedObject, dimension) => {
		const { childValue, parentValue } = getValuesData(item, dimension)

		if (childValue?.length) {
			const maxValue = Math.max(...childValue)
			if (maxValue > parentValue) {
				accumulatedObject[dimension] = maxValue
			} else {
				accumulatedObject[dimension] = parentValue
			}
		}
	}
	const accumulatedValues = []
	const generateAccumulatedValuesForLevel = (level) => {
		level.forEach((item) => {
			const accumulatedObject = {
				id: item?.id,
				name: item?.name,
				threat: item?.threat,
			}
			generateAccumulatedValues(
				item,
				accumulatedObject,
				DATA_ASSETS_VALUE.availability.value
			)
			generateAccumulatedValues(
				item,
				accumulatedObject,
				DATA_ASSETS_VALUE.integrity.value
			)
			generateAccumulatedValues(
				item,
				accumulatedObject,
				DATA_ASSETS_VALUE.confidentiality.value
			)
			generateAccumulatedValues(
				item,
				accumulatedObject,
				DATA_ASSETS_VALUE.authenticity.value
			)
			generateAccumulatedValues(
				item,
				accumulatedObject,
				DATA_ASSETS_VALUE.traceability.value
			)
			accumulatedValues.push(accumulatedObject)
		})
	}

	const setAccumulatedValues = (data) => {
		data?.levelOne.forEach((item) => {
			accumulatedValues.push({
				id: item?.id,
				name: item?.name,
				threat: item?.threat,
				availability: item?.availability?.value,
				integrity: item?.integrity?.value,
				confidentiality: item?.confidentiality?.value,
				authenticity: item?.authenticity?.value,
				traceability: item?.traceability?.value,
			})
		})
		generateAccumulatedValuesForLevel(data?.levelTwo)
		generateAccumulatedValuesForLevel(data?.levelThree)
		generateAccumulatedValuesForLevel(data?.levelFour)
		generateAccumulatedValuesForLevel(data?.levelFive)
		setAccumulatedValuesData(accumulatedValues)
	}
	useEffect(() => {
		if (assets.length && assetsDependencies.length) {
			const firstLevel = getDependenciesAssetsLevels(assetsDependencies, 1)
			const secondLevel = getDependenciesAssetsLevels(assetsDependencies, 2)
			const thirdLevel = getDependenciesAssetsLevels(assetsDependencies, 3)
			const fourthLevel = getDependenciesAssetsLevels(assetsDependencies, 4)

			const firstNodes = getNodeIds(firstLevel)
			const secondNodes = getNodeIds(secondLevel)
			const thirdNodes = getNodeIds(thirdLevel)
			const fourthNode = getNodeIds(fourthLevel)
			fillTreeData(firstNodes, secondNodes, thirdNodes, fourthNode)
			fillTreeDataWithValues(firstLevel, treeData.levelOne, 'levelTwo')
			fillTreeDataWithValues(secondLevel, treeData.levelTwo, 'levelThree')
			fillTreeDataWithValues(thirdLevel, treeData.levelThree, 'levelFour')
			fillTreeDataWithValues(fourthLevel, treeData.levelFour, 'levelFive')
			setAccumulatedValues(treeData)
		}
	}, [assets, assetsDependencies])

	// Impacto Repercutido Potencial
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
		if (valorX === -1 || valorY === -1) {
			return ''
		}
		const result = matrizImpacto[valorX][valorY]
		return result
	}

	// Impacto Acumulado Potencial - considerar el valor de la dependencia
	const calculoImpactoAcumulado = (valorAcumuladoActivo, valorDegradacion) => {
		// valorAcumualadoActivo => es el valor de la dependencia 1,2,3,4
		// 0 < valorAcumuladoActivo < 0.9 indice=4
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

		if (valorAcumuladoActivo === 10) {
			valorY = 0
		} else if (valorAcumuladoActivo >= 7 && valorAcumuladoActivo <= 9.9) {
			valorY = 1
		} else if (valorAcumuladoActivo >= 4 && valorAcumuladoActivo <= 6.9) {
			valorY = 2
		} else if (valorAcumuladoActivo >= 1 && valorAcumuladoActivo <= 3.9) {
			valorY = 3
		} else if (valorAcumuladoActivo >= 0 && valorAcumuladoActivo <= 0.9) {
			valorY = 4
		}
		if (valorX === -1 || valorY === -1) {
			return ''
		}
		const result = matrizImpacto[valorX][valorY]
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
			title: 'Riesgo Acumulado Potencial',
			children: [
				{
					title: DATA_ASSETS_VALUE.availability.label,
					dataIndex: `${DATA_ASSETS_VALUE.availability.value}Acumulado`,
					key: `${DATA_ASSETS_VALUE.availability.value}Acumulado`,
					editable: true,
					align: 'center',
				},
				{
					title: DATA_ASSETS_VALUE.integrity.label,
					dataIndex: `${DATA_ASSETS_VALUE.integrity.value}Acumulado`,
					key: `${DATA_ASSETS_VALUE.integrity.value}Acumulado`,
					editable: true,
					align: 'center',
				},
				{
					title: DATA_ASSETS_VALUE.confidentiality.label,
					dataIndex: `${DATA_ASSETS_VALUE.confidentiality.value}Acumulado`,
					key: `${DATA_ASSETS_VALUE.confidentiality.value}Acumulado`,
					editable: true,
					align: 'center',
				},
				{
					title: DATA_ASSETS_VALUE.authenticity.label,
					dataIndex: `${DATA_ASSETS_VALUE.authenticity.value}Acumulado`,
					key: `${DATA_ASSETS_VALUE.authenticity.value}Acumulado`,
					editable: true,
					align: 'center',
				},
				{
					title: DATA_ASSETS_VALUE.traceability.label,
					dataIndex: `${DATA_ASSETS_VALUE.traceability.value}Acumulado`,
					key: `${DATA_ASSETS_VALUE.traceability.value}Acumulado`,
					editable: true,
					align: 'center',
				},
			],
		},
		{
			title: 'Riesgo Repercutido Potencial',
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

	// eslint-disable-next-line no-unused-vars
	// Riesgo repercutido Potencial
	// --> valoProbabilidad --> Valoración de Amenazas
	// --> valorImpacto --> Impacto Potencial
	const calculoRiesgo = (valoProbabilidad, valorImpacto) => {
		let valorX = -1
		let valorY = -1

		if (valoProbabilidad === 100) {
			valorX = 4
		} else if (valoProbabilidad >= 10 && valoProbabilidad <= 99) {
			valorX = 3
		} else if (valoProbabilidad >= 1 && valoProbabilidad <= 9) {
			valorX = 2
		} else if (valoProbabilidad >= 0.1 && valoProbabilidad <= 0.9) {
			valorX = 1
		} else if (valoProbabilidad >= 0.01 && valoProbabilidad <= 0.09) {
			valorX = 0
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
		if (valorX === -1 || valorY === -1) {
			return ''
		}
		const result = matrizRiesgo[valorX][valorY]
		return result
	}

	// Riesgo cumulado Potencial
	// --> valoProbabilidad --> Valoración de Amenazas
	// --> valorImpacto --> Impacto Potencial Acumulado
	const calculoRiesgoAcumulado = (valoProbabilidad, valorImpactoAcumualado) => {
		let valorX = -1
		let valorY = -1

		if (valoProbabilidad === 100) {
			valorX = 4
		} else if (valoProbabilidad >= 10 && valoProbabilidad <= 99) {
			valorX = 3
		} else if (valoProbabilidad >= 1 && valoProbabilidad <= 9) {
			valorX = 2
		} else if (valoProbabilidad >= 0.1 && valoProbabilidad <= 0.9) {
			valorX = 1
		} else if (valoProbabilidad >= 0.01 && valoProbabilidad <= 0.09) {
			valorX = 0
		}

		if (valorImpactoAcumualado === 'MA') {
			valorY = 0
		} else if (valorImpactoAcumualado === 'A') {
			valorY = 1
		} else if (valorImpactoAcumualado === 'M') {
			valorY = 2
		} else if (valorImpactoAcumualado === 'B') {
			valorY = 3
		} else if (valorImpactoAcumualado === 'MB') {
			valorY = 4
		}
		if (valorX === -1 || valorY === -1) {
			return ''
		}
		const result = matrizRiesgo[valorX][valorY]
		return result
	}

	const valueData = (threat, key, valueKey, data, probability) => {
		const getProbability = probability?.find((item) => item?.keyValue === key)
		const threatDataF = threat[valueKey]?.find((item) => item?.keyValue === key)
		const assetValueA = data[DATA_ASSETS_VALUE.availability.value]
		const assetValueI = data[DATA_ASSETS_VALUE.integrity.value]
		const assetValueC = data[DATA_ASSETS_VALUE.confidentiality.value]
		const assetValueAU = data[DATA_ASSETS_VALUE.authenticity.value]
		const assetValueT = data[DATA_ASSETS_VALUE.traceability.value]
		if (
			valueKey === DATA_ASSETS_VALUE.availability.value &&
			threatDataF?.value &&
			assetValueA?.value &&
			getProbability?.value
		) {
			const impacto = calculoImpacto(+assetValueA.value, +threatDataF.value)
			return calculoRiesgo(getProbability?.value, impacto)
		} else if (
			valueKey === DATA_ASSETS_VALUE.integrity.value &&
			threatDataF?.value &&
			assetValueI?.value &&
			getProbability?.value
		) {
			const impacto = calculoImpacto(+assetValueI.value, +threatDataF.value)
			return calculoRiesgo(getProbability?.value, impacto)
		} else if (
			valueKey === DATA_ASSETS_VALUE.confidentiality.value &&
			threatDataF?.value &&
			assetValueC?.value &&
			getProbability?.value
		) {
			const impacto = calculoImpacto(+assetValueC.value, +threatDataF.value)
			return calculoRiesgo(getProbability?.value, impacto)
		} else if (
			valueKey === DATA_ASSETS_VALUE.authenticity.value &&
			threatDataF?.value &&
			assetValueAU?.value &&
			getProbability?.value
		) {
			const impacto = calculoImpacto(+assetValueAU.value, +threatDataF.value)
			return calculoRiesgo(getProbability?.value, impacto)
		} else if (
			valueKey === DATA_ASSETS_VALUE.traceability.value &&
			threatDataF?.value &&
			assetValueT?.value &&
			getProbability?.value
		) {
			const impacto = calculoImpacto(+assetValueT.value, +threatDataF.value)
			return calculoRiesgo(getProbability?.value, impacto)
		} else {
			return ''
		}
	}

	const valueDataAccumulated = (threat, key, valueKey, data, probability) => {
		const getProbability = probability?.find((item) => item?.keyValue === key)
		const threatDataF = threat[valueKey]?.find((item) => item?.keyValue === key)
		const assetValueA = data?.availabilityAcumulado
		const assetValueI = data?.integrityAcumulado
		const assetValueC = data?.confidentialityAcumulado
		const assetValueAU = data?.authenticityAcumulado
		const assetValueT = data?.traceabilityAcumulado
		if (
			valueKey === DATA_ASSETS_VALUE.availability.value &&
			threatDataF?.value &&
			assetValueA &&
			getProbability?.value
		) {
			const impactoAccumulado = calculoImpactoAcumulado(
				+assetValueA,
				+threatDataF.value
			)
			return calculoRiesgoAcumulado(getProbability?.value, impactoAccumulado)
		} else if (
			valueKey === DATA_ASSETS_VALUE.integrity.value &&
			threatDataF?.value &&
			assetValueI &&
			getProbability?.value
		) {
			const impactoAccumulado = calculoImpactoAcumulado(
				+assetValueI,
				+threatDataF.value
			)
			return calculoRiesgoAcumulado(getProbability?.value, impactoAccumulado)
		} else if (
			valueKey === DATA_ASSETS_VALUE.confidentiality.value &&
			threatDataF?.value &&
			assetValueC &&
			getProbability?.value
		) {
			const impactoAccumulado = calculoImpactoAcumulado(
				+assetValueC,
				+threatDataF.value
			)
			return calculoRiesgoAcumulado(getProbability?.value, impactoAccumulado)
		} else if (
			valueKey === DATA_ASSETS_VALUE.authenticity.value &&
			threatDataF?.value &&
			assetValueAU &&
			getProbability?.value
		) {
			const impactoAccumulado = calculoImpactoAcumulado(
				+assetValueAU,
				+threatDataF.value
			)
			return calculoRiesgoAcumulado(getProbability?.value, impactoAccumulado)
		} else if (
			valueKey === DATA_ASSETS_VALUE.traceability.value &&
			threatDataF?.value &&
			assetValueT &&
			getProbability?.value
		) {
			const impactoAccumulado = calculoImpactoAcumulado(
				+assetValueT,
				+threatDataF.value
			)
			return calculoRiesgoAcumulado(getProbability?.value, impactoAccumulado)
		} else {
			return ''
		}
	}

	const buildThreatTable = (data) => {
		const { threat } = data
		const filterData = threat?.threats?.map((threatData) => ({
			key: threatData?.key,
			name: threatData?.title,
			availabilityAcumulado: valueDataAccumulated(
				threat,
				threatData?.key,
				DATA_ASSETS_VALUE.availability.value,
				data,
				threat?.probability
			),
			integrityAcumulado: valueDataAccumulated(
				threat,
				threatData?.key,
				DATA_ASSETS_VALUE.integrity.value,
				data,
				threat?.probability
			),
			confidentialityAcumulado: valueDataAccumulated(
				threat,
				threatData?.key,
				DATA_ASSETS_VALUE.confidentiality.value,
				data,
				threat?.probability
			),
			authenticityAcumulado: valueDataAccumulated(
				threat,
				threatData?.key,
				DATA_ASSETS_VALUE.authenticity.value,
				data,
				threat?.probability
			),
			traceabilityAcumulado: valueDataAccumulated(
				threat,
				threatData?.key,
				DATA_ASSETS_VALUE.traceability.value,
				data,
				threat?.probability
			),
			availability: valueData(
				threat,
				threatData?.key,
				DATA_ASSETS_VALUE.availability.value,
				data,
				threat?.probability
			),
			integrity: valueData(
				threat,
				threatData?.key,
				DATA_ASSETS_VALUE.integrity.value,
				data,
				threat?.probability
			),
			confidentiality: valueData(
				threat,
				threatData?.key,
				DATA_ASSETS_VALUE.confidentiality.value,
				data,
				threat?.probability
			),
			authenticity: valueData(
				threat,
				threatData?.key,
				DATA_ASSETS_VALUE.authenticity.value,
				data,
				threat?.probability
			),
			traceability: valueData(
				threat,
				threatData?.key,
				DATA_ASSETS_VALUE.traceability.value,
				data,
				threat?.probability
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

	const [finalData, setFinalData] = useState([])

	useEffect(() => {
		if (assets?.length && accumulatedValuesData?.length) {
			const totalData = assets?.map((item) => {
				const data = accumulatedValuesData?.find(
					(data) => data?.id === item?.id
				)
				return {
					...item,
					availabilityAcumulado: data?.availability,
					integrityAcumulado: data?.integrity,
					confidentialityAcumulado: data?.confidentiality,
					authenticityAcumulado: data?.authenticity,
					traceabilityAcumulado: data?.traceability,
				}
			})
			setFinalData(totalData)
		}
	}, [assets, accumulatedValuesData])

	const getPanel = () => {
		return finalData.map((data, key) => (
			<Panel header={`${data?.name} / ${data?.identification}`} key={key}>
				{buildThreatTable(data)}
			</Panel>
		))
	}

	return <Collapse defaultActiveKey={[0]}>{getPanel()}</Collapse>
}

export default TablePotentialRisk
