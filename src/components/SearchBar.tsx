import React, { useState } from 'react';

interface Props {
  onSubmit: (name: string) => void;
}

const SearchBar = React.memo<Props>(({onSubmit}) => {
  const [value, setValue] = useState<string>("");
  const handleSubmit: React.FormEventHandler = (event) => {
    event.preventDefault();
    onSubmit(value);
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>
        <input type="text" value={value} onChange={(event) => setValue(event.target.value)} />
      </label>
      <input type="submit" value="Search" />
    </form>
  );
});

export default SearchBar;