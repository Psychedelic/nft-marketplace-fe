import React, { useMemo, useEffect, useState } from 'react';
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

import { useNFTSStore, RootState, useAppDispatch, getTokenListing } from '../../store';
import { NFTMetadata } from '../../declarations/legacy';

import { fetchNFTDetails } from '../../integrations/kyasshu/utils';

type CurrentListing = {
  payment_address: string;
  price: string;
};

export const NftDetails = () => {
  const { loadedNFTS } = useNFTSStore();
  const { id } = useParams();
  const [currentListing, setCurrentListing] = useState<CurrentListing>();
  const recentlyListedForSale = useSelector(
    (state: RootState) => state.marketplace.recentlyListedForSale,
  );
  const recentlyCancelledItems = useSelector(
    (state: RootState) => state.marketplace.recentlyCancelledItems,
  );
  const tokenListing = useSelector(
    (state: RootState) => {
      const ls = state.marketplace.tokenListing;
      // TODO: use the correct type def
      const tokenListed = ls?.find((item: any) => item.tokenId === id);
      return tokenListed;
    },
  );
  const nftDetails: NFTMetadata | undefined = useMemo(
    () => loadedNFTS.find((nft) => nft.id === id),
    [loadedNFTS, id],
  );
  // TODO: We have the currentList/getAllListings because cap-sync is not available yet
  // which would fail to provide the data on update
  const owner = currentListing?.payment_address.toString() || nftDetails?.owner;
  const lastSalePrice = tokenListing?.price || nftDetails?.price;
  const isListed = tokenListing?.created || nftDetails?.isListed;
  const dispatch = useAppDispatch();

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

    fetchNFTDetails({
      dispatch,
      id,
    });

    dispatch(
      getTokenListing({
        id,
      }),
    );
  }, [dispatch, id, recentlyListedForSale, recentlyCancelledItems]);

  return (
    <Container>
      <NftActionBar owner={owner} isListed={isListed} />
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
              lastSalePrice={lastSalePrice}
              isListed={isListed}
              owner={owner}
            />
            <AboutAccordion owned />
          </DetailsContainer>
        </Wrapper>
      ) : (
        <Wrapper centered>Loading...</Wrapper>
      )}
    </Container>
  );
};
