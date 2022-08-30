import { useTranslation } from 'react-i18next';
import banner from '../../assets/collection-list-placeholder.png';
import bannerOne from '../../assets/collection-list-placeholder(1).png';
import bannerTwo from '../../assets/collection-list-placeholder(2).png';
import bannerThree from '../../assets/collection-list-placeholder(3).png';
import logo from '../../assets/collection-list-sub-placeholder.png';
import logoOne from '../../assets/collection-list-sub-placeholder(1).png';
import logoTwo from '../../assets/collection-list-sub-placeholder(2).png';
import logoThree from '../../assets/collection-list-sub-placeholder(3).png';
import { CollectionFilterDropdown } from '../core/dropdown/collection-filter-dropdown';
import {
  ExploreCollectionsContainer,
  ExploreCollectionsWrapper,
  Flex,
  Heading,
  SubText,
  CollectionsContainer,
  CollectionContainer,
  BannerImage,
  LogoImageWrapper,
  LogoImage,
  CollectionDataWrapper,
  CollectionData,
  OwnerText,
} from './styles';

const ExploreCollections = () => {
  const { t } = useTranslation();

  return (
    <ExploreCollectionsContainer>
      <ExploreCollectionsWrapper>
        <Flex>
          <div>
            <Heading>
              {t(
                'translation:collections.exploreCollections.exploreCollectionTitle',
              )}
            </Heading>
            <SubText>
              {t(
                'translation:collections.exploreCollections.description',
              )}
            </SubText>
          </div>
          <CollectionFilterDropdown />
        </Flex>
        <CollectionsContainer>
          {collections.map((collection) => (
            <CollectionContainer>
              <div>
                <BannerImage src={collection.banner} />
              </div>
              <CollectionDataWrapper>
                <LogoImageWrapper>
                  <LogoImage src={collection.logo} />
                </LogoImageWrapper>
                <CollectionData>
                  <SubText size="sm" color="primary" font="bold">
                    {collection.name}
                  </SubText>
                  <SubText size="sm" height="small">
                    By <OwnerText>{collection.owner}</OwnerText>
                  </SubText>
                </CollectionData>
              </CollectionDataWrapper>
            </CollectionContainer>
          ))}
        </CollectionsContainer>
      </ExploreCollectionsWrapper>
    </ExploreCollectionsContainer>
  );
};

export default ExploreCollections;

const collections = [
  {
    banner: bannerOne,
    logo: logoOne,
    name: 'Chubbicorns',
    owner: 'rgblt...whfy',
  },
  {
    banner: bannerTwo,
    logo: logoTwo,
    name: 'Chubbicorns',
    owner: 'rgblt...whfy',
  },
  {
    banner: banner,
    logo: logo,
    name: 'Chubbicorns',
    owner: 'rgblt...whfy',
  },
  {
    banner: bannerThree,
    logo: logoThree,
    name: 'Chubbicorns',
    owner: 'rgblt...whfy',
  },
  {
    banner: bannerTwo,
    logo: logoTwo,
    name: 'Chubbicorns',
    owner: 'rgblt...whfy',
  },
  {
    banner: banner,
    logo: logo,
    name: 'Chubbicorns',
    owner: 'rgblt...whfy',
  },
  {
    banner: bannerThree,
    logo: logoThree,
    name: 'Chubbicorns',
    owner: 'rgblt...whfy',
  },
  {
    banner: bannerOne,
    logo: logoOne,
    name: 'Chubbicorns',
    owner: 'rgblt...whfy',
  },
];
