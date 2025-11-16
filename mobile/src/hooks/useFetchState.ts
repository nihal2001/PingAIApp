import React from 'react';

type FetchState = { loading: boolean; error: string | null };

export function useFetchState(initial: FetchState = { loading: true, error: null }) {
  return React.useState<FetchState>(initial);
}

export type { FetchState };
