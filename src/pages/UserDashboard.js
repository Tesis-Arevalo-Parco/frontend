import { useEffect, useContext, useState } from 'react'
import { Layout, Card } from 'antd'
import { Route } from 'react-router-dom'
import SideNavBar from 'components/SideNavBar'
import Header from 'components/Header'
import ProjectsContext from 'store/context/ProjectsContext'
import ProjectsForm from 'components/forms/ProjectsForm'
import AssetsForm from 'components/forms/AssetsForm'
import DashBoardHeader from 'components/DashBoardHeader'
import { paths } from 'constants/paths'
import Projects from 'pages/Projects'
import AssetsIdentification from 'pages/assets/AssetsIdentification'
import Assets from 'pages/assets/Assets'
import AssetsValue from 'pages/assets/AssetsValue'
import AssetsValueTable from 'pages/assets/AssetsValueTable'
import Dependencies from 'pages/assets/Dependencies'
import RegisterDependencies from 'pages/assets/RegisterDependencies'
import Uploader from 'components/modals/Upload'
import Threads from 'pages/threads/Threads'
import ThreadsIdentifications from 'pages/threads/ThreadsIdentifications'
import Root from './Root'
import Safeguards from './safeguards/Safeguards'
import SafeguardsIdentification from './safeguards/SafeguardsIdentification'
import SafeguardsModal from 'components/modals/SafeguardsModal'
import ThreadsValue from 'pages/threads/ThreadsValue'
import ThreatValueTable from 'pages/threads/ThreatValueTable'
import SafeguardValue from 'pages/safeguards/SafeguardValue'
import SafeguardsValueTable from 'pages/safeguards/SafeguardsValueTable'
import SafeguardThreadsValue from 'pages/safeguards/SafeguardThreadsValue'
import SafeguardThreatValueTable from 'pages/safeguards/SafeguardThreatValueTable'
import PotentialImpact from 'pages/risks/PotentialImpact'
import ResidualImpact from 'pages/risks/ResidualImpact'
import PotentialRisk from 'pages/risks/PotentialRisk'
import ResidualRisk from 'pages/risks/ResidualRisk'
import Risks from 'pages/risks/Risks'

const UserDashboard = () => {
	const { getProjectsData, getAssetsClassCatalog } = useContext(ProjectsContext)
	const [fakeSideNavbar, setFakeSideNavbar] = useState(false)
	// const location = useLocation()

	useEffect(() => {
		getProjectsData()
		getAssetsClassCatalog()
	}, [])

	return (
		<Layout className='user-dashboard'>
			{fakeSideNavbar ? (
				<div className='fake-side-bar-sm'></div>
			) : (
				<div className='fake-side-bar-lg'></div>
			)}
			<SideNavBar setFakeSideNavbar={setFakeSideNavbar} />
			<Layout className='site-layout'>
				<Header />
				<Card title={<DashBoardHeader />} className='main-content'>
					<Route path={paths.ASSETS_IDENTIFICATION} exact={false}>
						<Route
							path={`${paths.ASSETS_IDENTIFICATION}/:id`}
							component={AssetsIdentification}
						/>
						<Route
							path={paths.ASSETS_IDENTIFICATION}
							component={Assets}
							exact
						/>
					</Route>
					<Route path={paths.ASSETS_REGISTER} exact={false}>
						<Route
							path={`${paths.ASSETS_REGISTER}/:id`}
							component={RegisterDependencies}
						/>
						<Route
							path={paths.ASSETS_REGISTER}
							component={Dependencies}
							exact
						/>
					</Route>
					<Route path={paths.ASSETS_VALUATION} exact={false}>
						<Route
							path={`${paths.ASSETS_VALUATION}/:id`}
							component={AssetsValueTable}
						/>
						<Route
							path={paths.ASSETS_VALUATION}
							component={AssetsValue}
							exact
						/>
					</Route>
					<Route path={paths.THREAT_IDENTIFICATION} exact={false}>
						<Route
							path={`${paths.THREAT_IDENTIFICATION}/:id`}
							component={ThreadsIdentifications}
						/>
						<Route
							path={paths.THREAT_IDENTIFICATION}
							component={Threads}
							exact
						/>
					</Route>
					<Route path={paths.THREAT_VALUATION} exact={false}>
						<Route
							path={`${paths.THREAT_VALUATION}/:id`}
							component={ThreatValueTable}
						/>
						<Route
							component={ThreadsValue}
							path={paths.THREAT_VALUATION}
							exact
						/>
					</Route>
					<Route path={paths.SAFEGUARDS_IDENTIFICATION} exact={false}>
						<Route
							path={`${paths.SAFEGUARDS_IDENTIFICATION}/:id`}
							component={SafeguardsIdentification}
						/>
						<Route
							path={paths.SAFEGUARDS_IDENTIFICATION}
							component={Safeguards}
							exact
						/>
					</Route>
					<Route path={paths.SAFEGUARDS_VALUATION} exact={false}>
						<Route
							path={`${paths.SAFEGUARDS_VALUATION}/:id`}
							component={SafeguardsValueTable}
						/>
						<Route
							component={SafeguardValue}
							path={paths.SAFEGUARDS_VALUATION}
							exact
						/>
					</Route>
					<Route path={paths.SAFEGUARDS_VALUATION_THREATS} exact={false}>
						<Route
							path={`${paths.SAFEGUARDS_VALUATION_THREATS}/:id`}
							component={SafeguardThreatValueTable}
						/>
						<Route
							component={SafeguardThreadsValue}
							path={paths.SAFEGUARDS_VALUATION_THREATS}
							exact
						/>
					</Route>
					<Route path={paths.STATE_POTENTIAL_IMPACT} exact={false}>
						<Route
							path={`${paths.STATE_POTENTIAL_IMPACT}/:id`}
							component={PotentialImpact}
						/>
						<Route
							component={() => <Risks path={paths.STATE_POTENTIAL_IMPACT} />}
							path={paths.STATE_POTENTIAL_IMPACT}
							exact
						/>
					</Route>
					<Route path={paths.STATE_RESIDUAL_IMPACT} exact={false}>
						<Route
							path={`${paths.STATE_RESIDUAL_IMPACT}/:id`}
							component={ResidualImpact}
						/>
						<Route
							component={() => <Risks path={paths.STATE_RESIDUAL_IMPACT} />}
							path={paths.STATE_RESIDUAL_IMPACT}
							exact
						/>
					</Route>
					<Route path={paths.STATE_POTENTIAL_RISK} exact={false}>
						<Route
							path={`${paths.STATE_POTENTIAL_RISK}/:id`}
							component={PotentialRisk}
						/>
						<Route
							component={() => <Risks path={paths.STATE_POTENTIAL_RISK} />}
							path={paths.STATE_POTENTIAL_RISK}
							exact
						/>
					</Route>
					<Route path={paths.STATE_RESIDUAL_RISK} exact={false}>
						<Route
							path={`${paths.STATE_RESIDUAL_RISK}/:id`}
							component={ResidualRisk}
						/>
						<Route
							component={() => <Risks path={paths.STATE_RESIDUAL_RISK} />}
							path={paths.STATE_RESIDUAL_RISK}
							exact
						/>
					</Route>
					<Route component={Projects} path={paths.PROJECTS} exact />
					<Route component={Root} path={paths.ROOT_APP} exact />
				</Card>
				<SafeguardsModal />
				<ProjectsForm />
				<AssetsForm />
				<Uploader />
			</Layout>
		</Layout>
	)
}

export default UserDashboard
