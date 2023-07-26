import PropTypes from 'prop-types'
import { useState } from 'react'
import Dropdown from './Dropdown'
import DropdownItem from './DropdownItem'
import { useOutsideClick } from '../hooks/useOutsideClick'

const Navbar = ({
    searchValue,
    setSearchValue,
    pokemonsInformation,
    setData,
    data,
    showPerPage,
    setShowPerPage,
}) => {
    const [value, setValue] = useState('')
    const [showAutocomplete, setShowAutocomplete] = useState(true)

    const onChange = (e) => {
        setValue(e.target.value)
    }

    const selectOption = (name) => {
        setValue(name)
        setSearchValue(name)
        setShowAutocomplete(false)
    }

    const displayAutoComplete = () => {
        const result = []

        for (let pokemon of pokemonsInformation) {
            if (
                pokemon.name.toLowerCase().includes(value.toLowerCase()) &&
                showAutocomplete
            ) {
                result.push(
                    <div
                        key={pokemon.name}
                        onClick={() => selectOption(pokemon.name)}
                        className="search-option"
                    >
                        <span>{pokemon.name}</span>
                    </div>
                )
            }

            if (result.length === 5) {
                break
            }
        }

        return result
    }

    const autoComplete = displayAutoComplete()

    const navbarRef = useOutsideClick(() => setShowAutocomplete(false))

    const [sortTitle, setSortTitle] = useState('Lowest To Highest Number')
    const [typeTitle, setTypeTitle] = useState("All Types")

    const sortOptions = [
        <DropdownItem
            onClick={() => {
                setData((prev) => [...prev].sort((a, b) => a.id - b.id))
            }}
            title="Lowest To Highest Number"
            key="1"
        />,

        <DropdownItem
            onClick={() => {
                setData((prev) => {
                    const data = [...prev].sort((a, b) => a.id - b.id)

                    return [...data].reverse()
                })
                setSortTitle('Highest to Lowest Number')
            }}
            title="Highest to Lowest Number"
            key="2"
        />,

        <DropdownItem
            title="A-Z"
            key="3"
            onClick={() => {
                setData((prev) =>
                    [...prev].sort((a, b) => {
                        if (a.name < b.name) {
                            return -1
                        }
                        if (a.name > b.name) {
                            return 1
                        }

                        return 0
                    })
                )
            }}
        />,

        <DropdownItem
            title="Z-A"
            key="4"
            onClick={() => {
                setData((prev) =>
                    [...prev].sort((a, b) => {
                        if (a.name > b.name) {
                            return -1
                        }
                        if (a.name < b.name) {
                            return 1
                        }

                        return 0
                    })
                )
            }}
        />,
    ]

    const types = [
        'All Types',
        'Fighting',
        'Poison',
        'Rock',
        'Ghost',
        'Fire',
        'Grass',
        'Psychic',
        'Dragon',
        'Fairy',
        'Normal',
        'Flying',
        'Ground',
        'Bug',
        'Steel',
        'Water',
        'Electric',
        'Ice',
        'Dark',
        'Shadow',
    ]

    const handleSelect = (type) => {
        setTypeTitle(type)
        setData(data)

        if (type === 'All Types') {
            return
        }

        const result = [...data].filter((item) => {
            const pokemonTypes = item.types.map(
                (typeObject) => typeObject.type.name
            )

            return pokemonTypes.includes(type.toLowerCase())
        })

        setData(result)
    }

    const typeDropdownComponents = types.map((item, index) => (
        <DropdownItem title={item} key={index} onClick={() => handleSelect(item)} />
    ))

    const pages = [10, 20, 50];

    const showPerPageComponents = pages.map((item) => (
        <DropdownItem title={item} key={item} onClick={() => setShowPerPage(item)} />
    ))

    return (
        <>
            <div className="navbar">
                <div className="search-parent" ref={navbarRef}>
                    <input
                        placeholder="Search by name"
                        onChange={onChange}
                        value={value}
                        onFocus={() => setShowAutocomplete(true)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                setSearchValue(value.toLowerCase())
                                setShowAutocomplete(false)
                            }
                        }}
                    />
                    {autoComplete.length && value ? (
                        <div className="search-options">{autoComplete}</div>
                    ) : null}
                </div>
                <div
                    className="search-button"
                    onClick={() => setSearchValue(value)}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        className="search-icon"
                        fill="white"
                        onClick={() => setShowAutocomplete(false)}
                    >
                        <path d="m23.111 20.058-4.977-4.977a9.767 9.767 0 0 0 1.523-5.251c0-5.42-4.409-9.83-9.829-9.83C4.408 0 0 4.41 0 9.83s4.408 9.83 9.829 9.83a9.764 9.764 0 0 0 5.022-1.383l5.021 5.021c2.144 2.141 5.384-1.096 3.239-3.24zM3.047 9.83c0-3.739 3.043-6.782 6.782-6.782s6.782 3.042 6.782 6.782-3.043 6.782-6.782 6.782-6.782-3.043-6.782-6.782zm2.01-1.764c1.984-4.599 8.664-4.066 9.922.749a7.002 7.002 0 0 0-9.922-.749z"></path>
                    </svg>
                </div>

                <Dropdown title={typeTitle} items={typeDropdownComponents} />
                <Dropdown title={sortTitle} items={sortOptions} />

                <div className="show-per-page">
                    <p>Show per page:</p>

                    <Dropdown title={showPerPage + ''} items={showPerPageComponents} />
                </div>
            </div>

            {!showAutocomplete && searchValue ? (
                <p>Showing matches for {searchValue}</p>
            ) : null}
        </>
    )
}

Navbar.propTypes = {
    setSearchValue: PropTypes.func.isRequired,
    pokemonsInformation: PropTypes.array.isRequired,
    searchValue: PropTypes.string.isRequired,
    setData: PropTypes.func.isRequired,
    data: PropTypes.array.isRequired,
    showPerPage: PropTypes.number.isRequired,
    setShowPerPage: PropTypes.func.isRequired,
}

export default Navbar
