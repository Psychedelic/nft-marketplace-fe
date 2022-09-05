import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActionButton, Tooltip } from '../core';
import NewCategoryField from '../core/input-field-set/new-category-field';
import Popover from '../core/popover/popover';
import {
  TabsRoot,
  TabsTrigger,
  TabsList,
  TabsContent,
  TabContentHeader,
  TabContentHeaderItem,
  TabContentContainer,
  TabContentWrapper,
  ActionIconsContainer,
  IconWrapper,
  StyledIcon,
  TabsInnerContentWrapper,
  BottomGradient,
  DeveloperModeText,
} from './styles';
import {
  ModalButtonsList,
  ModalButtonWrapper,
  Divider,
} from '../modals/styles';

type EditTraitsTabProps = {
  setShowOverlay: (value: boolean) => void;
  handleModalOpen: (value: boolean) => void;
};

export const EditTraitsTab = ({
  setShowOverlay,
  handleModalOpen,
}: EditTraitsTabProps) => {
  const { t } = useTranslation();
  const [disabledItems, setDisabledItems] = useState(
    Array(0).fill(0),
  );
  const [traitType, setTraitType] = useState('alphabetical');
  const [addAlphabeticalNewCategory, setAddAlphabeticalNewCategory] =
    useState<boolean>(false);
  const [addNumericalNewCategory, setAddNumericalNewCategory] =
    useState<boolean>(false);

  const handleDisabled = (id: any) => {
    const clickedItem = alphabetical.find((item) => item.id === id);
    if (!disabledItems.includes(clickedItem?.id)) {
      setDisabledItems([...disabledItems, clickedItem?.id]);
    } else {
      const filterDisabledItems = disabledItems.filter((item) => {
        return item !== id;
      });
      setDisabledItems(filterDisabledItems);
    }
  };

  return (
    <TabsRoot defaultValue="items" value={traitType} type="trait">
      <TabsList aria-label="Edit Trait" type="trait">
        <TabsTrigger
          value="alphabetical"
          status={
            traitType === 'alphabetical'
              ? 'activeTrait'
              : 'inactiveTrait'
          }
          onClick={() => {
            setTraitType('alphabetical');
          }}
          type="trait"
          style={{
            paddingLeft: '8px',
          }}
        >
          Alphabetical
        </TabsTrigger>
        <TabsTrigger
          value="numerical"
          status={
            traitType === 'numerical'
              ? 'activeTrait'
              : 'inactiveTrait'
          }
          onClick={() => {
            setTraitType('numerical');
          }}
          type="trait"
        >
          Numerical
        </TabsTrigger>
      </TabsList>
      <TabsContent value="alphabetical">
        <TabsInnerContentWrapper>
          <TabContentHeader>
            <TabContentHeaderItem width="md" padding="leftSm">
              {t('translation:tabs.action')}
            </TabContentHeaderItem>
            <TabContentHeaderItem width="lg">
              {t('translation:tabs.category')}
            </TabContentHeaderItem>
            <TabContentHeaderItem width="lg">
              {t('translation:tabs.variants')}
            </TabContentHeaderItem>
          </TabContentHeader>
          {alphabetical.map((item) => (
            <TabContentContainer
              disable={disabledItems.includes(item.id) && true}
              enable={!disabledItems.includes(item.id) && true}
            >
              <TabContentWrapper padding="rightSm" width="md">
                <ActionIconsContainer>
                  <Tooltip
                    type="traits"
                    children={
                      <IconWrapper delete={true}>
                        <StyledIcon icon="delete" />
                      </IconWrapper>
                    }
                    text={t('translation:tooltip.delete')}
                    width={200}
                  />
                  <Popover
                    trigger={
                      <Tooltip
                        type="traits"
                        children={
                          <IconWrapper code={true}>
                            <StyledIcon icon="code" />
                          </IconWrapper>
                        }
                        text={t('translation:tooltip.code')}
                        width={176}
                      />
                    }
                    text={
                      <DeveloperModeText>
                        &#123;
                        <br />
                        traitbackground: valueGradient R-Y,
                        traitbackground: valueGradient B-G,
                        traitbackground, valueGradient G-W
                        traitbackground: valueGradient B-R
                        <br />
                        &#125;
                      </DeveloperModeText>
                    }
                    setShowOverlay={setShowOverlay}
                  />
                  <Tooltip
                    type="traits"
                    children={
                      <IconWrapper
                        onClick={() => handleDisabled(item.id)}
                      >
                        <StyledIcon
                          icon={
                            disabledItems.includes(item.id)
                              ? 'enable'
                              : 'disable'
                          }
                        />
                      </IconWrapper>
                    }
                    text={t('translation:tooltip.disable')}
                    width={220}
                  />
                </ActionIconsContainer>
              </TabContentWrapper>
              <TabContentWrapper width="lg" border="sides">
                {item.category}
              </TabContentWrapper>
              <TabContentWrapper width="lg">
                {item.variants}
              </TabContentWrapper>
            </TabContentContainer>
          ))}
          {addAlphabeticalNewCategory && <NewCategoryField />}
          <BottomGradient />
        </TabsInnerContentWrapper>
        <Divider />
        <ModalButtonsList justifyContent="flexEnd" noMargin="top">
          <ModalButtonWrapper type="trait">
            <ActionButton
              type="outline"
              size="small"
              onClick={() => {
                setAddAlphabeticalNewCategory(true);
              }}
            >
              {t('translation:modals.buttons.addCategory')}
            </ActionButton>
          </ModalButtonWrapper>
          <ModalButtonWrapper type="trait">
            <ActionButton
              type="primary"
              size="small"
              onClick={() => handleModalOpen(false)}
            >
              {t('translation:modals.buttons.confirm')}
            </ActionButton>
          </ModalButtonWrapper>
        </ModalButtonsList>
      </TabsContent>
      <TabsContent value="numerical">
        <TabsInnerContentWrapper>
          <TabContentHeader>
            <TabContentHeaderItem width="md" padding="leftSm">
              {t('translation:tabs.action')}
            </TabContentHeaderItem>
            <TabContentHeaderItem width="lg">
              {t('translation:tabs.category')}
            </TabContentHeaderItem>
            <TabContentHeaderItem width="lg">
              {t('translation:tabs.variants')}
            </TabContentHeaderItem>
          </TabContentHeader>
          {numerical.map((item) => (
            <TabContentContainer
              disable={disabledItems.includes(item.id) && true}
              enable={!disabledItems.includes(item.id) && true}
            >
              <TabContentWrapper padding="rightSm" width="md">
                <ActionIconsContainer>
                  <Tooltip
                    type="traits"
                    children={
                      <IconWrapper delete={true}>
                        <StyledIcon icon="delete" />
                      </IconWrapper>
                    }
                    text={t('translation:tooltip.delete')}
                    width={200}
                  />
                  <Popover
                    trigger={
                      <Tooltip
                        type="traits"
                        children={
                          <IconWrapper code={true}>
                            <StyledIcon icon="code" />
                          </IconWrapper>
                        }
                        text={t('translation:tooltip.code')}
                        width={176}
                      />
                    }
                    text={
                      <DeveloperModeText>
                        &#123;
                        <br />
                        traitbackground: valueGradient R-Y,
                        traitbackground: valueGradient B-G,
                        traitbackground, valueGradient G-W
                        traitbackground: valueGradient B-R
                        <br />
                        &#125;
                      </DeveloperModeText>
                    }
                    setShowOverlay={setShowOverlay}
                  />
                  <Tooltip
                    type="traits"
                    children={
                      <IconWrapper
                        onClick={() => handleDisabled(item.id)}
                      >
                        <StyledIcon
                          icon={
                            disabledItems.includes(item.id)
                              ? 'enable'
                              : 'disable'
                          }
                        />
                      </IconWrapper>
                    }
                    text={t('translation:tooltip.disable')}
                    width={220}
                  />
                </ActionIconsContainer>
              </TabContentWrapper>
              <TabContentWrapper width="lg" border="sides">
                {item.category}
              </TabContentWrapper>
              <TabContentWrapper width="lg" flex={true}>
                <TabContentWrapper>1</TabContentWrapper>
                <TabContentWrapper border="sides" greyedOut={true}>
                  {t('translation:tabs.through')}
                </TabContentWrapper>
                <TabContentWrapper>100</TabContentWrapper>
              </TabContentWrapper>
            </TabContentContainer>
          ))}
          {addNumericalNewCategory && <NewCategoryField />}
          <BottomGradient />
        </TabsInnerContentWrapper>
        <Divider />
        <ModalButtonsList justifyContent="flexEnd" noMargin="top">
          <ModalButtonWrapper type="trait">
            <ActionButton
              type="outline"
              size="small"
              onClick={() => {
                setAddNumericalNewCategory(true);
              }}
            >
              {t('translation:modals.buttons.addCategory')}
            </ActionButton>
          </ModalButtonWrapper>
          <ModalButtonWrapper type="trait">
            <ActionButton
              type="primary"
              size="small"
              onClick={() => handleModalOpen(false)}
            >
              {t('translation:modals.buttons.confirm')}
            </ActionButton>
          </ModalButtonWrapper>
        </ModalButtonsList>
      </TabsContent>
    </TabsRoot>
  );
};

const alphabetical = [
  {
    category: 'Head Item',
    variants: 'Bandana; Halo; Empty',
    id: '1',
  },
  {
    category: 'Head Item',
    variants: 'Bandana; Halo; Empty',
    id: '2',
  },
  {
    category: 'Head Item',
    variants: 'Bandana; Halo; Empty',
    id: '3',
  },
  {
    category: 'Head Item',
    variants: 'Bandana; Halo; Empty',
    id: '4',
  },
];

const numerical = [
  {
    category: 'Head Item',
    variants: 'Bandana; Halo; Empty',
    id: '1',
  },
  {
    category: 'Head Item',
    variants: 'Bandana; Halo; Empty',
    id: '2',
  },
];
