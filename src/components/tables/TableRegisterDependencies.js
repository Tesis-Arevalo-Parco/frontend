import { useEffect, useState, useRef } from 'react'
import { HotTable } from '@handsontable/react'

const TableRegisterDependencies = ({ assets }) => {
	const [localAssets, setLocalAssets] = useState([])
	const [data, setData] = useState([])
	const hotTableRef = useRef(null)
	const listOfDependencies = []

	useEffect(() => {
		setLocalAssets(assets.map((asset) => asset.name))
		const test = createData(assets.length)
		setData(test)
		hotTableRef.current.hotInstance.updateSettings({
			cells(row, col) {
				const cellProperties = {}
				if (row === col) {
					cellProperties.readOnly = true
					cellProperties.className = 'read-only-table-dependencies'
				}
				return cellProperties
			},
		})
	}, [assets])
	const settings = {
		licenseKey: 'non-commercial-and-evaluation',
	}

	const afterChangeCell = (changes) => {
		changes?.forEach(([row, col, oldValue, newValue]) => {
			console.log(row, col, oldValue, newValue)
			if (!isNaN(+newValue) && oldValue !== newValue && newValue !== '') {
				console.log(Math.abs(+newValue))
				console.log(assets[row])
				console.log(assets[col])
				listOfDependencies.push({
					firstAsset: assets[row],
					secondAsset: assets[col],
				})
				console.log(listOfDependencies)
			}
		})
	}

	const createData = (size) => {
		const mat = Array.from(Array(size), () => new Array(size))
		for (let i = 0; i < size; i++) {
			for (let j = 0; j < size; j++) {
				mat[i][j] = ''
			}
		}
		return mat
	}

	return (
		<HotTable
			className='table-register-dependencies'
			ref={hotTableRef}
			data={data}
			columns={localAssets.map(() => ({
				type: 'numeric',
			}))}
			startCols={localAssets.length}
			startRows={localAssets.length}
			colHeaders={localAssets}
			rowHeaders={localAssets}
			rowHeaderWidth={150}
			height='auto'
			width='100%'
			stretchH='all'
			settings={settings}
			afterChange={afterChangeCell}
		/>
	)
}

export default TableRegisterDependencies
