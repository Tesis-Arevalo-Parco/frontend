import { useContext } from 'react'
import { Button, Empty } from 'antd'
import ProjectsContext from 'store/context/ProjectsContext'
import ProjectsFormContext from 'store/context/ProjectsFormContext'

const AssetsIdentification = () => {
	const { projects } = useContext(ProjectsContext)
	const { toggleProjectsForm } = useContext(ProjectsFormContext)
	return (
		<div className='assets-identification'>
			{projects.length ? (
				projects.map((project) => <div key={project.id}>{project.name}</div>)
			) : (
				<Empty
					description='No se logró encontrar proyectos'
					className='empty-project'
				>
					<Button onClick={toggleProjectsForm}>
						<p>Crear un nuevo proyecto</p>
					</Button>
				</Empty>
			)}
		</div>
	)
}

export default AssetsIdentification
