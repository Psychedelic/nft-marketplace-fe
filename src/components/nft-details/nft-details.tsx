import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
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

import { useNFTSStore } from '../../store';
import { NFTMetadata } from '../../declarations/nft';

export const NftDetails = () => {
  const { loadedNFTS } = useNFTSStore();
  const { id } = useParams();

  const nftDetails: NFTMetadata | undefined = useMemo(
    () => loadedNFTS.find((nft) => nft.id === id),
    [loadedNFTS, id],
  );

  return (
    <Container>
      <NftActionBar />
      {nftDetails ? (
        <Wrapper>
          <PreviewContainer>
            {nftDetails.preview ? (
              <img src={nftDetails.preview} alt="nft-card" />
            ) : (
              <Video
                loop
                autoPlay
                muted
                preload="metadata"
                controls={false}
                poster="/assets/random-crown.png"
              >
                <source src={nftDetails.location} type="video/mp4" />
              </Video>
            )}
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
            <NFTMetaData id={nftDetails.id} />
            <OfferAccordion />
            <AboutAccordion owned />
          </DetailsContainer>
        </Wrapper>
      ) : (
        <Wrapper centered>Loading...</Wrapper>
      )}
    </Container>
  );
};
