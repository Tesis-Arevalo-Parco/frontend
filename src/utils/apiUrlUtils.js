import axios from 'axios'
import { getJWT } from './localStorageUtils'
import { handlerErrors } from './handlerErrors'
import { STRAPI_ERRORS } from 'constants/commonStrapiErrors'
import { CODE_HTTP_RESPONSE } from 'constants/codeHttpResponse'
import { getErrorMessageId } from 'utils/apiResponseUtils'

const apiUrl =
	process.env.NODE_ENV === 'production'
		? process.env.REACT_APP_PROD_API_URL
		: process.env.REACT_APP_DEV_API_URL

const requestInterceptorAxios = () => {
	axios.interceptors.request.use(
		(configuration) => {
			const token = getJWT()
			if (token) {
				configuration.headers.Authorization = `Bearer ${token}`
			}
			return configuration
		},
		(error) => {
			Promise.reject(error)
		}
	)
}

const responseInterceptorAxios = () => {
	axios.interceptors.response.use(
		(success) => {
			return success
		},
		(error) => {
			if (
				error?.response &&
				error?.response?.data &&
				error?.response?.status !== CODE_HTTP_RESPONSE.ERROR_400
			) {
				handlerErrors(error.response.status, error.response.data.message)
				return Promise.reject(error)
			} else if (
				error?.response &&
				getErrorMessageId(error?.response?.data) ===
					STRAPI_ERRORS.EMAIL_ALREADY_TAKEN &&
				error?.response?.status === CODE_HTTP_RESPONSE.ERROR_400
			) {
				return Promise.reject(error)
			} else if (error?.response?.status === CODE_HTTP_RESPONSE.ERROR_400) {
				const token = getJWT()
				if (token) {
					handlerErrors(error?.response?.status, error)
					return Promise.reject(error)
				}
				return Promise.reject(error)
			}
			handlerErrors(0, error)
			return Promise.reject(error)
		}
	)
}
export { apiUrl, requestInterceptorAxios, responseInterceptorAxios }
