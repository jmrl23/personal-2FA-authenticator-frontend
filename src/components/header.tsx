import { Button } from '@/components/ui/button';
import { RefreshCwIcon } from 'lucide-react';
import { AuthenticatorCreateDialog } from './dialogs/authenticator-create-dialog';

export function Header({ refetch }: Props) {
  return (
    <header className='flex items-center justify-between mb-4'>
      <h1 className='font-extrabold text-2xl'>Authenticator</h1>
      <div className='flex gap-x-4'>
        <AuthenticatorCreateDialog refetch={refetch} />
        <Button className='md:pl-3' onClick={refetch}>
          <RefreshCwIcon className='w-6 h-6 mr-0 md:mr-2' />
          <span className='hidden md:inline'>Refresh</span>
        </Button>
      </div>
    </header>
  );
}

export interface Props {
  refetch: () => void;
}
