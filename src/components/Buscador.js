import swAlert from '@sweetalert/with-react';
import { useNavigate } from 'react-router-dom';
function Buscador(props) {
    const history = useNavigate();

    const submitHandler = e => {
        e.preventDefault();
        // trim() sirve para quitar espacios antes y al final
        const keyword = e.currentTarget.keyword.value.trim();
        console.log(keyword);
        if (keyword.length < 1) {
            swAlert(<h5>Tienes que escribir una palabra clave</h5>);
        } else if (keyword.length < 4) {
            swAlert(<h5>Tienes que escribir mas de 4 caracteres</h5>);
        } else {
            e.currentTarget.keyword.value = '';
            history(`/resultados?keyword=${keyword}`);
        }
    }
    return (
        <form className="d-flex align-items-center" onSubmit={submitHandler}>
            <label className="form-label m-0 mx-2">
                <input className="form-control" type="text" placeholder="Buscar" name="keyword" />
            </label>
            <button
                type="submit"
                className="btn btn-bg-color mt.mt-2"
                onClick={props.readSearch}
            >Buscar</button>

        </form>
    )
}
export default Buscador;