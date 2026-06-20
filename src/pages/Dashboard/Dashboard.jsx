import {useEffect, useState} from 'react'
import Cookies from 'js-cookie'
import ReferralsTable from '../../components/ReferralsTable/ReferralsTable'
import Navbar from '../../components/Navbar/Navbar'
import './Dashboard.css'
import Footer from '../../components/Footer/Footer'

function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    getDashboardData()
  }, [])

  const getDashboardData = async () => {
    const token = Cookies.get('jwt_token')

    try {
      const response = await fetch(
        'https://v9fes04dwf.execute-api.eu-north-1.amazonaws.com/api/referrals',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

      const data = await response.json()

      if (response.ok) {
        setDashboardData(data.data)
      } else {
        setErrorMsg(data.message || 'Failed to fetch data')
      }
    } catch {
      setErrorMsg('Something went wrong')
    }

    setLoading(false)
  }

  if (loading) {
    return <h2 className="status-text">Loading...</h2>
  }

  if (errorMsg) {
    return <h2 className="status-text">{errorMsg}</h2>
  }

  const {
    metrics,
    serviceSummary,
    referral,
  } = dashboardData
  return (
    <>
      <Navbar />

      <div className="dashboard-container">
        <h1 className="dashboard-title">
          Referral Dashboard
        </h1>

        <p className="dashboard-subtitle">
          Track your referrals, earnings, and partner activity in one place.
        </p>

        <section className="overview-section">
          <h2>Overview</h2>

          <div className="metrics-grid">
            {metrics.map(metric => (
              <div
                key={metric.id}
                className="metric-card"
              >
                <p className="metric-label">
                  {metric.label}
                </p>

                <h3 className="metric-value">
                  {metric.value}
                </h3>
              </div>
            ))}
          </div>
        </section>

        <section className="service-summary-section">
          <h2>Service Summary</h2>

          <div className="summary-card">
            <div className="summary-item">
              <span className="summary-label">
                Service
              </span>

              <p>{serviceSummary.service}</p>
            </div>

            <div className="summary-item">
              <span className="summary-label">
                Your Referrals
              </span>

              <p>{serviceSummary.yourReferrals}</p>
            </div>

            <div className="summary-item">
              <span className="summary-label">
                Active Referrals
              </span>

              <p>{serviceSummary.activeReferrals}</p>
            </div>

            <div className="summary-item">
              <span className="summary-label">
                Total Ref. Earnings
              </span>

              <p>{serviceSummary.totalRefEarnings}</p>
            </div>
          </div>
        </section>

        <section className="share-section">
          <h2>Refer Friends and Earn More</h2>

          <div className="share-card">
            <div className="share-field">
              <label>Your Referral Link</label>

              <div className="copy-wrapper">
                <input
                  type="text"
                  value={referral.link}
                  readOnly
                />

                <button
                  type="button"
                  onClick={() =>
                    navigator.clipboard.writeText(referral.link)
                  }
                >
                  Copy
                </button>
              </div>
            </div>

            <div className="share-field">
              <label>Your Referral Code</label>

              <div className="copy-wrapper">
                <input
                  type="text"
                  value={referral.code}
                  readOnly
                />

                <button
                  type="button"
                  onClick={() =>
                    navigator.clipboard.writeText(referral.code)
                  }
                >
                  Copy
                </button>
              </div>
            </div>
          </div>
        </section>
        <ReferralsTable referrals={dashboardData.referrals} />

<Footer />
      </div>
    </>
  )
}

export default Dashboard