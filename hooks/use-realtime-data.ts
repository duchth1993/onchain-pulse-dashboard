'use client';

import { useState, useEffect, useCallback } from 'react';

export interface RealtimeUpdate {
  timestamp: number;
  type: 'transaction' | 'user' | 'volume' | 'metric';
  app?: string;
  value: number;
  change?: number;
}

export function useRealtimeData(
  initialData: any,
  updateInterval: number = 3000
) {
  const [data, setData] = useState(initialData);
  const [isLive, setIsLive] = useState(true);
  const [updates, setUpdates] = useState<RealtimeUpdate[]>([]);

  const simulateUpdate = useCallback((newData: any) => {
    setData(newData);
    
    // Track update for activity feed
    const update: RealtimeUpdate = {
      timestamp: Date.now(),
      type: 'metric',
      value: Math.random() * 100,
    };
    
    setUpdates(prev => [update, ...prev].slice(0, 20));
  }, []);

  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      simulateUpdate({
        ...data,
        lastUpdate: Date.now(),
      });
    }, updateInterval);

    return () => clearInterval(interval);
  }, [isLive, updateInterval, data, simulateUpdate]);

  const toggleLive = useCallback(() => {
    setIsLive(prev => !prev);
  }, []);

  return {
    data,
    isLive,
    toggleLive,
    updates,
    lastUpdate: data.lastUpdate,
  };
}

export function useWebSocketSimulation(
  onMessage: (data: any) => void,
  reconnectInterval: number = 5000
) {
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate WebSocket connection
    setConnected(true);

    // Simulate messages
    const messageInterval = setInterval(() => {
      const mockMessage = {
        type: 'update',
        data: {
          txCount: Math.floor(Math.random() * 10000),
          newUsers: Math.floor(Math.random() * 500),
          volume: Math.floor(Math.random() * 500000),
          timestamp: Date.now(),
        },
      };
      
      onMessage(mockMessage.data);
    }, 3000);

    // Simulate occasional disconnect/reconnect (for testing)
    const connectionCheck = setInterval(() => {
      if (Math.random() > 0.95) {
        setConnected(false);
        setError('Connection lost');
        
        setTimeout(() => {
          setConnected(true);
          setError(null);
        }, 2000);
      }
    }, 15000);

    return () => {
      clearInterval(messageInterval);
      clearInterval(connectionCheck);
    };
  }, [onMessage]);

  return {
    connected,
    error,
  };
}

export interface CacheOptions {
  ttl?: number; // Time to live in milliseconds
  key: string;
}

export function useCachedData<T>(
  fetcher: () => Promise<T>,
  options: CacheOptions
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const cachedData = localStorage?.getItem(options.key);
    const cachedTime = localStorage?.getItem(`${options.key}:time`);

    if (
      cachedData &&
      cachedTime &&
      Date.now() - Number(cachedTime) < (options.ttl || 60000)
    ) {
      setData(JSON.parse(cachedData));
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await fetcher();
        setData(result);
        localStorage?.setItem(options.key, JSON.stringify(result));
        localStorage?.setItem(`${options.key}:time`, String(Date.now()));
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fetcher, options]);

  return { data, loading, error };
}

export function usePolling<T>(
  fetcher: () => Promise<T>,
  interval: number = 5000
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    const poll = async () => {
      setLoading(true);
      try {
        const result = await fetcher();
        if (isMounted) {
          setData(result);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error('Unknown error'));
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    // Initial fetch
    poll();

    // Set up interval
    const pollInterval = setInterval(poll, interval);

    return () => {
      isMounted = false;
      clearInterval(pollInterval);
    };
  }, [fetcher, interval]);

  return { data, loading, error };
}
