import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Button, Empty } from 'antd'
import ProjectsContext from 'store/context/ProjectsContext'
import { paths } from 'constants/paths'
import images from 'constants/assets'

const AssetsIdentification = () => {
	const { projects } = useContext(ProjectsContext)
	return (
		<div className='assets-identification'>
			{!projects.length && (
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
			)}
		</div>
	)
}

export default AssetsIdentification
