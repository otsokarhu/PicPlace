import { useState } from 'react';
import {
  Input,
  InputGroup,
  InputRightElement,
  Button,
  useToast,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import {
  searchResultsState,
  allPicturesState,
} from '../../state/PicturesState';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { event } from '../../types';
import SearchResults from '../PicturePages/SearchResultPage';
import ModalElement from '../Modal';

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState('');
  const setSearchResults = useSetRecoilState(searchResultsState);
  const allPictures = useRecoilValue(allPicturesState);
  const toast = useToast();
  const [isSearchResultsModalOpen, setIsSearchResultsOpen] = useState(false);

  const handleInputChange = (event: event) => {
    setSearchValue(event.target.value);
  };

  const handleSearch = () => {
    const results = allPictures.filter(
      ({ path, description }) =>
        path.toLowerCase().includes(searchValue.toLowerCase()) ||
        description.toLowerCase().includes(searchValue.toLowerCase())
    );
    if (results.length === 0) {
      toast({
        title: 'No results found',
        status: 'info',
        duration: 3000,
        position: 'top',
        isClosable: true,
      });
      return;
    }
    setSearchResults(results);
    setIsSearchResultsOpen(true);
    setSearchValue('');
  };

  return (
    <>
      <InputGroup w={'50%'}>
        <Input
          type="text"
          placeholder="Search by picture name or description"
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
      <ModalElement
        isOpen={isSearchResultsModalOpen}
        onClose={() => setIsSearchResultsOpen(false)}
        title={'Search Results'}
        component={<SearchResults />}
      />
    </>
  );
};

export default SearchBar;
