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
  usePlugStore,
} from '../../store';
import {
  NFTMetadata,
  OffersTableItem,
} from '../../declarations/legacy';
import { parseE8SAmountToWICP } from '../../utils/formatters';

// type CurrentListing = {
//   seller: string;
//   price: string;
// };

export const NftDetails = () => {
  const { loadedNFTS } = useNFTSStore();
  const { id } = useParams();
  const [showNFTActionButtons, setShowNFTActionButtons] =
    useState<boolean>(false);
  const recentlyListedForSale = useSelector(
    (state: RootState) => state.marketplace.recentlyListedForSale,
  );
  const recentlyCancelledItems = useSelector(
    (state: RootState) => state.marketplace.recentlyCancelledItems,
  );
  const recentlyAcceptedOffers = useSelector(
    (state: RootState) => state.marketplace.recentlyAcceptedOffers,
  );
  const recentlyMadeOffers = useSelector(
    (state: RootState) => state.marketplace.recentlyMadeOffers,
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
  const tokenOffers = useSelector((state: RootState) => {
    return state.marketplace.tokenOffers;
  });
  const recentlyCancelledOffers = useSelector((state: RootState) => {
    return state.marketplace.recentlyCancelledOffers;
  });

  const nftDetails: NFTMetadata | undefined = useMemo(
    () => loadedNFTS.find((nft) => nft.id === id),
    [loadedNFTS, id],
  );

  // TODO: We have the currentList/getAllListings because cap-sync is not available yet
  // which would fail to provide the data on update
  const owner = tokenListing?.seller?.toString() || nftDetails?.owner;
  const lastSalePrice =
    (tokenListing?.price &&
      parseE8SAmountToWICP(tokenListing.price)) ||
    (nftDetails?.price &&
      parseE8SAmountToWICP(BigInt(nftDetails.price)));
  const isListed = !!(tokenListing?.created || nftDetails?.isListed);
  const hasUserMadeOffer = tokenOffers?.some(
    (offer: OffersTableItem) =>
      offer?.item?.tokenId.toString() === id,
  );
  const dispatch = useAppDispatch();

  const [loadingOffers, setLoadingOffers] = useState<boolean>(true);
  const [offerItem, setOfferItem] = useState<OffersTableItem>();
  const { principalId } = usePlugStore();

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

    dispatch(
      marketplaceActions.getTokenOffers({
        // TODO: update ownerTokenIdentifiers naming convention
        ownerTokenIdentifiers: [BigInt(id)],
        onSuccess: (offers: OffersTableItem[]) => {
          setLoadingOffers(false);
          const offerFound = offers.find(
            (offer: OffersTableItem) =>
              offer.fromDetails.address === principalId,
          );
          if (!offerFound) {
            console.warn('Oops! Offer not found');
            // TODO: What to do if an offer is not found?
            return;
          }
          setOfferItem(offerFound);
        },
        onFailure: () => {
          // TODO: handle failure messages
        },
      }),
    );
  }, [
    dispatch,
    id,
    recentlyListedForSale,
    recentlyCancelledItems,
    recentlyAcceptedOffers,
    recentlyMadeOffers,
    recentlyCancelledOffers,
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
            >
              <source src={nftDetails.location} type="video/mp4" />
            </Video>
            <NFTTraitsContainer>
              <NFTTraitsChip
                label="Base"
                name={nftDetails.traits.base}
                rimValue="420 (4.20%)"
              />
              <NFTTraitsChip
                label="BigGem"
                name={nftDetails.traits.biggem}
                rimValue="420 (4.20%)"
              />
              <NFTTraitsChip
                label="Rim"
                name={nftDetails.traits.rim}
                rimValue="420 (4.20%)"
              />
              <NFTTraitsChip
                label="SmallGem"
                name={nftDetails.traits.smallgem}
                rimValue="420 (4.20%)"
              />
            </NFTTraitsContainer>
          </PreviewContainer>
          <DetailsContainer>
            <NFTMetaData id={id} />
            <OfferAccordion
              lastSalePrice={lastSalePrice?.toString()}
              isListed={isListed}
              hasUserMadeOffer={hasUserMadeOffer}
              loadingOffers={loadingOffers}
              offerItem={offerItem}
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
