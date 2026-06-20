import {useEffect, useState} from 'react'
import {Link, useParams} from 'react-router-dom'
import Cookies from 'js-cookie'

function ReferralDetails() {
  const {id} = useParams()

  const [referral, setReferral] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getReferralDetails()
  }, [])

  const getReferralDetails = async () => {
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
        const selectedReferral =
          data.data.referrals.find(
            item => item.id === Number(id),
          )

        setReferral(selectedReferral)
      }
    } catch (error) {
      console.log(error)
    }

    setLoading(false)
  }

  if (loading) {
    return <h2>Loading...</h2>
  }

  if (!referral) {
    return <h2>Referral not found</h2>
  }

  return (
    <div
      style={{
        maxWidth: '900px',
        margin: '40px auto',
        padding: '24px',
      }}
    >
      <h1>Referral Details</h1>

      <div
        style={{
          marginTop: '24px',
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '12px',
          padding: '24px',
        }}
      >
        <p>
          <strong>Name:</strong> {referral.name}
        </p>

        <p>
          <strong>Referral ID:</strong> {referral.id}
        </p>

        <p>
          <strong>Service:</strong> {referral.serviceName}
        </p>

        <p>
          <strong>Date:</strong>{' '}
          {referral.date.replaceAll('-', '/')}
        </p>

        <p>
          <strong>Profit:</strong>{' '}
          {new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0,
          }).format(referral.profit)}
        </p>
      </div>

      <Link
        to="/"
        style={{
          display: 'inline-block',
          marginTop: '20px',
        }}
      >
        Back to Dashboard
      </Link>
    </div>
  )
}

export default ReferralDetails