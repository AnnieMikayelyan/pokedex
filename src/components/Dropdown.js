import PropTypes from 'prop-types'
import { useState } from 'react'
import { useOutsideClick } from '../hooks/useOutsideClick'

const Dropdown = ({ title, items }) => {
    const [isOpen, setIsOpen] = useState(false)

    const toggle = () => {
        setIsOpen((prev) => !prev)
    }

    const dropdownRef = useOutsideClick(() => setIsOpen(false))

    return (
        <div className="dropdown" onClick={toggle} ref={dropdownRef}>
            <span>{title}</span>
            <svg
                className="vector"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="#397f84"
            >
                <path d="m5 3 3.057-3L20 12 8.057 24 5 21l9-9z"></path>
            </svg>

            {isOpen ? (
                <div className="dropdownItems">
                    {items.length < 20 ? (
                        items.map((item) => item)
                    ) : (
                        <div className="allTypes">
                            <div>
                                {items.map((item, index) => {
                                    if (index > 9) return null
                                    return item
                                })}
                            </div>
                            <div>
                                {items.map((item, index) => {
                                    if (index < 10) return null
                                    return item
                                })}
                            </div>
                        </div> 
                    )}
                </div>
            ) : null}
        </div>
    )
}

Dropdown.propTypes = {
    title: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(PropTypes.node).isRequired,
}

export default Dropdown
