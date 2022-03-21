import { useContext, useEffect, useState } from 'react'
import { Collapse, Table, Form, Spin } from 'antd'

import { DATA_ASSETS_VALUE } from 'constants/constants'
import SpinnerContext from 'store/context/SpinnerContext'

const TablePotentialImpactComputation = ({ assets, assetsDependencies }) => {
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
		const result = matrizImpacto[valorX][valorY]
		return result
	}

	// eslint-disable-next-line no-unused-vars
	// Riesgo repercutido Potencial
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

	// Riesgo cumulado Potencial
	const calculoRiesgoAcumulado = (valoProbabilidad, valorImpactoAcumualado) => {
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
		const result = matrizRiesgo[valorX][valorY]
		return result
	}

	// RESIDUAL

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

	// Riesgo Repercutido Residual
	// valoProbabilidadResidual ==> sacar de [P] Probabilidad de Valorar Amenazas implementando salvaguardas
	// valorImpacto => sacar de calculoImpactoResidualRepercutido()
	const calculoRiesgoRepercutidoResidual = (
		valoProbabilidadResidual,
		valorImpactoResidualRepercutido
	) => {
		let valorX = -1
		let valorY = -1

		if (valoProbabilidadResidual === 'MB') {
			valorX = 0
		} else if (valoProbabilidadResidual === 'B') {
			valorX = 1
		} else if (valoProbabilidadResidual === 'M') {
			valorX = 2
		} else if (valoProbabilidadResidual === 'A') {
			valorX = 3
		} else if (valoProbabilidadResidual === 'MA') {
			valorX = 4
		}

		if (valorImpactoResidualRepercutido === 'MA') {
			valorY = 0
		} else if (valorImpactoResidualRepercutido === 'A') {
			valorY = 1
		} else if (valorImpactoResidualRepercutido === 'M') {
			valorY = 2
		} else if (valorImpactoResidualRepercutido === 'B') {
			valorY = 3
		} else if (valorImpactoResidualRepercutido === 'MB') {
			valorY = 4
		}
		const result = matrizRiesgo[valorX][valorY]
		return result
	}

	// riesgo residual
	// Riesgo repercutido Residual
	// valoProbabilidadResidual => [P] Probabilidad
	// valorImpactoRepercutidoResidual => calculoImpactoResidualRepercutido()
	const calculoRiesgoResidualRepercutido = (
		valoProbabilidadResidual,
		valorImpactoResidualRepercutido
	) => {
		let valorX = -1
		let valorY = -1

		if (valoProbabilidadResidual === 'MB') {
			valorX = 0
		} else if (valoProbabilidadResidual === 'B') {
			valorX = 1
		} else if (valoProbabilidadResidual === 'M') {
			valorX = 2
		} else if (valoProbabilidadResidual === 'A') {
			valorX = 3
		} else if (valoProbabilidadResidual === 'MA') {
			valorX = 4
		}

		if (valorImpactoResidualRepercutido === 'MA') {
			valorY = 0
		} else if (valorImpactoResidualRepercutido === 'A') {
			valorY = 1
		} else if (valorImpactoResidualRepercutido === 'M') {
			valorY = 2
		} else if (valorImpactoResidualRepercutido === 'B') {
			valorY = 3
		} else if (valorImpactoResidualRepercutido === 'MB') {
			valorY = 4
		}
		const result = matrizRiesgo[valorX][valorY]
		return result
	}

	// Riesgo Acumulado Residual
	// valoProbabilidadResidual => [P] Probabilidad
	// valorImpactoAcumualadoResidual => calculoImpactoResidualAcumulado()
	const calculoRiesgoAcumuladoResidual = (
		valoProbabilidadResidual,
		valorImpactoAcumualadoResidual
	) => {
		let valorX = -1
		let valorY = -1

		if (valoProbabilidadResidual === 'MB') {
			valorX = 0
		} else if (valoProbabilidadResidual === 'B') {
			valorX = 1
		} else if (valoProbabilidadResidual === 'M') {
			valorX = 2
		} else if (valoProbabilidadResidual === 'A') {
			valorX = 3
		} else if (valoProbabilidadResidual === 'MA') {
			valorX = 4
		}

		if (valorImpactoAcumualadoResidual === 'MA') {
			valorY = 0
		} else if (valorImpactoAcumualadoResidual === 'A') {
			valorY = 1
		} else if (valorImpactoAcumualadoResidual === 'M') {
			valorY = 2
		} else if (valorImpactoAcumualadoResidual === 'B') {
			valorY = 3
		} else if (valorImpactoAcumualadoResidual === 'MB') {
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
			title: 'Impacto Acumulado Potencial',
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
			title: 'Impacto Repercutido Potencial',
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

	const valueDataAccumulated = (threat, key, valueKey, data) => {
		const threatDataF = threat[valueKey]?.find((item) => item?.keyValue === key)
		const assetValueA = data?.availabilityAcumulado
		const assetValueI = data?.integrityAcumulado
		const assetValueC = data?.confidentialityAcumulado
		const assetValueAU = data?.authenticityAcumulado
		const assetValueT = data?.traceabilityAcumulado
		if (
			valueKey === DATA_ASSETS_VALUE.availability.value &&
			threatDataF?.value &&
			assetValueA
		) {
			return calculoImpactoAcumulado(+assetValueA, +threatDataF.value)
		} else if (
			valueKey === DATA_ASSETS_VALUE.integrity.value &&
			threatDataF?.value &&
			assetValueI
		) {
			return calculoImpactoAcumulado(+assetValueI, +threatDataF.value)
		} else if (
			valueKey === DATA_ASSETS_VALUE.confidentiality.value &&
			threatDataF?.value &&
			assetValueC
		) {
			return calculoImpactoAcumulado(+assetValueC, +threatDataF.value)
		} else if (
			valueKey === DATA_ASSETS_VALUE.authenticity.value &&
			threatDataF?.value &&
			assetValueAU
		) {
			return calculoImpactoAcumulado(+assetValueAU, +threatDataF.value)
		} else if (
			valueKey === DATA_ASSETS_VALUE.traceability.value &&
			threatDataF?.value &&
			assetValueT
		) {
			return calculoImpactoAcumulado(+assetValueT, +threatDataF.value)
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
				data
			),
			integrityAcumulado: valueDataAccumulated(
				threat,
				threatData?.key,
				DATA_ASSETS_VALUE.integrity.value,
				data
			),
			confidentialityAcumulado: valueDataAccumulated(
				threat,
				threatData?.key,
				DATA_ASSETS_VALUE.confidentiality.value,
				data
			),
			authenticityAcumulado: valueDataAccumulated(
				threat,
				threatData?.key,
				DATA_ASSETS_VALUE.authenticity.value,
				data
			),
			traceabilityAcumulado: valueDataAccumulated(
				threat,
				threatData?.key,
				DATA_ASSETS_VALUE.traceability.value,
				data
			),
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
