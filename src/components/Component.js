import { Prompt } from 'react-router-dom'

const Component = () => {
	return (
		<div>
			<Prompt message={() => 'Are you sure you want to leave this page?'} />
		</div>
	)
}

export default Component
