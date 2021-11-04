import { useContext, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Button, Empty } from 'antd'
import ProjectsContext from 'store/context/ProjectsContext'
import { paths } from 'constants/paths'
import images from 'constants/assets'
import ParamsContext from 'store/context/ParamsContext'

const SafeguardValue = () => {
	const { projects } = useContext(ProjectsContext)
	const { assetsParams } = useContext(ParamsContext)
	const history = useHistory()

	useEffect(() => {
		if (assetsParams) {
			history.push(`${paths.SAFEGUARDS_VALUATION}/${assetsParams}`)
		}
	}, [])

	return (
		<div className='safeguard-valuation'>
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
					description='Seleccione un proyecto para empezar a valorar salvaguardas'
					className='empty-project'
					style={{ marginBottom: '5rem' }}
					image={images.EMPTY_IMG}
				></Empty>
			)}
		</div>
	)
}

export default SafeguardValue
