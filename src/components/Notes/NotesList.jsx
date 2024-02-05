import React, { useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid'
import CreateNote from './CreateNote'
import Note from './Note'
import ArchivedNote from './ArchivedNote'
import ArchivedHeader from '../ArchivedHeader'
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

const STORAGE_KEY = "Notes"

const NotesList = () => {
    const [inputText, setInputText] = useState("")
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    const [notes, setNotes] = useState(data)
    const [category, setCategory] = useState('');
    const [archivedNotes, setArchivedNotes] = useState([]);
    const [editToggle, setEditToggle] = useState(null)
    const [filterCategory, setFilterCategory] = useState('All');
    const [isListCollapsed, setIsListCollapsed] = useState(false);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    }, [notes]);

    const saveHandler = () => {
        if (!category) {
            alert("Choose a category, please");
            return;
        } else {
            if (editToggle) {
                setNotes(notes.map((note) => (
                    note.id === editToggle ?
                        { ...note, text: inputText, category: category }
                        : note
                )))
            } else if (inputText.trim().length > 0) {
                setNotes((prevNotes) => [
                    ...prevNotes, {
                        id: uuid(),
                        text: inputText,
                        category: category,
                        isArchived: false
                    }
                ])
            }
            setInputText('')
            setCategory('')
            setEditToggle(null)
        }
    }

    const handleDeleteCategory = (noteId) => {
        setNotes((prevNotes) => {
            return prevNotes.map((note) => {
                if (note.id === noteId) {
                    return { ...note, category: '' };
                }
                return note;
            });
        });
    };

    const editHandler = (id, text) => {
        setEditToggle(id)
        setInputText(text)
    }

    const deleteHandler = (id) => {
        const newNotes = notes.filter(n => n.id !== id)
        setNotes(newNotes)
    }

    const archiveHandler = (id) => {
        const noteToArchive = notes.find((note) => note.id === id);
        setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
        setArchivedNotes((prevArchivedNotes) => [
            ...prevArchivedNotes,
            { ...noteToArchive, isArchived: true },
        ]);
    };

    const unarchiveHandler = (id) => {
        const noteToUnarchive = archivedNotes.find((note) => note.id === id);
        setArchivedNotes((prevArchivedNotes) =>
            prevArchivedNotes.filter((note) => note.id !== id)
        );
        setNotes((prevNotes) => [...prevNotes, { ...noteToUnarchive, isArchived: false }]);
    };

    const handleFilterChange = (selectedCategory) => {
        setFilterCategory(selectedCategory);
    };

    const toggleListCollapse = () => {
        setIsListCollapsed((prevCollapsed) => !prevCollapsed);
    };

    const filteredNotes = filterCategory === 'All' ? notes : notes.filter((note) => note.category === filterCategory);

    return (
        <div>
            <label htmlFor='Filter by'>Filter by:</label>
            <select
                className='categories'
                value={filterCategory}
                onChange={(e) => handleFilterChange(e.target.value)}
            >
                <option value="All">All</option>
                <option value="Personal">Personal</option>
                <option value="Work">Work</option>
                <option value="Study">Study</option>
                <option value="Reminder">Reminder</option>
                <option value="Other">Other</option>
            </select>

            <div className='notes'>
                {filteredNotes.map((note) => (
                    editToggle === note.id ?
                        <CreateNote
                            inputText={inputText}
                            setInputText={setInputText}
                            saveHandler={saveHandler}
                            selectedCategory={category}
                            setSelectedCategory={setCategory}
                        />
                        :
                        <Note
                            key={note.id}
                            id={note.id}
                            text={note.text}
                            category={note.category}
                            handleDeleteCategory={handleDeleteCategory}
                            editHandler={editHandler}
                            archiveHandler={archiveHandler}
                            deleteHandler={deleteHandler}
                        />
                ))
                }
                {
                    editToggle === null &&
                    <CreateNote
                        inputText={inputText}
                        setInputText={setInputText}
                        saveHandler={saveHandler}
                        selectedCategory={category}
                        setSelectedCategory={setCategory}
                    />
                }

            </div>
            <div className='archive-header'>
                <ArchivedHeader />
                {isListCollapsed ?
                    <IoIosArrowUp
                        onClick={toggleListCollapse}
                        className='arrow-icon'
                        size='1.8rem'
                    />
                    :
                    <IoIosArrowDown
                        onClick={toggleListCollapse}
                        className='arrow-icon'
                        size='1.8rem'
                    />
                }
            </div>
            <div className={`notes ${isListCollapsed ? 'collapsed' : ''}`}>
                {
                    archivedNotes.map((note) => (
                        <ArchivedNote
                            key={note.id}
                            id={note.id}
                            text={note.text}
                            selectedCategory={note.category}
                            unarchiveHandler={unarchiveHandler}
                        />
                    ))
                }
            </div>
        </div >
    )
}

export default NotesList