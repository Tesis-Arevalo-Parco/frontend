import { Input, Row, Col } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

const SearchInput = ({ data, setFilteredData, searchName, placeholder }) => {
	const onChangeInput = (e) => {
		const filteredData = data.filter((value) =>
			value[searchName].toLowerCase().includes(e.target.value.toLowerCase())
		)
		setFilteredData(filteredData)
	}

	return (
		<Row className='custom-search-input'>
			<Col xs={24} lg={6}>
				<Input
					placeholder={placeholder}
					onChange={onChangeInput}
					addonAfter={<SearchOutlined />}
				/>
			</Col>
		</Row>
	)
}

export default SearchInput
