import React from 'react'
import PropTypes from 'prop-types';
import './notes.css'

const CreateNote = ({ inputText, setInputText, saveHandler, selectedCategory, setSelectedCategory }) => {
    const char = 160;
    const charLimit = char - inputText.length;

    return (
        <div className='note new'>
            <textarea
                cols={10}
                rows={5}
                placeholder='Type...'
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                maxLength={160}
            >
            </textarea>
            <div className='note-footer'>
                <div className='note-footer-left'>
                    <span className='label'>{charLimit} Left</span>
                </div>
                <div className='note-footer-right'>
                    <select id="category"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}>
                        <option value="" hidden>Category</option>
                        <option value="Personal">Personal</option>
                        <option value="Work">Work</option>
                        <option value="Study">Study</option>
                        <option value="Reminder">Reminder</option>
                        <option value="Other">Other</option>
                    </select>
                    <button className='note-save' onClick={saveHandler}>Save</button>
                </div>
            </div>
        </div >
    )
}

CreateNote.propTypes = {
    inputText: PropTypes.string.isRequired,
    setInputText: PropTypes.func.isRequired,
    saveHandler: PropTypes.func.isRequired,
    selectedCategory: PropTypes.string.isRequired,
    setSelectedCategory: PropTypes.func.isRequired
}

export default CreateNote