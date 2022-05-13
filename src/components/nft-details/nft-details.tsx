import { useState, useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  OfferAccordion,
  AboutAccordion,
  NFTTraitsChip,
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
} from './styles';

import {
  useNFTSStore,
  RootState,
  useAppDispatch,
  marketplaceActions,
  nftsActions,
  useFilterStore,
  filterActions,
} from '../../store';
import { NFTMetadata } from '../../declarations/legacy';
import { parseE8SAmountToWICP } from '../../utils/formatters';
import { extractTraitData } from '../../store/features/filters/async-thunks/get-filter-traits';
import NftDetailsTraitSkeleton from './nft-details-traits-skeleton';

// type CurrentListing = {
//   seller: string;
//   price: string;
// };

export const NftDetails = () => {
  const dispatch = useAppDispatch();
  const { loadedNFTS } = useNFTSStore();
  const { loadedFiltersList, loadingFilterList } = useFilterStore();
  const { id } = useParams();
  const [showNFTActionButtons, setShowNFTActionButtons] =
    useState<boolean>(false);
  const recentlyListedForSale = useSelector(
    (state: RootState) => state.marketplace.recentlyListedForSale,
  );
  const recentlyCancelledItems = useSelector(
    (state: RootState) => state.marketplace.recentlyCancelledItems,
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

  const nftDetails: NFTMetadata | undefined = useMemo(() => {
    const details = loadedNFTS.find((nft) => nft.id === id);
    if (!details) return;

    return extractTraitData({ dispatch, details, loadedFiltersList });
  }, [loadedNFTS, id, loadedFiltersList]);
  // TODO: We have the currentList/getAllListings because cap-sync is not available yet
  // which would fail to provide the data on update
  const owner = tokenListing?.seller?.toString() || nftDetails?.owner;
  const lastSalePrice =
    (tokenListing?.price &&
      parseE8SAmountToWICP(tokenListing.price)) ||
    (nftDetails?.price &&
      parseE8SAmountToWICP(BigInt(nftDetails.price)));
  const isListed = !!(tokenListing?.created || nftDetails?.isListed);

  // TODO: We need more control, plus the
  // kyasshu calls should be placed as a thunk/action
  // of the state management of your choice, which is redux toolkit
  // by encapsulating everying here, we lose control it seems
  // of course you can pass parameters, but then why is it pulling id from useParams
  // when you have it in the parent component?
  // To have this work quickly, I've disabled it for now
  // useNFTDetailsFetcher();
  useEffect(() => {
    // TODO: handle the error gracefully when there is no id
    if (!id) return;

    dispatch(nftsActions.getNFTDetails({ id }));

    dispatch(filterActions.getFilterTraits());

    // TODO: add loading placeholders in action buttons
    // like Sell/Cancel/Edit/Make Offer/Buy Now
    // to show users that getTokenListing call is under progress

    dispatch(
      marketplaceActions.getTokenListing({
        id,
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
  }, [dispatch, id, recentlyListedForSale, recentlyCancelledItems]);

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
            >
              <source src={nftDetails.location} type="video/mp4" />
            </Video>
            <NFTTraitsContainer>
              {loadingFilterList ? (
                // TO-DO: Add in skeleton for trait boxes
                <NftDetailsTraitSkeleton />
              ) : (
                <>
                  <NFTTraitsChip
                    label="Base"
                    name={nftDetails.traits.base.name}
                    rimValue={`${nftDetails.traits.base.occurance} (${nftDetails.traits.base.rarity}%)`}
                  />
                  <NFTTraitsChip
                    label="BigGem"
                    name={nftDetails.traits.biggem.name}
                    rimValue={`${nftDetails.traits.biggem.occurance} (${nftDetails.traits.biggem.rarity}%)`}
                  />
                  <NFTTraitsChip
                    label="Rim"
                    name={nftDetails.traits.rim.name}
                    rimValue={`${nftDetails.traits.rim.occurance} (${nftDetails.traits.rim.rarity}%)`}
                  />
                  <NFTTraitsChip
                    label="SmallGem"
                    name={nftDetails.traits.smallgem.name}
                    rimValue={`${nftDetails.traits.smallgem.occurance} (${nftDetails.traits.smallgem.rarity}%)`}
                  />
                </>
              )}
            </NFTTraitsContainer>
          </PreviewContainer>
          <DetailsContainer>
            <NFTMetaData id={id} />
            <OfferAccordion
              lastSalePrice={lastSalePrice?.toString()}
              isListed={isListed}
              owner={owner}
              showNFTActionButtons={showNFTActionButtons}
            />
            <AboutAccordion owner={owner} />
          </DetailsContainer>
        </Wrapper>
      ) : (
        <Wrapper centered>Loading...</Wrapper>
      )}
    </Container>
  );
};
