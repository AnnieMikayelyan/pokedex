import { useParams, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { configureId } from '../utils/configureId'

const PokemonPage = () => {
    const { pname } = useParams()

    const { pokemons } = useSelector((state) => state.pokemons)

    const pokemon = pokemons.find((item) => item.name === pname)

    console.log({ pokemon })

    return (
        <section className="container">
            <Link to="/" className="exploreMore">
                ← Explore more Pokémon
            </Link>
            <h1>
                {pokemon.name} #{configureId(pokemon.id)}
            </h1>

            <div>
                <div className="pokemon-page-image">
                    <img
                        src={
                            pokemon.sprites.other['official-artwork']
                                .front_default
                        }
                    />
                </div>

                <h2>Stats</h2>
            </div>
        </section>
    )
}

export default PokemonPage
