import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Icon } from '../icons';
import {
  CarouselContainer,
  CarouselArrow,
  CarouselWrapper,
  CarouselInnerWrapper,
  CarouselItem,
  CarouselName,
  CarouselDescription,
  CarouselRarity,
} from './styles';

const CarouselSlider = ({ item }: any) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = Math.ceil(item.traitList.length / 3) - 1;

  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ref.current != null) {
      ref.current.style.transition = 'all 0.2s ease-in-out';
      ref.current.style.transform = `translateX(-${currentSlide}00%)`;
    }
  }, [currentSlide]);

  const nextSlide = () => {
    if (currentSlide >= totalSlides) return;
    else setCurrentSlide(currentSlide + 1);
  };

  const previousSlide = () => {
    if (currentSlide === 0) return;
    else setCurrentSlide(currentSlide - 1);
  };

  return (
    <>
      <CarouselContainer>
        <CarouselArrow
          direction="left"
          onClick={() => previousSlide()}
        >
          <Icon icon="chevronLeft" size="lg" />
        </CarouselArrow>
        <CarouselWrapper>
          <CarouselInnerWrapper ref={ref}>
            {item.traitList.map((trait: any) => (
              <>
                <CarouselItem>
                  <CarouselName>{trait.name}</CarouselName>
                  <CarouselDescription>
                    {trait.description}
                  </CarouselDescription>
                  <CarouselRarity>{trait.rarity}</CarouselRarity>
                </CarouselItem>
              </>
            ))}
          </CarouselInnerWrapper>
        </CarouselWrapper>
        <CarouselArrow direction="right" onClick={() => nextSlide()}>
          <Icon icon="chevronRight" size="lg" />
        </CarouselArrow>
      </CarouselContainer>
    </>
  );
};

export default CarouselSlider;
