import { useEffect, useState } from 'react'
import icon from './assets/icon.png'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router'

function App() {
  const navigate = useNavigate()
  const [partners, setPartner] = useState([])
  useEffect(() => {
    ;(async () => {
      const response = await window.api.getPartners()
      setPartner(response)
    })()
  }, [])
  console.log(partners)
  return (
    <>
      <div className="page-header">
        <img src={icon} alt="" />
        Партнеры
      </div>
      <div className="list">
        <ul>
          {partners.map((partner) => {
            return (
              <li
                className="partner-card"
                key={partner.id}
                onClick={() => {
                  navigate('/update', { state: { partner } })
                }}
              >
                <div className="main-info">
                  <p>
                    {partner.partner_type} | {partner.partner_name}
                  </p>
                  <p>{partner.director}</p>
                  <p>{partner.telephone}</p>
                  <p>Рейтинг: {partner.rating}</p>
                </div>
                <div className="discount">
                  <p>{partner.discount === null ? 0 : partner.discount} %</p>
                </div>
              </li>
            )
          })}
        </ul>
      </div>

      <Link to={'/create'}>
        <button>{'Создать партнера'}</button>
      </Link>
    </>
  )
}

export default App
