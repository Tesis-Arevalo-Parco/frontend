import axios from 'axios'
import { getJWT } from './localStorageUtils'

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
export { apiUrl, requestInterceptorAxios }
