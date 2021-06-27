import { useContext } from 'react'
import { Spin } from 'antd'
import SpinnerContext from 'store/context/SpinnerContext'
import TableProjects from 'components/tables/TableProjects'

const Projects = () => {
	const { active } = useContext(SpinnerContext)
	return (
		<Spin spinning={active}>
			<div className='projects'>
				<TableProjects />
			</div>
		</Spin>
	)
}

export default Projects
