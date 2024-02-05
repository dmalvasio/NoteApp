import React from 'react'
import PropTypes from 'prop-types';


const MainHeader = ({ user, onLogout }) => {
    const capitalizeFirstLetter = (user) => {
        return user.charAt(0).toUpperCase() + user.slice(1);
    };

    return (
        <div className='header'>
            <div>
                <h1 className='title'>My notes</h1>
            </div>
            <div>
                <label htmlFor='welcome-user'>Welcome, {capitalizeFirstLetter(user)}!</label>
                <button className='logout-button' onClick={onLogout}>Logout</button>
            </div>
        </div>
    )
}

MainHeader.propTypes = {
    user: PropTypes.string.isRequired,
    onLogout: PropTypes.func.isRequired
}

export default MainHeader