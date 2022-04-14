import React, { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { OfferAccordion, AboutAccordion, NFTTraitsChip } from '../core';
import { NFTMetaData } from '../nft-metadata';
import { NftActionBar } from '../nft-action-bar';
import { Container, Wrapper, PreviewContainer, NFTTraitsContainer, DetailsContainer, Video } from './styles';
import { useNFTSStore, useAppDispatch } from '../../store';
import { getAllListings } from '../../store/features/marketplace';
import { NFTMetadata } from '../../declarations/legacy';

import { useNFTDetailsFetcher } from '../../integrations/kyasshu';

export const NftDetails = () => {
  const { loadedNFTS } = useNFTSStore();
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const allListings = useSelector((state: any) => state.marketplace.allListings);
  const currentListing = id ? allListings[id] : undefined;

  const nftDetails: NFTMetadata | undefined = useMemo(() => loadedNFTS.find((nft) => nft.id === id), [loadedNFTS, id]);

  useNFTDetailsFetcher();

  useEffect(() => {
    // TODO: Get all listings is not scalable
    // we'll need to securily trigger an update via kyasshu or similar
    dispatch(getAllListings());
  }, []);

  return (
    <Container>
      <NftActionBar owner={nftDetails?.owner} isListed={nftDetails?.isListed} />
      {nftDetails ? (
        <Wrapper>
          <PreviewContainer>
            <Video loop autoPlay muted preload="metadata" controls={false} poster={nftDetails.preview}>
              <source src={nftDetails.location} type="video/mp4" />
            </Video>
            <NFTTraitsContainer>
              <NFTTraitsChip label="Base" name={nftDetails.traits.base} rimValue="420 (4.20%)" />
              <NFTTraitsChip label="BigGem" name={nftDetails.traits.biggem} rimValue="420 (4.20%)" />
              <NFTTraitsChip label="Rim" name={nftDetails.traits.rim} rimValue="420 (4.20%)" />
              <NFTTraitsChip label="SmallGem" name={nftDetails.traits.smallgem} rimValue="420 (4.20%)" />
            </NFTTraitsContainer>
          </PreviewContainer>
          <DetailsContainer>
            <NFTMetaData id={nftDetails.id} />
            <OfferAccordion
              lastSalePrice={currentListing?.price}
              isListed={!!currentListing}
              owner={currentListing?.payment_address.toString()}
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
