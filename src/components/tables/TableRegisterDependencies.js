import { useEffect, useState, useRef, useContext } from 'react'
import { Link } from 'react-router-dom'
import { HotTable } from '@handsontable/react'
import { Button, Empty } from 'antd'
import ProjectsContext from 'store/context/ProjectsContext'
import images from 'constants/assets'
import { paths } from 'constants/paths'

let listOfDependencies = []

const TableRegisterDependencies = ({ assets, assetsDependencies }) => {
	const [localAssets, setLocalAssets] = useState([])
	const [data, setData] = useState([])
	const { setAssetsNewDependencies } = useContext(ProjectsContext)
	const hotTableRef = useRef(null)

	useEffect(() => {
		listOfDependencies = []
		setLocalAssets(assets.map((asset) => asset.name))
		const test = createData(assets.length)
		setData(test)
		hotTableRef.current?.hotInstance.updateSettings({
			cells(row, col) {
				const cellProperties = {}
				if (row === col || row > col) {
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
		console.log('assets', assets)
		changes?.forEach(([row, col, oldValue, newValue]) => {
			if (!isNaN(+newValue) && oldValue !== newValue && newValue !== '') {
				listOfDependencies.push({
					firstAsset: assets[row],
					secondAsset: assets[col],
					value: Math.abs(+newValue),
				})
				setAssetsNewDependencies(listOfDependencies)
			}
			if (oldValue !== '' && newValue === '') {
				const index = listOfDependencies.findIndex(
					(dependency) =>
						dependency.firstAsset.id === assets[row].id &&
						dependency.secondAsset.id === assets[col].id
				)
				if (index !== -1) {
					listOfDependencies.splice(index, 1)
				}
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

	useEffect(() => {
		if (assetsDependencies.length) {
			assetsDependencies.forEach((dependency) => {
				const row = assets.findIndex(
					(asset) => asset.id === dependency.firstAsset.id
				)
				const column = assets.findIndex(
					(asset) => asset.id === dependency.secondAsset.id
				)
				if (row !== -1 && column !== -1) {
					hotTableRef.current?.hotInstance.setDataAtCell(
						row,
						column,
						dependency.value
					)
				}
			})
		}
	}, [assetsDependencies])

	return localAssets.length ? (
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
	) : (
		<Empty
			description='No se logró encontrar activos'
			className='empty-project'
			image={images.EMPTY_IMG}
		>
			<Link to={paths.ASSETS_IDENTIFICATION}>
				<Button type='primary'>
					<p>Crear activos</p>
				</Button>
			</Link>
		</Empty>
	)
}

export default TableRegisterDependencies
