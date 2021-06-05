import { notification } from 'antd'
import { MESSAGES } from 'constants/notificationMessages'
import { CODE_HTTP_RESPONSE } from 'constants/codeHttpResponse'

const handlerErrors = async (statusCode, message) => {
	switch (statusCode) {
		case CODE_HTTP_RESPONSE.ERROR_401:
			notification.error(MESSAGES.NOT_AUTHORIZED)
			break
		case CODE_HTTP_RESPONSE.ERROR_403:
			notification.error(MESSAGES.NOT_AUTHORIZED)
			break
		default:
			notification.error({
				...MESSAGES.API_ERROR,
				message: `${message || 'Bad Request'}`,
			})
			break
	}
}

export { handlerErrors }
