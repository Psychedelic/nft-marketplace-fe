import React, { useState, useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import copyToClipboard from 'copy-to-clipboard';
import { useTranslation } from 'react-i18next';
import * as Accordion from '@radix-ui/react-accordion';
import {
  useAppDispatch,
  usePlugStore,
  RootState,
} from '../../../store';
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
import { formatUserAddress } from '../../../utils/addresses';
import { AppLog } from '../../../utils/log';
import { Website } from '../../icons/custom/website';
import { useTheme } from '../../../hooks';

export type AboutAccordionProps = {
  owner?: string;
  isMobileScreen?: boolean;
  id?: string;
};

export const AboutAccordionHeader = ({
  owner,
  isMobileScreen,
  id,
}: AboutAccordionProps) => {
  const { t } = useTranslation();

  const [ownerAddress, setOwnerAddress] = useState<string>('');
  const [loadingOwnerAddress, setLoadingOwnerAddress] =
    useState<boolean>(true);

  useEffect(() => {
    (async () => {
      if (isOwner) {
        setOwnerAddress(t('translation:accordions.about.header.you'));
        setLoadingOwnerAddress(false);

        return;
      }

      setLoadingOwnerAddress(true);

      try {
        const formattedOwnerAddress = await formatUserAddress(owner);

        setOwnerAddress(formattedOwnerAddress);
        setLoadingOwnerAddress(false);
      } catch (error) {
        setLoadingOwnerAddress(false);
        AppLog.error(error);
      }
    })();
  }, [owner]);

  const { isConnected, principalId: plugPrincipal } = usePlugStore();

  const myNFTIds = useSelector(
    (state: RootState) => state.nfts.myNFTIds,
  );

  const isOwner = isNFTOwner({
    isConnected,
    myNFTIds,
    currentNFTId: id,
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

  return (
    <>
      {AccordionHeadContentData.map((data) => (
        <AccordionHeadContent
          key={data.heading}
          flexProperties="about"
        >
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
      <AccordionHeadContent
        key={t('translation:accordions.about.header.owner')}
        flexProperties="about"
      >
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
              ownerAddress
            )}
          </MetaDataDescription>
        </MetaDataDetails>
      </AccordionHeadContent>
    </>
  );
};

export const AboutAccordion = ({
  owner,
  isMobileScreen,
}: AboutAccordionProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { id, collectionId } = useParams();
  const [isAccordionOpen, setIsAccordionOpen] = useState(true);
  const [theme] = useTheme();

  const AccordionContentMetaData = useMemo(
    () => [
      {
        title: t('translation:accordions.about.header.canisterId'),
        value: collectionId,
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

  return (
    <AccordionStyle
      type="single"
      collapsible
      width={isMobileScreen ? 'small' : 'medium'}
    >
      {!isMobileScreen && (
        <AccordionHead>
          <AboutAccordionHeader
            owner={owner}
            isMobileScreen={isMobileScreen}
            id={id}
          />
        </AccordionHead>
      )}
      <Accordion.Item value="item-1">
        <AccordionTrigger
          padding={isMobileScreen ? 'small' : 'medium'}
          backgroundColor={isAccordionOpen ? 'notopen' : 'open'}
          borderTop={isMobileScreen ? 'full' : 'borderSet'}
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
          padding={isMobileScreen ? 'small' : 'medium'}
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
              {isMobileScreen ? (
                <LinkButton url="https://crowns.ooo/">
                  <Icon
                    icon="website"
                    extraIconProps={{ dark: theme === 'darkTheme' }}
                  />
                </LinkButton>
              ) : (
                <LinkButton type="textBtn" url="https://crowns.ooo/">
                  {t('translation:buttons.links.website')}
                </LinkButton>
              )}
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
