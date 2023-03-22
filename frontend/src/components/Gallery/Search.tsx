import { useState } from 'react';
import { Input, InputGroup, InputRightElement, Button } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { SearchBarProps, event } from '../../types';

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [searchValue, setSearchValue] = useState('');

  const handleInputChange = (event: event) => {
    setSearchValue(event.target.value);
  };

  const handleSearch = () => {
    onSearch(searchValue);
  };

  return (
    <InputGroup w={'50%'}>
      <Input
        type="text"
        placeholder="Search"
        value={searchValue}
        onChange={handleInputChange}
      />
      <InputRightElement>
        <Button
          bg="transparent"
          _hover={{ bg: 'transparent' }}
          onClick={handleSearch}
        >
          <SearchIcon />
        </Button>
      </InputRightElement>
    </InputGroup>
  );
};

export default SearchBar;
