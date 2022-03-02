const TablePotentialImpactComputation = () => {
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
	return <div>{calculoRiesgo('MA', 'MB')} Root</div>
}

export default TablePotentialImpactComputation
