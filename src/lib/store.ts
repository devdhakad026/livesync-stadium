"use client";

import { useState, useEffect } from 'react';
import { StadiumState } from './types';
import { initialMockState } from './mockData';

const CHANNEL_NAME = 'stadiumsync_channel';

export function useStadiumSync() {
  const [state, setState] = useState<StadiumState>(initialMockState);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // Check if we have state in localStorage first
    const savedState = localStorage.getItem('stadiumsync_state');
    if (savedState) {
      try {
        setState(JSON.parse(savedState));
      } catch (e) {
        console.error("Failed to parse state", e);
      }
    }

    const channel = new BroadcastChannel(CHANNEL_NAME);
    
    channel.onmessage = (event) => {
      if (event.data && event.data.type === 'STATE_UPDATE') {
        setState(event.data.state);
        localStorage.setItem('stadiumsync_state', JSON.stringify(event.data.state));
      }
    };

    return () => {
      channel.close();
    };
  }, []);

  const updateState = (newState: StadiumState) => {
    setState(newState);
    localStorage.setItem('stadiumsync_state', JSON.stringify(newState));
    
    const channel = new BroadcastChannel(CHANNEL_NAME);
    channel.postMessage({ type: 'STATE_UPDATE', state: newState });
    channel.close();
  };

  return { state, updateState, isClient };
}
