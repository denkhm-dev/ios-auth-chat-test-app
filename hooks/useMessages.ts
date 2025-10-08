import { useCallback, useEffect, useState } from 'react';

import { ChatState, Message } from '../types/chat';

import { supabase } from '../utils/supabase';

export const useMessages = () => {
  const [state, setState] = useState<ChatState>({
    messages: [],
    loading: true,
    error: null,
  });

  const fetchMessages = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));

      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) {
        throw error;
      }

      setState(prev => ({
        ...prev,
        messages: data || [],
        loading: false,
      }));
    } catch (error) {
      console.error('Error fetching messages:', error);
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Error fetching messages',
      }));
    }
  }, []);

  const refreshMessages = useCallback(() => {
    fetchMessages();
  }, [fetchMessages]);

  useEffect(() => {
    fetchMessages();

    const channel = supabase
      .channel('messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
        },
        (payload) => {
          const newMessage = payload.new as Message;
          setState(prev => ({
            ...prev,
            messages: [...prev.messages, newMessage],
          }));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchMessages]);

  return {
    messages: state.messages,
    loading: state.loading,
    error: state.error,
    refreshMessages,
  };
};
