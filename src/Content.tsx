import { useAuthenticators } from '@/hooks/useAuthenticators';
import { Header } from '@/components/header';
import { Authenticators } from '@/components/authenticators';
import { cn } from './lib/utils';

export default function Content() {
  const { data: authenticators, refetch } = useAuthenticators();

  return (
    <div className='p-4'>
      <div
        className={cn(
          'p-4 border rounded-lg max-w-screen-sm mx-auto',
          authenticators.length > 0 && 'pb-0',
        )}
      >
        <Header refresh={refetch} />
        <hr />
        <Authenticators authenticators={authenticators} />
      </div>
    </div>
  );
}
