import { AuthorizationContext } from '@/contexts/authorization';
import { request } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';

export const useAuthenticators = function useAuthenticators() {
  const authorization = useContext(AuthorizationContext);
  const { data, isLoading, refetch } = useQuery<
    | {
        authenticators: Authenticator[];
      }
    | Error
  >({
    queryKey: ['authenticators', 'list'],
    queryFn: () =>
      request<{ authenticators: Authenticator[] }>(
        fetch(`${import.meta.env.VITE_BACKEND_URL}/read`, {
          headers: {
            Authorization: `Bearer ${authorization}`,
          },
        }),
      ),
  });

  const authenticators =
    data instanceof Error ? [] : data?.authenticators ?? [];

  return {
    data: authenticators,
    isLoading,
    refetch,
  };
};
