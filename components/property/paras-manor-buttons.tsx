// @ts-nocheck
"use client"

import React from 'react';
import { ImageIcon, Camera, Photos, Video, Play } from 'lucide-react';
import { useActions, useUIState } from 'ai/rsc';
import type { AI } from '../../vercel-ai-rsc/app/action';
import { Button } from '../ui/button';

export const ParasManorVideoButton = () => {
  const [, setMessages] = useUIState<typeof AI>();
  const { submitUserMessage } = useActions<typeof AI>();
  
  const handleSubmit = async (event: React.MouseEvent) => {
    const query = `Show paras manor videos`;
    event.preventDefault();
    const response = await submitUserMessage(query);
    setMessages(currentMessages => [...currentMessages, response]);
  }

  return (
    <Button 
      onClick={handleSubmit} 
      variant="outline"
      className="w-full"
    >
      <Video className="mr-2 h-4 w-4" />
      Paras Manor Video Gallery
    </Button>
  );
};

export const ParasManorImageGalleryButton = () => {
  const [, setMessages] = useUIState<typeof AI>();
  const { submitUserMessage } = useActions<typeof AI>();
  
  const handleSubmit = async (event: React.MouseEvent) => {
    const query = `Show paras manor image gallery or images`;
    event.preventDefault();
    const response = await submitUserMessage(query);
    setMessages(currentMessages => [...currentMessages, response]);
  }

  return (
    <Button 
      onClick={handleSubmit} 
      variant="outline"
      className="w-full"
    >
      <ImageIcon className="mr-2 h-4 w-4" />
      Paras Manor Image Gallery
    </Button>
  );
};
