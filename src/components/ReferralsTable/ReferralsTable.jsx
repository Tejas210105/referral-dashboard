import {useMemo, useState} from 'react'
import {useNavigate} from 'react-router-dom'

import './ReferralsTable.css'

function ReferralsTable({referrals}) {
  const navigate = useNavigate()

  const [searchText, setSearchText] = useState('')
  const [sortOrder, setSortOrder] = useState('desc')
  const [currentPage, setCurrentPage] = useState(1)

  const rowsPerPage = 10

  const filteredData = useMemo(() => {
    const filtered = referrals.filter(
      item =>
        item.name
          .toLowerCase()
          .includes(searchText.toLowerCase()) ||
        item.serviceName
          .toLowerCase()
          .includes(searchText.toLowerCase()),
    )

    return filtered.sort((a, b) => {
      if (sortOrder === 'asc') {
        return new Date(a.date) - new Date(b.date)
      }

      return new Date(b.date) - new Date(a.date)
    })
  }, [referrals, searchText, sortOrder])

  const totalPages = Math.ceil(
    filteredData.length / rowsPerPage,
  )

  const startIndex = (currentPage - 1) * rowsPerPage

  const currentRows = filteredData.slice(
    startIndex,
    startIndex + rowsPerPage,
  )

  const formatDate = date =>
    date.replaceAll('-', '/')

  const formatProfit = amount =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount)

  return (
    <section className="table-section">
      <div className="table-header">
        <h2>All Referrals</h2>

        <div className="table-controls">
          <input
            type="search"
            placeholder="Name or service…"
            value={searchText}
            onChange={event => {
              setSearchText(event.target.value)
              setCurrentPage(1)
            }}
          />

          <select
            value={sortOrder}
            onChange={event => {
              setSortOrder(event.target.value)
              setCurrentPage(1)
            }}
          >
            <option value="desc">
              Newest first
            </option>

            <option value="asc">
              Oldest first
            </option>
          </select>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Service</th>
            <th>Date</th>
            <th>Profit</th>
          </tr>
        </thead>

        <tbody>
          {currentRows.length > 0 ? (
            currentRows.map(item => (
              <tr
                key={item.id}
                onClick={() =>
                  navigate(`/referral/${item.id}`)
                }
              >
                <td>{item.name}</td>
                <td>{item.serviceName}</td>
                <td>{formatDate(item.date)}</td>
                <td>{formatProfit(item.profit)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">
                No matching entries
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <p className="entries-text">
        Showing {filteredData.length === 0 ? 0 : startIndex + 1}
        –
        {Math.min(
          startIndex + rowsPerPage,
          filteredData.length,
        )}{' '}
        of {filteredData.length} entries
      </p>

      <div className="pagination">
        <button
          disabled={currentPage === 1}
          onClick={() =>
            setCurrentPage(prev => prev - 1)
          }
        >
          Previous
        </button>

        <div className="page-numbers">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              className={
                currentPage === index + 1
                  ? 'active-page'
                  : ''
              }
              onClick={() =>
                setCurrentPage(index + 1)
              }
            >
              {index + 1}
            </button>
          ))}
        </div>

        <button
          disabled={currentPage === totalPages}
          onClick={() =>
            setCurrentPage(prev => prev + 1)
          }
        >
          Next
        </button>
      </div>
    </section>
  )
}

export default ReferralsTable