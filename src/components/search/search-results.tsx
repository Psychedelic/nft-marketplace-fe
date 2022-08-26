import { useTranslation } from 'react-i18next';
import NFTsSearchResults from './nfts-search-results';

type SearchResultsTypes = {
  searchText: string;
  closeDropDown: () => void;
};

const SearchResults = ({
  searchText,
  closeDropDown,
}: SearchResultsTypes) => {
  const { t } = useTranslation();

  return (
    <>
      <NFTsSearchResults
        searchText={searchText}
        closeDropDown={closeDropDown}
      />
    </>
  );
};

export default SearchResults;
