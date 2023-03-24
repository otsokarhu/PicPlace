import { searchResultsState } from '../../state/PicturesState';
import { useRecoilValue } from 'recoil';
import PictureListPage from './PictureListPage';

const SearchResults = () => {
  const pictures = useRecoilValue(searchResultsState);

  const toggleWindowConfirm = () => {
    console.log('none');
  };

  const handleNone = () => {
    console.log('none');
  };

  return (
    <PictureListPage
      pictures={pictures}
      page={'search'}
      toggleWindowConfirm={toggleWindowConfirm}
      isOpen={false}
      handleDelete={handleNone}
      name={'search'}
    />
  );
};

export default SearchResults;
