import * as React from 'react';
import { Searchbar } from 'react-native-paper';

const SearchBar = (props) => {
  const [ searchQuery, setSearchQuery ] = React.useState('');
  const { setFilterString } = props;
  const onChangeSearch = query => {setSearchQuery(query); setFilterString(query)};

  return (
    <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
    />
  );
};

export default SearchBar;