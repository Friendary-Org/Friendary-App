import * as React from 'react';
import { Searchbar } from 'react-native-paper';

const SearchBar = (props) => {
  const [ searchQuery, setSearchQuery ] = React.useState('');
  const { setFilterString, setSearchbarFocused } = props;
  const onChangeSearch = query => {setSearchQuery(query); setFilterString(query)};

  return (
    (setSearchbarFocused !== undefined && setSearchbarFocused !== undefined ? 
      <Searchbar
        onFocus={() => setSearchbarFocused(true)} 
        onBlur={() => setSearchbarFocused(false)} 
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
      /> :
      <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
      />
    )
  );
};

export default SearchBar;