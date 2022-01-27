import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as Accordion from '@radix-ui/react-accordion';
import { LinkButton } from '../buttons';
import {
  AccordionStyle,
  AccordionTrigger,
  AccordionContent,
  Description,
  MetaDataWrapper,
  ButtonWrapper,
  AccordionHead,
  AccordionHeadContent,
} from './styles';
import info from '../../../assets/accordions/info.svg';
import arrowdown from '../../../assets/accordions/arrow-down.svg';
import arrowup from '../../../assets/accordions/arrow-up.svg';
import discord from '../../../assets/buttons/discord.svg';
import twitter from '../../../assets/buttons/twitter.svg';
import back from '../../../assets/buttons/back.svg';
import collection from '../../../assets/accordions/collection.svg';
import creator from '../../../assets/accordions/creator.svg';
import owner from '../../../assets/accordions/owner.svg';

export const AboutAccordion = () => {
  const { t } = useTranslation();
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  return (
    <AccordionStyle
      type="single"
      defaultValue="item-1"
      collapsible
      width="medium"
    >
      <AccordionHead>
        <AccordionHeadContent>
          <img src={collection} alt="collection" />
          <div>
            <span>
              {`${t('translation:accordions.about.header.collection')}`}
            </span>
            <p>{`${t('translation:accordions.about.header.capCrowns')}`}</p>
          </div>
        </AccordionHeadContent>
        <AccordionHeadContent>
          <img src={creator} alt="creator" />
          <div>
            <span>{`${t('translation:accordions.about.header.creator')}`}</span>
            <p>{`${t('translation:accordions.about.header.psychedelic')}`}</p>
          </div>
        </AccordionHeadContent>
        <AccordionHeadContent>
          <img src={owner} alt="owner" />
          <div>
            <span>{`${t('translation:accordions.about.header.owner')}`}</span>
            <p>{`${t('translation:accordions.about.header.you')}`}</p>
          </div>
        </AccordionHeadContent>
      </AccordionHead>
      <Accordion.Item value="item-1">
        <AccordionTrigger
          padding="medium"
          backgroundColor={isAccordionOpen ? 'notopen' : 'open'}
          borderTop="borderSet"
          onClick={() => setIsAccordionOpen(!isAccordionOpen)}
        >
          <div>
            <img src={info} alt="about-collection" />
            <p>{`${t('translation:accordions.about.header.aboutCrowns')}`}</p>
          </div>
          <img src={!isAccordionOpen ? arrowup : arrowdown} alt="arrow-down" />
        </AccordionTrigger>
        <AccordionContent padding="medium">
          <Description>
            {`${t('translation:accordions.about.header.description')}`}
          </Description>
          <MetaDataWrapper>
            <div>
              <p>{`${t('translation:accordions.about.header.canisterId')}`}</p>
              <p>t7wg4-tyaaa-aaaak-qacaa-cai</p>
            </div>
            <div>
              <p>
                {`${t('translation:accordions.about.header.tokenStandard')}`}
              </p>
              <p>DIP20</p>
            </div>
            <div>
              <p>{`${t('translation:accordions.about.header.tokenId')}`}</p>
              <p>2713</p>
            </div>
            <div>
              <p>{`${t('translation:accordions.about.header.blockchain')}`}</p>
              <p>
                {`${t('translation:accordions.about.header.internetComputer')}`}
              </p>
            </div>
            <ButtonWrapper>
              <LinkButton outline="light" text="bold">
                {t('translation:buttons.links.website')}
              </LinkButton>
              &nbsp;
              <LinkButton outline="light" text="bold" padding="narrow">
                <img
                  src={discord}
                  alt={t('translation:buttons.links.discord')}
                />
              </LinkButton>
              &nbsp;
              <LinkButton outline="light" text="bold" padding="narrow">
                <img
                  src={twitter}
                  alt={t('translation:buttons.links.twitter')}
                />
              </LinkButton>
              &nbsp;
              <LinkButton outline="light" text="bold" padding="narrow">
                <img src={back} alt={t('translation:buttons.links.back')} />
              </LinkButton>
            </ButtonWrapper>
          </MetaDataWrapper>
        </AccordionContent>
      </Accordion.Item>
    </AccordionStyle>
  );
};
