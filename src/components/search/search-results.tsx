import { useTranslation } from 'react-i18next';
import NFTsSearchResults from './nfts-search-results';
import CollectionsSearchResults from './collections-search-results';
import {
  TabsRoot,
  TabsTrigger,
  TabsList,
  TabsContent,
} from './styles';

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
    <TabsRoot defaultValue="nfts">
      <TabsList aria-label="Manage search results">
        <TabsTrigger value="nfts">
          {t('translation:tabs.nfts')}
        </TabsTrigger>
        <TabsTrigger value="collections">
          {t('translation:tabs.collections')}
        </TabsTrigger>
      </TabsList>
      <TabsContent value="nfts">
        <NFTsSearchResults
          searchText={searchText}
          closeDropDown={closeDropDown}
        />
      </TabsContent>
      <TabsContent value="collections">
        <CollectionsSearchResults
          searchText={searchText}
          closeDropDown={closeDropDown}
        />
      </TabsContent>
    </TabsRoot>
  );
};

export default SearchResults;
