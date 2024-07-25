// @ts-nocheck

'use client';
import * as React from "react";
import { useActions, useUIState } from 'ai/rsc';
import type { AI } from '../../vercel-ai-rsc/app/action';
import * as Slider from '@radix-ui/react-slider';
import './styles.css';

interface RangeSliderProps {
  min: number;
  max: number;
  step: number;
  defaultValue: number[];
  onValueChange: (value: number[]) => void;
  formatValue: (value: number) => string;
}

const RangeSlider: React.FC<RangeSliderProps> = ({ min, max, step, defaultValue, onValueChange, formatValue }) => {
  const [value, setValue] = React.useState(defaultValue);

  const handleValueChange = (newValue: number[]) => {
    setValue(newValue);
    onValueChange(newValue);
  };

  return (
    <div className="slider-container">
      {/* <div className="slider-values">
        <span>{formatValue(min)}</span>
        <span>{formatValue(max)}</span>
      </div> */}
      <Slider.Root
        className="SliderRoot"
        value={value}
        min={min}
        max={max}
        step={step}
        onValueChange={handleValueChange}
      >
        <Slider.Track className="SliderTrack">
          <Slider.Range className="SliderRange" />
          {Array.from({ length: (max - min) / step + 1 }, (_, index) => (
            <div
              key={index}
              className="SliderMark"
              style={{ left: `${(index / ((max - min) / step)) * 100}%` }}
            />
          ))}
        </Slider.Track>
        <Slider.Thumb className="SliderThumb">
          <div className="SliderThumbValue">{formatValue(value[0])}</div>
        </Slider.Thumb>
        <Slider.Thumb className="SliderThumb">
          <div className="SliderThumbValue">{formatValue(value[1])}</div>
        </Slider.Thumb>
      </Slider.Root>
    </div>
  );
};

export const PriceRangeSlider: React.FC<{ onChange: (value: number[]) => void }> = ({ onChange }) => {
  const handleValueChange = (value: number[]) => {
    onChange(value);
  };

  return (
    <RangeSlider
      min={0}
      max={500000000}
      step={50000000}
      defaultValue={[0, 200000000]}
      onValueChange={handleValueChange}
      formatValue={value => `₹${(value / 10000000).toFixed(2)} Cr`}
    />
  );
};

export const BedroomsRangeSlider: React.FC<{ onChange: (value: number[]) => void }> = ({ onChange }) => {
  const handleValueChange = (value: number[]) => {
    onChange(value);
  };

  return (
    <RangeSlider
      min={1}
      max={5}
      step={1}
      defaultValue={[1, 3]}
      onValueChange={handleValueChange}
      formatValue={value => `${value} bedrooms`}
    />
  );
};

export function PropertyFilter() {
  const [, setMessages] = useUIState<typeof AI>();
  const { submitUserMessage } = useActions<typeof AI>();
  const [priceRange, setPriceRange] = React.useState([0, 200000000]);
  const [bedroomsRange, setBedroomsRange] = React.useState([1, 3]);
  
  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement> | React.FormEvent<HTMLFormElement>) => {
    const query = `The selected price range is ₹${priceRange[0]} - ₹${priceRange[1]} Cr and the selected number of bedrooms is ${bedroomsRange[0]} - ${bedroomsRange[1]}, now call the show_property_listing function to display the properties.`;
    event.preventDefault();
    const response = await submitUserMessage(query);
    setMessages(currentMessages => [...currentMessages, response]);
  }

  const handleSkip = async (event: React.MouseEvent<HTMLButtonElement> | React.FormEvent<HTMLFormElement>) => {
    const query = `The selected price range is 0 and the selected number of bedrooms is 0, now call the show_property_listing function to display the properties.`;
    event.preventDefault();
    const response = await submitUserMessage(query);
    setMessages(currentMessages => [...currentMessages, response]);
  }

  return (
    <form className="rounded-lg shadow-lg border md:px-8 p-4">
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">
          Price Range:
        </label>
        <PriceRangeSlider onChange={setPriceRange} />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">
          Number of Bedrooms:
        </label>
        <BedroomsRangeSlider onChange={setBedroomsRange} />
      </div>

      <div className="flex justify-end gap-2">
        <button
          onClick={handleSkip}
          className="bg-white border-2 hover:bg-gray-200 px-4 py-2 rounded-md transition duration-200"
          >
          Skip
        </button>
        <button
          onClick={handleSubmit}
          className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-md transition duration-200"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
