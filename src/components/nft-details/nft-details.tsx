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

import { useNFTSStore, useAppDispatch } from '../../store';
import { NFTMetadata } from '../../declarations/legacy';

import { useNFTDetailsFetcher } from '../../integrations/kyasshu';
import { getAllListings } from '../../store/features/marketplace';

type CurrentListing = {
  payment_address: string;
  price: string;
};

export const NftDetails = () => {
  const { loadedNFTS } = useNFTSStore();
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const [currentListing, setCurrentListing] = useState<CurrentListing>();
  const allListings = useSelector(
    (state: any) => state.marketplace.allListings,
  );
  const nftDetails: NFTMetadata | undefined = useMemo(
    () => loadedNFTS.find((nft) => nft.id === id),
    [loadedNFTS, id],
  );
  // TODO: We have the currentList because cap-sync is not available yet
  // which would fail to provide the data on update
  const owner = currentListing?.payment_address.toString() || nftDetails?.owner;
  const lastSalePrice = currentListing?.price || nftDetails?.price;
  const isListed = !!currentListing || nftDetails?.isListed;

  useNFTDetailsFetcher();

  useEffect(() => {
    // TODO: Get all listings is not scalable
    // we'll need to securily trigger an update via kyasshu or similar
    dispatch(getAllListings());
  }, [dispatch]);

  useEffect(() => {
    if (!id || !allListings[id]) return;

    setCurrentListing(allListings[id]);
  }, [allListings, id]);

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
