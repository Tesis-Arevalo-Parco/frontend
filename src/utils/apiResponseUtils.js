const getErrorMessageId = (data) =>
	data?.data[0]?.messages[0]?.id ? data?.data[0]?.messages[0]?.id : ''

export { getErrorMessageId }
