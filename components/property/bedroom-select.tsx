// @ts-nocheck

'use client';
import * as React from "react"
import { useActions, useUIState } from 'ai/rsc';
import type { AI } from '../../vercel-ai-rsc/app/action';
import { useEffect } from "react";
interface BedroomSelectProps {
  bedrooms: string[];
}


export function BedroomSelect({ bedrooms }: BedroomSelectProps) {
  const [, setMessages] = useUIState<typeof AI>();
  const { submitUserMessage } = useActions<typeof AI>();
  const [selected, setSelected] = React.useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected(event.target.value);
  };

  const query = `The selected number of bedrooms is ${selected}, now call the show_property_listing function to display the properties.`;
  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement> | React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await submitUserMessage(query);
    setMessages(currentMessages => [...currentMessages, response]);
  }

  return (
    <form>
      <div className="flex items-center space-x-2">
        <select
          className="border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-blue-500"
          value={selected}
          onChange={handleChange}
        >
          <option value="">Select Bedrooms</option>
          {bedrooms.map((option, index) => (
            <option key={index} value={option}>{option}</option>
          ))}
        </select>
        <button
          type="submit"
          onClick={handleSubmit}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition duration-200"
          disabled={!selected}
        >
          Submit
        </button>
      </div>
    </form>
  );
}
