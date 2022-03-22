export const DATA_ASSETS_VALUE = {
	availability: {
		value: 'availability',
		label: '[D] Disponibilidad',
	},
	integrity: { value: 'integrity', label: '[I] Integridad' },
	confidentiality: { value: 'confidentiality', label: '[C] Confidencialidad' },
	authenticity: { value: 'authenticity', label: '[A] Autenticidad' },
	traceability: { value: 'traceability', label: '[T] Trazabilidad' },
	probability: { value: 'probability', label: '[P] Probabilidad' },
}

export const DEPENDENCIES_OPTIONS = [
	{
		name: '1 - Servicio',
		value: 1,
	},
	{
		name: '2 - Aplicación',
		value: 2,
	},
	{
		name: '3 - Equipo',
		value: 3,
	},
	{
		name: '4 - Instalación',
		value: 4,
	},
]

export const matrizImpacto = [
	['M', 'B', 'MB', 'MB', 'MB'],
	['A', 'M', 'B', 'MB', 'MB'],
	['MA', 'A', 'M', 'B', 'MB'],
]

export const matrizRiesgo = [
	['A', 'M', 'B', 'MB', 'MB'],
	['MA', 'A', 'M', 'B', 'MB'],
	['MA', 'A', 'M', 'B', 'MB'],
	['MA', 'MA', 'A', 'M', 'B'],
	['MA', 'MA', 'A', 'M', 'B'],
]
