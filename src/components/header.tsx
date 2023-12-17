import { Button } from '@/components/ui/button';
import { RefreshCwIcon } from 'lucide-react';
import { AuthenticatorCreateDialog } from './dialogs/authenticator-create-dialog';
import { cn } from '@/lib/utils';

export function Header({ refetch, isFetching }: Props) {
  return (
    <header className='flex items-center justify-between mb-4'>
      <h1 className='font-extrabold text-2xl'>Authenticator</h1>
      <div className='flex gap-x-4'>
        <AuthenticatorCreateDialog refetch={refetch} />
        <Button className='md:pl-3' onClick={refetch} title='Refresh'>
          <RefreshCwIcon
            className={cn('w-6 h-6 mr-0 md:mr-2', isFetching && 'animate-spin')}
          />
          <span className='hidden md:inline'>Refresh</span>
        </Button>
      </div>
    </header>
  );
}

export interface Props {
  refetch: () => void;
  isFetching: boolean;
}
