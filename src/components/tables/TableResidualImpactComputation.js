import { useContext, useEffect, useState } from 'react'
import { Collapse, Table, Form, Spin } from 'antd'

import { DATA_ASSETS_VALUE, matrizImpacto } from 'constants/constants'
import SpinnerContext from 'store/context/SpinnerContext'

const TableResidualImpactComputation = ({
	safeguardsWithThreat,
	assets,
	assetsDependencies,
}) => {
	const { Panel } = Collapse
	const [form] = Form.useForm()
	const { active } = useContext(SpinnerContext)

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

	const columns = [
		{
			title: 'Amenazas',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: 'Impacto Acumulado Residual',
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
			title: 'Impacto Repercutido Residual',
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

	// Impacto Residual Repercutido sacar => Valorar Amenazas implementando salvaguardas
	const calculoImpactoResidualRepercutido = (
		valorActivo,
		valorDegradacionResidual
	) => {
		let valorX = -1
		let valorY = -1

		if (valorDegradacionResidual >= 80 && valorDegradacionResidual <= 100) {
			valorX = 2
		} else if (
			valorDegradacionResidual >= 30 &&
			valorDegradacionResidual <= 79
		) {
			valorX = 1
		} else if (
			valorDegradacionResidual >= 0 &&
			valorDegradacionResidual <= 29
		) {
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

	// Impacto Residual Acumulado
	const calculoImpactoResidualAcumulado = (
		valorActivoAcumulado,
		valorDegradacionResidual
	) => {
		let valorX = -1
		let valorY = -1

		if (valorDegradacionResidual >= 80 && valorDegradacionResidual <= 100) {
			valorX = 2
		} else if (
			valorDegradacionResidual >= 30 &&
			valorDegradacionResidual <= 79
		) {
			valorX = 1
		} else if (
			valorDegradacionResidual >= 0 &&
			valorDegradacionResidual <= 29
		) {
			valorX = 0
		}

		if (valorActivoAcumulado === 10) {
			valorY = 0
		} else if (valorActivoAcumulado >= 7 && valorActivoAcumulado <= 9.9) {
			valorY = 1
		} else if (valorActivoAcumulado >= 4 && valorActivoAcumulado <= 6.9) {
			valorY = 2
		} else if (valorActivoAcumulado >= 1 && valorActivoAcumulado <= 3.9) {
			valorY = 3
		} else if (valorActivoAcumulado >= 0 && valorActivoAcumulado <= 0.9) {
			valorY = 4
		}
		const result = matrizImpacto[valorX][valorY]
		return result
	}

	const valueData = (threat, key, valueKey, data) => {
		const threatValue = threat?.find((item) => item.key === key)
		const threatDataF = threatValue[valueKey]
		const assetValueA = data[DATA_ASSETS_VALUE.availability.value]
		const assetValueI = data[DATA_ASSETS_VALUE.integrity.value]
		const assetValueC = data[DATA_ASSETS_VALUE.confidentiality.value]
		const assetValueAU = data[DATA_ASSETS_VALUE.authenticity.value]
		const assetValueT = data[DATA_ASSETS_VALUE.traceability.value]
		if (
			valueKey === DATA_ASSETS_VALUE.availability.value &&
			threatDataF &&
			assetValueA?.value
		) {
			return calculoImpactoResidualRepercutido(+assetValueA.value, +threatDataF)
		} else if (
			valueKey === DATA_ASSETS_VALUE.integrity.value &&
			threatDataF &&
			assetValueI?.value
		) {
			return calculoImpactoResidualRepercutido(+assetValueI.value, +threatDataF)
		} else if (
			valueKey === DATA_ASSETS_VALUE.confidentiality.value &&
			threatDataF &&
			assetValueC?.value
		) {
			return calculoImpactoResidualRepercutido(+assetValueC.value, +threatDataF)
		} else if (
			valueKey === DATA_ASSETS_VALUE.authenticity.value &&
			threatDataF &&
			assetValueAU?.value
		) {
			return calculoImpactoResidualRepercutido(
				+assetValueAU.value,
				+threatDataF
			)
		} else if (
			valueKey === DATA_ASSETS_VALUE.traceability.value &&
			threatDataF &&
			assetValueT?.value
		) {
			return calculoImpactoResidualRepercutido(+assetValueT.value, +threatDataF)
		} else {
			return ''
		}
	}

	const valueDataAccumulated = (threat, key, valueKey, data) => {
		const threatValue = threat?.find((item) => item.key === key)
		const threatDataF = threatValue[valueKey]
		const assetValueA = data?.availabilityAcumulado
		const assetValueI = data?.integrityAcumulado
		const assetValueC = data?.confidentialityAcumulado
		const assetValueAU = data?.authenticityAcumulado
		const assetValueT = data?.traceabilityAcumulado
		if (
			valueKey === DATA_ASSETS_VALUE.availability.value &&
			threatDataF &&
			assetValueA
		) {
			return calculoImpactoResidualAcumulado(+assetValueA, +threatDataF)
		} else if (
			valueKey === DATA_ASSETS_VALUE.integrity.value &&
			threatDataF &&
			assetValueI
		) {
			return calculoImpactoResidualAcumulado(+assetValueI, +threatDataF)
		} else if (
			valueKey === DATA_ASSETS_VALUE.confidentiality.value &&
			threatDataF &&
			assetValueC
		) {
			return calculoImpactoResidualAcumulado(+assetValueC, +threatDataF)
		} else if (
			valueKey === DATA_ASSETS_VALUE.authenticity.value &&
			threatDataF &&
			assetValueAU
		) {
			return calculoImpactoResidualAcumulado(+assetValueAU, +threatDataF)
		} else if (
			valueKey === DATA_ASSETS_VALUE.traceability.value &&
			threatDataF &&
			assetValueT
		) {
			return calculoImpactoResidualAcumulado(+assetValueT, +threatDataF)
		} else {
			return ''
		}
	}

	const [finalData, setFinalData] = useState([])

	useEffect(() => {
		if (assets?.length && accumulatedValuesData?.length) {
			const totalData = assets?.map((item) => {
				const data = accumulatedValuesData?.find(
					(data) => data?.id === item?.id
				)
				const threatSafeguardsD = safeguardsWithThreat?.find(
					(data) => data?.assetId === item?.id
				)
				return {
					...item,
					availabilityAcumulado: data?.availability,
					integrityAcumulado: data?.integrity,
					confidentialityAcumulado: data?.confidentiality,
					authenticityAcumulado: data?.authenticity,
					traceabilityAcumulado: data?.traceability,
					threatSafeguardsData: threatSafeguardsD?.data,
				}
			})
			setFinalData(totalData)
		}
	}, [assets, accumulatedValuesData, safeguardsWithThreat])

	const buildThreatTable = (data) => {
		const { threatSafeguardsData } = data
		const filterData = threatSafeguardsData?.map((threatData) => ({
			key: threatData?.key,
			name: threatData?.name,
			availabilityAcumulado: valueDataAccumulated(
				threatSafeguardsData,
				threatData?.key,
				DATA_ASSETS_VALUE.availability.value,
				data
			),
			integrityAcumulado: valueDataAccumulated(
				threatSafeguardsData,
				threatData?.key,
				DATA_ASSETS_VALUE.integrity.value,
				data
			),
			confidentialityAcumulado: valueDataAccumulated(
				threatSafeguardsData,
				threatData?.key,
				DATA_ASSETS_VALUE.confidentiality.value,
				data
			),
			authenticityAcumulado: valueDataAccumulated(
				threatSafeguardsData,
				threatData?.key,
				DATA_ASSETS_VALUE.authenticity.value,
				data
			),
			traceabilityAcumulado: valueDataAccumulated(
				threatSafeguardsData,
				threatData?.key,
				DATA_ASSETS_VALUE.traceability.value,
				data
			),
			availability: valueData(
				threatSafeguardsData,
				threatData?.key,
				DATA_ASSETS_VALUE.availability.value,
				data
			),
			integrity: valueData(
				threatSafeguardsData,
				threatData?.key,
				DATA_ASSETS_VALUE.integrity.value,
				data
			),
			confidentiality: valueData(
				threatSafeguardsData,
				threatData?.key,
				DATA_ASSETS_VALUE.confidentiality.value,
				data
			),
			authenticity: valueData(
				threatSafeguardsData,
				threatData?.key,
				DATA_ASSETS_VALUE.authenticity.value,
				data
			),
			traceability: valueData(
				threatSafeguardsData,
				threatData?.key,
				DATA_ASSETS_VALUE.traceability.value,
				data
			),
			vulnerability: threatSafeguardsData?.vulnerabilities,
			threatId: threatSafeguardsData?.id,
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
		return finalData?.map((data, key) => {
			return (
				<Panel
					header={`${data?.name} / ${data?.model} / ${data?.identification}`}
					key={key}
				>
					{buildThreatTable(data)}
				</Panel>
			)
		})
	}

	return <Collapse defaultActiveKey={[0]}>{getPanel()}</Collapse>
}

export default TableResidualImpactComputation
