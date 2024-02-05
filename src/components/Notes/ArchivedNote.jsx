import React from 'react'
import PropTypes from 'prop-types';
import { TbArrowBackUp } from "react-icons/tb";
import './notes.css'

const ArchivedNote = ({ id, text, selectedCategory, unarchiveHandler }) => {
    return (
        <div className='note'>
            <div className='note-text'>{text}</div>
            <div className='note-footer'>
                {selectedCategory ?
                    <span className="category-tag">
                        {selectedCategory}
                    </span>
                    : <div></div>
                }
                <TbArrowBackUp
                    onClick={() => unarchiveHandler(id)}
                    className='icon'
                    size='1.3em'
                />
            </div>
        </div>
    )
}

ArchivedNote.propTypes = {
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    selectedCategory: PropTypes.string.isRequired,
    unarchiveHandler: PropTypes.func.isRequired
}

export default ArchivedNote