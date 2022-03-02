import { useContext, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Button, Empty } from 'antd'
import ProjectsContext from 'store/context/ProjectsContext'
import { paths } from 'constants/paths'
import images from 'constants/assets'
import ParamsContext from 'store/context/ParamsContext'

const PotentialImpact = () => {
	const { projects } = useContext(ProjectsContext)
	const { assetsParams } = useContext(ParamsContext)
	const history = useHistory()

	useEffect(() => {
		if (assetsParams) {
			history.push(`${paths.POTENTIAL_IMPACT}/${assetsParams}`)
		}
	}, [])

	return (
		<div className='potential-impact'>
			{!projects.length ? (
				<Empty
					description='No se logró encontrar proyectos'
					className='empty-project'
					image={images.EMPTY_IMG}
				>
					<Link to={paths.PROJECTS}>
						<Button>
							<p>Crear un nuevo proyecto</p>
						</Button>
					</Link>
				</Empty>
			) : (
				<Empty
					description='Seleccione un proyecto para visualizar el Impacto Potencial'
					className='empty-project'
					style={{ marginBottom: '5rem' }}
					image={images.EMPTY_IMG}
				></Empty>
			)}
		</div>
	)
}

export default PotentialImpact
