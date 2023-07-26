import PropTypes from "prop-types"

const DropdownItem = ({title, onClick}) => {
    return (
        <div onClick={onClick} className="dropdownItem">
            <p>{title}</p>
        </div>
    )
}

DropdownItem.propTypes = {
    title: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
}

export default DropdownItem