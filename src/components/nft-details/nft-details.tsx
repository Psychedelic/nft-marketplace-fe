import { useState, useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  OfferAccordion,
  AboutAccordion,
  NFTTraitsChip,
  OfferAccordionHeader,
  AboutAccordionHeader,
} from '../core';
import { NFTMetaData } from '../nft-metadata';
import { NftActionBar } from '../nft-action-bar';
import {
  Container,
  Wrapper,
  PreviewContainer,
  NFTTraitsContainer,
  DetailsContainer,
  Video,
  Divider,
  OfferAccordionDetails,
  AboutAccordionDetails,
} from './styles';
import {
  useNFTSStore,
  RootState,
  useAppDispatch,
  marketplaceActions,
  nftsActions,
  useFilterStore,
  filterActions,
  usePlugStore,
} from '../../store';
import { NFTMetadata } from '../../declarations/legacy';
import { parseE8SAmountToWICP } from '../../utils/formatters';
import {
  extractTraitData,
  getTraitName,
} from '../../store/features/filters/async-thunks/get-filter-traits';
import TraitsListLoader from './TraitsListLoader';
import { roundOffDecimalValue } from '../../utils/nfts';
import NFTDetailsSkeleton from './nft-details-skeleton';
import useMediaQuery from '../../hooks/use-media-query';

// type CurrentListing = {
//   seller: string;
//   price: string;
// };

export const NftDetails = () => {
  const dispatch = useAppDispatch();
  const { loadedNFTS } = useNFTSStore();
  const { loadedFiltersList, loadingFilterList } = useFilterStore();
  const { id, collectionId } = useParams();
  const [showNFTActionButtons, setShowNFTActionButtons] =
    useState<boolean>(false);
  const recentlyListedForSale = useSelector(
    (state: RootState) => state.marketplace.recentlyListedForSale,
  );
  const recentlyCancelledItems = useSelector(
    (state: RootState) => state.marketplace.recentlyCancelledItems,
  );
  const recentlyPurchasedTokens = useSelector(
    (state: RootState) => state.marketplace.recentlyPurchasedTokens,
  );
  const tokenListing = useSelector((state: RootState) => {
    if (
      !id ||
      !state.marketplace?.tokenListing ||
      !(id in state.marketplace.tokenListing)
    )
      return;

    // eslint-disable-next-line consistent-return
    return state.marketplace.tokenListing[id];
  });

  const { isConnected, principalId: plugPrincipal } = usePlugStore();

  const nftDetails: NFTMetadata | undefined = useMemo(() => {
    const details = loadedNFTS.find((nft) => nft.id === id);
    if (!details) return;

    return extractTraitData({
      dispatch,
      details,
      loadedFiltersList,
    });
  }, [loadedNFTS, id, loadedFiltersList, dispatch]);
  // TODO: We have the currentList/getAllListings because cap-sync is not available yet
  // which would fail to provide the data on update
  const owner =
    tokenListing?.listing?.seller.toString() || nftDetails?.owner;
  const lastSalePrice =
    (tokenListing?.listing?.price &&
      parseE8SAmountToWICP(tokenListing?.listing?.price)) ||
    (tokenListing?.last_sale?.price &&
      parseE8SAmountToWICP(tokenListing?.last_sale?.price));
  const isListed = !!tokenListing?.listing?.time;
  const isMobileScreen = useMediaQuery('(max-width: 850px)');

  useEffect(() => {
    // TODO: handle the error gracefully when there is no id
    if (!id || !collectionId) return;

    if (!loadedFiltersList.length) {
      dispatch(filterActions.getFilterTraits({ collectionId }));
    }

    if (!nftDetails) {
      dispatch(
        nftsActions.getNFTDetails({
          id,
          collectionId,
          plugPrincipal,
        }),
      );
    }

    dispatch(
      marketplaceActions.getTokenListing({
        id,
        collectionId,
        onSuccess: () => {
          // Listing got successfull so allowing
          // user to take actions over NFT
          setShowNFTActionButtons(true);
        },
        onFailure: () => {
          // Listing got failed so not allowing
          // user to take actions over NFT
          setShowNFTActionButtons(false);
        },
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    plugPrincipal,
    dispatch,
    id,
    collectionId,
    recentlyListedForSale,
    recentlyCancelledItems,
    recentlyPurchasedTokens,
  ]);

  return (
    <Container>
      <NftActionBar
        owner={owner}
        isListed={isListed}
        showNFTActionButtons={showNFTActionButtons}
      />
      {nftDetails ? (
        <Wrapper>
          <PreviewContainer>
            <Video
              loop
              autoPlay
              muted
              preload="metadata"
              controls={false}
              poster={nftDetails.preview}
              src={nftDetails.location}
            />
            <NFTTraitsContainer>
              {loadingFilterList ? (
                <TraitsListLoader />
              ) : (
                <>
                  {Object.keys(nftDetails.traits).map((key) => (
                    <NFTTraitsChip
                      label={getTraitName(key)}
                      key={key}
                      name={nftDetails?.traits[`${key}`].name}
                      rimValue={`${
                        nftDetails?.traits[`${key}`].occurance
                      } (${roundOffDecimalValue(
                        nftDetails?.traits[`${key}`].rarity,
                        2,
                      )}%)`}
                    />
                  ))}
                </>
              )}
            </NFTTraitsContainer>
            {isMobileScreen && <Divider />}
            {isMobileScreen && (
              <>
                <OfferAccordionDetails flexDirection="column">
                  <OfferAccordionHeader
                    isListed={isListed}
                    lastSalePrice={lastSalePrice?.toString()}
                    owner={owner}
                    showNFTActionButtons={showNFTActionButtons}
                    operator={nftDetails?.operator}
                    isMobileScreen={isMobileScreen}
                  />
                </OfferAccordionDetails>
                <AboutAccordionDetails>
                  <AboutAccordionHeader
                    owner={owner}
                    isMobileScreen={isMobileScreen}
                  />
                </AboutAccordionDetails>
              </>
            )}
            {isMobileScreen && (
              <>
                {isConnected && (
                  <OfferAccordion
                    lastSalePrice={lastSalePrice?.toString()}
                    isListed={isListed}
                    owner={owner}
                    showNFTActionButtons={showNFTActionButtons}
                    operator={nftDetails?.operator}
                    isMobileScreen={isMobileScreen}
                  />
                )}
                <AboutAccordion
                  owner={owner}
                  isMobileScreen={isMobileScreen}
                />
              </>
            )}
          </PreviewContainer>
          <DetailsContainer>
            <NFTMetaData
              id={id}
              owner={owner}
              isListed={isListed}
              showNFTActionButtons={showNFTActionButtons}
            />
            {!isMobileScreen && (
              <>
                <OfferAccordion
                  lastSalePrice={lastSalePrice?.toString()}
                  isListed={isListed}
                  owner={owner}
                  showNFTActionButtons={showNFTActionButtons}
                  operator={nftDetails?.operator}
                />
                <AboutAccordion owner={owner} />
              </>
            )}
          </DetailsContainer>
        </Wrapper>
      ) : (
        <NFTDetailsSkeleton />
      )}
    </Container>
  );
};
