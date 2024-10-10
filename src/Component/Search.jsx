import React, { useState,useEffect,useRef } from 'react';
import { IoIosSearch } from 'react-icons/io';
import "./Header.css"


export const Search = ({ onSearchQueryChange,theme }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null); 

  const handleChange = (event) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    onSearchQueryChange(newQuery); 
  };

  const performSearch = () => {
    if (query.trim()) {
      console.log('Search query:', query);
    } else {
      console.log('Please enter a search term.');
    }
  };

  useEffect(() => {
    if (query.trim()) {
      performSearch();
    }
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === 'k') {
        event.preventDefault();
        if (inputRef.current) {
          inputRef.current.focus(); 
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className={`${theme=="black"?"black":""} HeaderSearchButton`}>
      <IoIosSearch className='HeaderSearchIcon' />
      <input
        type="text"
        placeholder="Search"
        value={query}
        onChange={handleChange} 
        ref={inputRef}
      />
      <div className={`ShortcutText`}>Ctrl + K</div>
    </div>
  );
}

