import { Empty, Button } from 'antd'

const EmptyImage = ({ image, description, buttonText, onClick }) => {
	return (
		<Empty image={image} description={description}>
			<Button type='primary' onClick={onClick}>
				{buttonText}
			</Button>
		</Empty>
	)
}

export default EmptyImage
