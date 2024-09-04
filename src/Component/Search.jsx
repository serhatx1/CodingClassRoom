import React, { useState,useEffect,useRef } from 'react';
import { IoIosSearch } from 'react-icons/io';
import "./Header.css"


export const Search = () => {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null); 

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const performSearch = () => {
    if (query.trim()) {
      // Burada arama işlemini gerçekleştirin
      console.log('Arama sorgusu:', query);
      // fetch(`api/search?query=${query}`)
      //   .then(response => response.json())
      //   .then(data => console.log(data))
      //   .catch(error => console.error('Error:', error));
    } else {
      console.log('Lütfen bir arama terimi girin.');
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
    <div className='HeaderSearchButton'>
      <IoIosSearch className='HeaderSearchIcon' />
      <input
        type="text"
        placeholder="Search"
        value={query}
        onChange={handleChange} 
        ref={inputRef}
      />
      <div className="ShortcutText">Ctrl + K</div>
    </div>
  );
}

