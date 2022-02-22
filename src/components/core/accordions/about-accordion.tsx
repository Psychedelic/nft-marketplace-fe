import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import * as Accordion from '@radix-ui/react-accordion';
import { LinkButton } from '../buttons';
import { AccordionContentMetaData } from '../../mock-data/accordion-data';
import {
  AccordionStyle,
  AccordionTrigger,
  AccordionContent,
  Description,
  ButtonWrapper,
  AccordionHead,
  AccordionHeadContent,
  Flex,
  Subtext,
} from './styles';
import info from '../../../assets/accordions/info.svg';
import infoDark from '../../../assets/accordions/info-dark.svg';
import arrowdown from '../../../assets/accordions/arrow-down.svg';
import arrowdownDark from '../../../assets/accordions/arrow-down-dark.svg';
import arrowup from '../../../assets/accordions/arrow-up.svg';
import arrowupDark from '../../../assets/accordions/arrow-up-dark.svg';
import collection from '../../../assets/accordions/collection.svg';
import creator from '../../../assets/accordions/creator.svg';
import owner from '../../../assets/accordions/owner.svg';
import discord from '../../../assets/buttons/discord.svg';
import discordDark from '../../../assets/buttons/discord-dark.svg';
import twitter from '../../../assets/buttons/twitter.svg';
import twitterDark from '../../../assets/buttons/twitter-dark.svg';
import back from '../../../assets/buttons/back.svg';
import backDark from '../../../assets/buttons/back-dark.svg';

export type AboutAccordionProps = {
  owned: boolean;
};

export const AboutAccordion = ({ owned }: AboutAccordionProps) => {
  const { t } = useTranslation();
  const [isAccordionOpen, setIsAccordionOpen] = useState(true);
  const [theme, setTheme] = useState('lightTheme');

  useEffect(() => {
    const getTheme = localStorage.getItem('theme');
    if (getTheme) {
      setTheme(getTheme);
    }
  });

  const arrowdownTheme = theme === 'lightTheme' ? arrowdown : arrowdownDark;
  const arrowupTheme = theme === 'lightTheme' ? arrowup : arrowupDark;

  const Buttons = [
    {
      image: theme === 'lightTheme' ? discord : discordDark,
      alt: 'discord',
    },
    {
      image: theme === 'lightTheme' ? twitter : twitterDark,
      alt: 'twitter',
    },
    {
      image: theme === 'lightTheme' ? back : backDark,
      alt: 'back',
    },
  ];

  const AccordionHeadContentData = [
    {
      subheading: 'CAP Crowns',
      heading: 'Collection',
      image: collection,
    },
    {
      subheading: 'Psychedelic',
      heading: 'Creator',
      image: creator,
    },
    {
      subheading: owned ? 'You' : 'rgblt...whfy',
      heading: 'Owner',
      image: owner,
    },
  ];

  return (
    <AccordionStyle type="single" collapsible width="medium">
      <AccordionHead>
        {AccordionHeadContentData.map((data) => (
          <AccordionHeadContent>
            <img src={data.image} alt={data.heading} />
            <div>
              <span>{data.heading}</span>
              <p>{data.subheading}</p>
            </div>
          </AccordionHeadContent>
        ))}
      </AccordionHead>
      <Accordion.Item value="item-1">
        <AccordionTrigger
          padding="medium"
          backgroundColor={isAccordionOpen ? 'notopen' : 'open'}
          borderTop="borderSet"
          onClick={() => setIsAccordionOpen(!isAccordionOpen)}
        >
          <div>
            <img
              src={theme === 'lightTheme' ? info : infoDark}
              alt="about-collection"
            />
            <p>
              {`${t(
                'translation:accordions.about.header.aboutCrowns',
              )}`}
            </p>
          </div>
          <img
            src={!isAccordionOpen ? arrowupTheme : arrowdownTheme}
            alt="arrow-down"
          />
        </AccordionTrigger>
        <AccordionContent
          padding="medium"
          backgroundColor={isAccordionOpen ? 'notopen' : 'open'}
        >
          <Description>
            {`${t(
              'translation:accordions.about.header.description',
            )}`}
          </Description>
          <div>
            {AccordionContentMetaData.map((data) => (
              <Flex>
                <Subtext>{data.title}</Subtext>
                <Subtext>{data.value}</Subtext>
              </Flex>
            ))}
            <ButtonWrapper>
              <LinkButton type="textBtn">
                {t('translation:buttons.links.website')}
              </LinkButton>
              &nbsp;
              {Buttons.map((button) => (
                <>
                  <LinkButton>
                    <img src={button.image} alt={button.image} />
                  </LinkButton>
                  &nbsp;
                </>
              ))}
            </ButtonWrapper>
          </div>
        </AccordionContent>
      </Accordion.Item>
    </AccordionStyle>
  );
};
