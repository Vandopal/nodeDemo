import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router'

function UpdatePartners() {
  useEffect(() => {
    document.title = 'Обновить партнера'
  }, [])
  const location = useLocation()
  const [partner, setPartner] = useState(location.state.partner)

  async function submitHandler(e) {
    e.preventDefault()
    const updPartners = {
      id: partner.id,
      type: e.target.type.value,
      name: e.target.name.value,
      director: e.target.director.value,
      email: e.target.email.value,
      telephone: e.target.telephone.value,
      address: e.target.address.value,
      inn: e.target.inn.value,
      rating: e.target.rating.value
    }
    await window.api.updatePartner(updPartners)
    setPartner(updPartners)
    e.target.reset()
  }

  return (
    <>
      <Link to={'/'}>
        <button>{'<-- назад'}</button>
      </Link>

      <h1>Создать партнера</h1>
      <form onSubmit={submitHandler}>
        <label htmlFor="type">Тип партнера:</label>
        <select name="type" id="type" defaultValue={partner.type}>
          <option value="ЗАО">ЗАО</option>
          <option value="ООО">ООО</option>
          <option value="ПАО">ПАО</option>
          <option value="ПАО">ПАО</option>
        </select>

        <label htmlFor="name">Наименование:</label>
        <input type="text" name="name" defaultValue={partner.name} required />

        <label htmlFor="director">Директор:</label>
        <input type="text" name="director" defaultValue={partner.director} required />

        <label htmlFor="email">Почта:</label>
        <input type="text" name="email" defaultValue={partner.email} required />

        <label htmlFor="telephone">Телефон:</label>
        <input type="text" name="telephone" defaultValue={partner.telephone} required />

        <label htmlFor="address">Адрес:</label>
        <input type="text" name="address" defaultValue={partner.address} required />

        <label htmlFor="inn">ИНН:</label>
        <input type="text" name="inn" defaultValue={partner.inn} required />

        <label htmlFor="rating">Рейтинг:</label>
        <input
          type="number"
          name="rating"
          step="1"
          min="1"
          max="10"
          defaultValue={partner.rating}
          required
        />

        <button type="submit">Обновить Партнера</button>
      </form>
    </>
  )
}

export default UpdatePartners
