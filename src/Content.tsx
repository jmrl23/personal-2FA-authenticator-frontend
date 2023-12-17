import { Header } from '@/components/header';
import { Loading } from '@/components/loading';
import { Authenticators } from '@/components/authenticators';
import { useAuthenticators } from '@/hooks/useAuthenticators';
import { cn } from '@/lib/utils';

export default function Content() {
  const {
    data: authenticators,
    refetch,
    isLoading,
    isFetching,
  } = useAuthenticators();

  return (
    <div className='p-4'>
      <div
        className={cn(
          'p-4 border rounded-lg max-w-screen-sm mx-auto',
          authenticators.length > 0 && 'pb-0',
        )}
      >
        <Header refetch={refetch} isFetching={isFetching} />
        <hr />
        {isLoading && <Loading />}
        {!isLoading && (
          <Authenticators authenticators={authenticators} refetch={refetch} />
        )}
      </div>
    </div>
  );
}
