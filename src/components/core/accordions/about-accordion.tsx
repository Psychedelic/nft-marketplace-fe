import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as Accordion from '@radix-ui/react-accordion';
import { LinkButton } from '../buttons';
import {
  AccordionContentMetaData,
  Buttons,
} from '../../mock-data/accordion-data';
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
import collection from '../../../assets/accordions/collection.svg';
import creator from '../../../assets/accordions/creator.svg';
import owner from '../../../assets/accordions/owner.svg';

export type AboutAccordionProps = {
  owned: boolean;
};

export const AboutAccordion = ({ owned }: AboutAccordionProps) => {
  const { t } = useTranslation();
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

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
    <AccordionStyle
      type="single"
      defaultValue="item-1"
      collapsible
      width="medium"
    >
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
            <img src={info} alt="about-collection" />
            <p>
              {`${t(
                'translation:accordions.about.header.aboutCrowns',
              )}`}
            </p>
          </div>
          <img
            src={!isAccordionOpen ? arrowup : arrowdown}
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
          <MetaDataWrapper>
            {AccordionContentMetaData.map((data) => (
              <div>
                <p>{data.title}</p>
                <p>{data.value}</p>
              </div>
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
          </MetaDataWrapper>
        </AccordionContent>
      </Accordion.Item>
    </AccordionStyle>
  );
};
