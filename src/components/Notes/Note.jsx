import React from 'react'
import PropTypes from 'prop-types';
import { MdDeleteForever } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';
import { RiArchiveDrawerFill } from "react-icons/ri"
import { MdClose } from "react-icons/md";
import './notes.css'

const Note = ({ id, text, category, handleDeleteCategory, editHandler, archiveHandler, deleteHandler }) => {
    return (
        <div className='note'>
            <div className='note-text'>{text}</div>
            <div className='note-footer'>
                {category ?
                    <div className='category-tag'>
                        <div className='category-padding'>{category}</div>
                        <MdClose
                            onClick={() => handleDeleteCategory(id)}
                            className='icon'
                            size='1.3em'
                        />
                    </div>
                    : <div></div>
                }

                <div className='note-buttons'>
                    <FaEdit
                        onClick={() => editHandler(id, text)}
                        className='icon-edit'
                        size='1.3em'
                    />
                    <RiArchiveDrawerFill
                        onClick={() => archiveHandler(id)}
                        className='icon-archive'
                        size='1.3em'
                    />
                    <MdDeleteForever
                        onClick={() => deleteHandler(id)}
                        className='icon'
                        size='1.3em'
                    />
                </div>
            </div>
        </div>
    )
}

Note.propTypes = {
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    handleDeleteCategory: PropTypes.func.isRequired,
    editHandler: PropTypes.func.isRequired,
    archiveHandler: PropTypes.func.isRequired,
    deleteHandler: PropTypes.func.isRequired
}

export default Note