import React, { useState, useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import copyToClipboard from 'copy-to-clipboard';
import { useTranslation } from 'react-i18next';
import * as Accordion from '@radix-ui/react-accordion';
import { useAppDispatch, usePlugStore } from '../../../store';
import { LinkButton } from '../buttons';
import { SkeletonBox } from '../skeleton';
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
  LogoWrapper,
  MetaDataDetails,
  MetaDataTitle,
  MetaDataDescription,
} from './styles';
import plugIcon from '../../../assets/plug-circle.svg';

import { isNFTOwner } from '../../../integrations/kyasshu/utils';
import { Icon } from '../../icons';
import { notificationActions } from '../../../store/features/notifications';
import config from '../../../config/env';
import { showUserAddress } from '../../../utils/addresses';
import { AppLog } from '../../../utils/log';

export type AboutAccordionProps = {
  owner?: string;
};

export const AboutAccordion = ({ owner }: AboutAccordionProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const [isAccordionOpen, setIsAccordionOpen] = useState(true);

  const [userAddress, setUserAddress] = useState<string>('');
  const [loadingOwnerAddress, setLoadingOwnerAddress] =
    useState<boolean>(true);

  const { isConnected, principalId: plugPrincipal } = usePlugStore();

  const isOwner = isNFTOwner({
    isConnected,
    owner,
    principalId: plugPrincipal,
  });

  const AccordionHeadContentData = [
    {
      subheading: 'CAP Crowns',
      heading: 'Collection',
      // TODO: replace with collection url after integration is done
      image:
        'https://storageapi2.fleek.co/fleek-team-bucket/logos/crowns-ooo.png',
    },
    {
      subheading: 'Psychedelic',
      heading: 'Creator',
      // TODO: replace with creator url after integration is done
      image: 'https://psychedelic.ooo/images/11-2.svg',
    },
  ];

  const AccordionContentMetaData = useMemo(
    () => [
      {
        title: t('translation:accordions.about.header.canisterId'),
        value: config.nftCollectionId,
      },
      {
        title: t('translation:accordions.about.header.tokenStandard'),
        value: t('translation:accordions.about.details.dip721'),
      },
      {
        title: t('translation:accordions.about.header.tokenId'),
        value: id,
      },
      {
        title: t('translation:accordions.about.header.blockchain'),
        value: t(
          'translation:accordions.about.details.internetComputer',
        ),
      },
    ],
    [config, id],
  );

  useEffect(() => {
    (async () => {
      if (isOwner) {
        setUserAddress(t('translation:accordions.about.header.you'));
        setLoadingOwnerAddress(false);

        return;
      }

      setLoadingOwnerAddress(true);

      try {
        const formattedOwnerAddress = await showUserAddress(owner);

        setUserAddress(formattedOwnerAddress);
        setLoadingOwnerAddress(false);
      } catch (error) {
        setLoadingOwnerAddress(false);
        AppLog.error(error);
      }
    })();
  }, [owner]);

  return (
    <AccordionStyle type="single" collapsible width="medium">
      <AccordionHead>
        {AccordionHeadContentData.map((data) => (
          <AccordionHeadContent key={data.heading}>
            <LogoWrapper
              style={{ backgroundImage: `url(${data.image})` }}
            />
            <MetaDataDetails>
              <MetaDataTitle>{data.heading}</MetaDataTitle>
              <MetaDataDescription>
                {data.subheading}
              </MetaDataDescription>
            </MetaDataDetails>
          </AccordionHeadContent>
        ))}
        <AccordionHeadContent>
          <LogoWrapper
            style={{ backgroundImage: `url(${plugIcon})` }}
          />
          <MetaDataDetails>
            <MetaDataTitle>
              {t('translation:accordions.about.header.owner')}
            </MetaDataTitle>
            <MetaDataDescription>
              {loadingOwnerAddress ? (
                <SkeletonBox style={{ width: '80px' }} />
              ) : (
                userAddress
              )}
            </MetaDataDescription>
          </MetaDataDetails>
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
            <Icon icon="info" paddingRight />
            <p>
              {`${t(
                'translation:accordions.about.header.aboutCrowns',
              )}`}
            </p>
          </div>
          <Icon icon="chevron-up" rotate={isAccordionOpen} />
        </AccordionTrigger>
        <AccordionContent
          padding="medium"
          backgroundColor={isAccordionOpen ? 'notopen' : 'open'}
        >
          <Description>
            {`${t('translation:common.crownsDescription')}`}
          </Description>
          <div>
            {AccordionContentMetaData.map((data) => (
              <Flex key={data.title}>
                <Subtext>{data.title}</Subtext>
                <Subtext>{data.value}</Subtext>
              </Flex>
            ))}
            <ButtonWrapper>
              <LinkButton type="textBtn" url="https://crowns.ooo/">
                {t('translation:buttons.links.website')}
              </LinkButton>

              <LinkButton url="https://discord.gg/yVEcEzmrgm">
                <Icon icon="discord" />
              </LinkButton>

              <LinkButton url="https://twitter.com/cap_ois">
                <Icon icon="twitter" />
              </LinkButton>

              <LinkButton
                handleClick={() => {
                  copyToClipboard(window.location.href);
                  dispatch(
                    notificationActions.setSuccessMessage(
                      `${t(
                        'translation:successMessages.copyToClipboard',
                      )}`,
                    ),
                  );
                }}
              >
                <Icon icon="share" />
              </LinkButton>
            </ButtonWrapper>
          </div>
        </AccordionContent>
      </Accordion.Item>
    </AccordionStyle>
  );
};
