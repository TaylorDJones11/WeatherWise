import { useState } from 'react';

function SearchBar({ onSearch }) {
  const [value, setValue] = useState('');

  function handleChange(e) {
    setValue(e.target.value);
    console.log(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (value.trim() === '') return;
    onSearch(value);
    setValue('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        className='search'
        type='text'
        placeholder='Enter city'
        value={value}
        onChange={handleChange}
      ></input>
    </form>
  );
}
export default SearchBar;
