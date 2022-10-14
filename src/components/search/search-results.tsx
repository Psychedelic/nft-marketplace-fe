import NFTsSearchResults from './nfts-search-results';
import { TabsRoot, TabsContent } from './styles';

type SearchResultsTypes = {
  searchText: string;
  closeDropDown: () => void;
};

const SearchResults = ({
  searchText,
  closeDropDown,
}: SearchResultsTypes) => {
  return (
    <TabsRoot>
      <TabsContent>
        <NFTsSearchResults
          searchText={searchText}
          closeDropDown={closeDropDown}
        />
      </TabsContent>
    </TabsRoot>
  );
};

export default SearchResults;
