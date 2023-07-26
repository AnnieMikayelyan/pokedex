import PropTypes from 'prop-types'
import {useNavigate} from "react-router-dom"
import { configureId } from '../utils/configureId'

const Pokemon = ({ name, image, types, id }) => {

    const navigate = useNavigate()

    return (
        <div className="pokemon" onClick={() => navigate(`/pokemon/${name}`)}>
            <div className="image-parent">
                <img src={image} />
            </div>
            <p>{name}</p>
            <p>#{configureId(id)}</p>
            <span>
                {types[0]}
                {types[1] ? `, ${types[1]}` : ''}
            </span>
        </div>
    )
}

Pokemon.propTypes = {
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    types: PropTypes.arrayOf(PropTypes.string).isRequired,
    id: PropTypes.number.isRequired,
}

export default Pokemon
