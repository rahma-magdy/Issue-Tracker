import Navigation from '../components/Navigation'
import DashboardLayoutClient from '../components/DashboardLayoutClient'

export default async function IssuesLayout({ children }) {
  return (
    <DashboardLayoutClient sidebar={<Navigation />}>
      {children}
    </DashboardLayoutClient>
  )
}
