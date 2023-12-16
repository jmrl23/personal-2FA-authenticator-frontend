import { Button } from '@/components/ui/button';
import { PlusIcon, RefreshCwIcon } from 'lucide-react';

export function Header({ refresh }: Props) {
  return (
    <header className='flex items-center justify-between mb-4'>
      <h1 className='font-extrabold text-2xl'>Authenticator</h1>
      <div className='flex gap-x-4'>
        <Button className='md:pl-3'>
          <PlusIcon className='w-6 h-6 mr-0 md:mr-2' />
          <span className='hidden md:inline'>Create</span>
        </Button>
        <Button className='md:pl-3' onClick={refresh}>
          <RefreshCwIcon className='w-6 h-6 mr-0 md:mr-2' />
          <span className='hidden md:inline'>Refresh</span>
        </Button>
      </div>
    </header>
  );
}

export interface Props {
  refresh: () => void;
}
