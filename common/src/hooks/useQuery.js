import { useRouter } from 'next/router';
import { useMemo } from 'react';

export const useQuery = () => {
  const { query } = useRouter();
  return useMemo(() => query, [query]);
};
