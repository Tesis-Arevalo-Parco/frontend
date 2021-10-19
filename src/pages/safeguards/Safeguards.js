import { useContext, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Button, Empty } from 'antd'
import ProjectsContext from 'store/context/ProjectsContext'
import { paths } from 'constants/paths'
import images from 'constants/assets'
import ParamsContext from 'store/context/ParamsContext'

const Safeguards = () => {
	const { projects } = useContext(ProjectsContext)
	const { safeguardsParams } = useContext(ParamsContext)
	const history = useHistory()

	useEffect(() => {
		if (safeguardsParams) {
			history.push(`${paths.SAFEGUARDS_IDENTIFICATION}/${safeguardsParams}`)
		}
	}, [])

	return (
		<div className='safeguards'>
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
					description='Seleccione un proyecto para empezar a identificar salvaguardas'
					className='empty-project'
					style={{ marginBottom: '5rem' }}
					image={images.EMPTY_IMG}
				></Empty>
			)}
		</div>
	)
}

export default Safeguards
