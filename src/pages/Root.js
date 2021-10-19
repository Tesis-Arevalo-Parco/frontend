import { useContext } from 'react'
import { Card, Row, Col, Avatar, Divider } from 'antd'
import { Link } from 'react-router-dom'
import { paths } from 'constants/paths'
import {
	HomeFilled,
	FlagFilled,
	FireFilled,
	ControlOutlined,
	RadarChartOutlined,
} from '@ant-design/icons'

const Root = () => {
	const { Meta } = Card

	return (
		<>
			<div className='card-risk-flexbox'>
				<div className='card-risk-grid'>
					<div className='row-1-col-1'>
						<Card style={{ width: 300, height: 220 }}>
							<Meta
								avatar={
									<Avatar
										style={{ backgroundColor: '#0d0998' }}
										icon={<HomeFilled />}
									/>
								}
								title='Activos'
							/>
							<Divider />
							<Link to={paths.ASSETS_IDENTIFICATION}>Identificar Activos</Link>
							<p></p>
							<Link to={paths.ASSETS_REGISTER}>
								Registrar dependencias entre Activos
							</Link>
							<p></p>
							<Link to={paths.ASSETS_VALUATION}>Valorar Activos</Link>
						</Card>
					</div>
					<div className='row-1-col-3'>
						<Card style={{ width: 300, height: 220 }}>
							<Meta
								avatar={
									<Avatar
										style={{ backgroundColor: '#0d0998' }}
										icon={<FireFilled />}
									/>
								}
								title='Amenazas'
							/>
							<Divider />
							<Link to={paths.THREAT_IDENTIFICATION}>Identificar Amenazas</Link>
							<p></p>
							<Link to={paths.THREAT_VALUATION}>Valorar Amenazas</Link>
							<p></p>
						</Card>
					</div>

					<div className='row-2-col-1'>
						<Card style={{ width: 300, height: 220 }}>
							<Meta
								avatar={
									<Avatar
										style={{ backgroundColor: '#0d0998' }}
										icon={<FlagFilled />}
									/>
								}
								title='Salvaguardas'
							/>
							<Divider />
							<Link to={paths.THREAT_IDENTIFICATION}>
								Identificar Salvaguardas
							</Link>
							<p></p>
							<Link to={paths.THREAT_IDENTIFICATION}>Valorar Salvaguardas</Link>
						</Card>
					</div>
					<div className='row-2-col-3'>
						<Card style={{ width: 300, height: 280 }}>
							<Meta
								avatar={
									<Avatar
										style={{ backgroundColor: '#0d0998' }}
										icon={<ControlOutlined />}
									/>
								}
								title='Estado de Riesgo'
							/>
							<Divider />
							<Link to={paths.THREAT_IDENTIFICATION}>
								Valorar amenazas residuales
							</Link>
							<p></p>
							<Link to={paths.THREAT_IDENTIFICATION}>Impacto Potencial</Link>
							<p></p>
							<Link to={paths.THREAT_IDENTIFICATION}>Impacto Residual</Link>
							<p></p>
							<Link to={paths.THREAT_IDENTIFICATION}>Riesgo Potencial</Link>
							<p></p>
							<Link to={paths.THREAT_IDENTIFICATION}>Riesgo Residual</Link>
						</Card>
					</div>
					<div className='row-3-col-2'>
						<Card style={{ width: 300, height: 280 }}>
							<Meta
								avatar={
									<Avatar
										style={{ backgroundColor: '#0d0998' }}
										icon={<RadarChartOutlined />}
									/>
								}
								title='Informe de Riesgo'
							/>
							<Divider />
							<Link to={paths.THREAT_IDENTIFICATION}>
								Grafico Impacto Potencial
							</Link>
							<p></p>
							<Link to={paths.THREAT_IDENTIFICATION}>
								Grafico Impacto Residual
							</Link>
							<p></p>
							<Link to={paths.THREAT_IDENTIFICATION}>
								Grafico Riesgo Potencial
							</Link>
							<p></p>
							<Link to={paths.THREAT_IDENTIFICATION}>
								Grafico Riesgo Residual
							</Link>
						</Card>
					</div>
				</div>
			</div>
		</>
	)
}
export default Root
