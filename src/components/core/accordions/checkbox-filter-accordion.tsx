import React, { useState } from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import { AccordionStyle, AccordionTrigger, AccordionContent } from './styles';
import arrowdown from '../../../assets/arrowdown.svg';

export const CheckboxFilterAccordion = () => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  return (
    <AccordionStyle
      type="single"
      defaultValue="item-1"
      collapsible
      backgroundColor={isAccordionOpen ? 'notopen' : 'open'}
    >
      <Accordion.Item value="item-1">
        <AccordionTrigger onClick={() => setIsAccordionOpen(!isAccordionOpen)}>
          <p>
            Big Gem&nbsp;
            <span>(1)</span>
          </p>
          <img src={arrowdown} alt="arrow-down" />
        </AccordionTrigger>
        <AccordionContent>
          <form>
            <div>
              <label htmlFor="red">
                <input type="checkbox" id="red" name="red" value="Red" />
                Red
              </label>
              <span>1291 (12.9%)</span>
            </div>
            <div>
              <label htmlFor="Purple">
                <input
                  type="checkbox"
                  id="Purple"
                  name="Purple"
                  value="Purple"
                />
                Purple
              </label>
              <span>1291 (12.9%)</span>
            </div>
            <div>
              <label htmlFor="Yellow">
                <input
                  type="checkbox"
                  id="Yellow"
                  name="Yellow"
                  value="Yellow"
                />
                Yellow
              </label>
              <span>1291 (12.9%)</span>
            </div>
            <div>
              <label htmlFor="Orange">
                <input
                  type="checkbox"
                  id="Orange"
                  name="Orange"
                  value="Orange"
                />
                Orange
              </label>
              <span>1291 (12.9%)</span>
            </div>
            <div>
              <label htmlFor="Green">
                <input type="checkbox" id="Green" name="Green" value="Green" />
                Green
              </label>
              <span>1291 (12.9%)</span>
            </div>
          </form>
        </AccordionContent>
      </Accordion.Item>
    </AccordionStyle>
  );
};
