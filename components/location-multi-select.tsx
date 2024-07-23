// @ts-nocheck

'use client';
import * as React from "react"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { X, Check } from "lucide-react"

import { useActions, useUIState } from 'ai/rsc';
import type { AI } from '../../vercel-ai-rsc/app/action';

interface MultiSelectProps {
  locations: string[];
}

export function LocationMultiSelect({ locations }: MultiSelectProps) {
  const [, setMessages] = useUIState<typeof AI>();
  const { submitUserMessage } = useActions<typeof AI>();
  const [selected, setSelected] = React.useState<string[]>([]);
  const [inputValue, setInputValue] = React.useState('');
  const [customLocation, setCustomLocation] = React.useState('');

  const filteredLocations = locations.filter(
    location => !selected.includes(location) && location.toLowerCase().includes(inputValue.toLowerCase())
  );

  const query = `The selected location(s) are ${selected.toString()}, now call the show_price_range_selection function to ask for price range.`;
  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement> | React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await submitUserMessage(query);
    setMessages(currentMessages => [...currentMessages, response]);
  }

  const handleSelect = (location: string) => {
    setSelected(prev => [...prev, location]);
    setInputValue('');
  };

  const handleRemove = (location: string) => {
    setSelected(prev => prev.filter(item => item !== location));
  };

  const handleAddCustomLocation = () => {
    if (customLocation && !selected.includes(customLocation)) {
      setSelected(prev => [...prev, customLocation]);
      setCustomLocation('');
    }
  };

  return (
    <form>
      <div className="space-y-2">
        <div className="flex flex-wrap gap-2">
          {selected.map(location => (
            <Badge key={location} variant="secondary">
              {location}
              <button
                type="button"
                className="ml-1 rounded-full outline-none"
                onClick={() => handleRemove(location)}
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
        <div className="flex gap-2 items-center">
          <Input
            type="text"
            placeholder="Search locations..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          {/* <Input
            type="text"
            placeholder="Add location..."
            value={customLocation}
            onChange={(e) => setCustomLocation(e.target.value)}
          />
          <div 
            onClick={handleAddCustomLocation}
            className="cursor-pointer border border-gray-100 rounded-lg p-[8px] transition duration-200 hover:border-black active:border-gray-200"
          >
            <Check strokeWidth={1} size={20} />
          </div> */}
        </div>
        <div className="mt-2 max-h-60 overflow-auto">
          {filteredLocations.map(location => (
            <div
              key={location}
              className="cursor-pointer p-2 hover:bg-gray-200"
              onClick={() => handleSelect(location)}
            >
              {location}
            </div>
          ))}
        </div>
      </div>
      <input type="hidden" name="selected_locations" value={selected.join(',')} />
      <Button onClick={handleSubmit} className="mt-4">Submit</Button>
    </form>
  );
}
