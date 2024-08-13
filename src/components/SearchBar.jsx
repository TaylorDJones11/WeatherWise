import { useState } from 'react';

function SearchBar() {
  const [value, setValue] = useState('');

  function handleChange(e) {
    setValue(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (value.trim() === '') return;
    setValue('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        className='search'
        type='text'
        placeholder='Enter city'
        name=''
        onChange={handleChange}
      ></input>
      <button>Search</button>
    </form>
  );
}
export default SearchBar;
