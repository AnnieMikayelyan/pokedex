import { useEffect, useState } from 'react'
import axios from 'axios'
import Pokemon from '../components/Pokemon'
import Navbar from '../components/Navbar'
import {useDispatch} from "react-redux"
import { addPokemons } from '../storage/slice'

const Home = () => {
    const [pokemonsInformation, setPokemonsInformation] = useState([])
    const [initialData, setInitalData] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const [showPerPage, setShowPerPage] = useState(20)
    const dispatch = useDispatch()


    const getAllPokemons = async () => {
        const {data} = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=898")
        for (let value of data.results) {
            const { data: pokemonData } = await axios.get(value.url)

            setPokemonsInformation((prev) => [...prev, pokemonData])
            setInitalData((prev) => [...prev, pokemonData])
        }
    }

    useEffect(() => {
        getAllPokemons()
    }, [])

    useEffect(() => {
        dispatch(addPokemons(pokemonsInformation))
    }, [pokemonsInformation])


    return (
        <section className="container">
            <h1>Pokédex</h1>
            <Navbar
                setData={setPokemonsInformation}
                data={initialData}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                pokemonsInformation={pokemonsInformation}
                showPerPage={showPerPage}
                setShowPerPage={setShowPerPage}
            />
            <div className="pokemons">
                {pokemonsInformation.length
                    ? pokemonsInformation
                          .filter((pokemon) =>
                              pokemon.name.includes(searchValue)
                          )
                          .map((pokemon, index) => {

                            if(index >= showPerPage) return null

                            return (
                                <Pokemon
                                    key={pokemon.name}
                                    name={pokemon.name}
                                    id={pokemon.id}
                                    image={
                                        pokemon.sprites.other['official-artwork']
                                            .front_default
                                    }
                                    types={pokemon.types.map(
                                        (item) => item.type.name
                                    )}
                                />
                            )
                          })
                    : null}
            </div>
        </section>
    )
}

export default Home
