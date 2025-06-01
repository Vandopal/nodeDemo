import { useEffect } from "react"
import { Link } from "react-router"

function UpdatePartners () {
useEffect(() => { document.title = 'Обновить партнера' }, [])
async function submitHandler(e) {
    e.preventDefault()
    const partner = {
        type : e.target.type.value,
        name : e.target.name.value,
        director : e.target.director.value,
        email : e.target.email.value,
        telephone : e.target.telephone.value,
        address : e.target.address.value,
        inn : e.target.inn.value,
        rating : e.target.rating.value
    }
    await window.api.updatePartner(partner)
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
    <select name="type" id="type">
       <option value="ЗАО">ЗАО</option>
       <option value="ООО">ООО</option> 
       <option value="ПАО">ПАО</option> 
       <option value="ПАО">ПАО</option> 
    </select>

    <label htmlFor="name">Наименование:</label>
    <input type="text" name="name" required/>

    <label htmlFor="director">Директор:</label>
    <input type="text" name="director" required/>

    <label htmlFor="email">Почта:</label>
    <input type="text" name="email" required/>

    <label htmlFor="telephone">Телефон:</label>
    <input type="text" name="telephone" required/>

    <label htmlFor="address">Адрес:</label>
    <input type="text" name="address" required/>

    <label htmlFor="inn">ИНН:</label>
    <input type="text" name="inn" required/>

    <label htmlFor="rating">Рейтинг:</label>
    <input type="number" name="rating" step='1' min='1' max='10' required/>

    <button type="submit">Создать Партнера</button>
    </form>
    </>
)
}

export default UpdatePartners