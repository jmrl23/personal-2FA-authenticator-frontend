import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import { request } from '@/lib/utils';
import { useContext, useState } from 'react';
import { AuthorizationContext } from '@/contexts/authorization';

export function AuthenticatorDeleteDialog(props: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const authorization = useContext(AuthorizationContext);
  const handleConfirm = async () => {
    const data = await request(
      fetch(`/api/delete/${props.authenticator.id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${authorization}`,
        },
      }),
    );

    if (data instanceof Error) {
      alert(data.message);

      return;
    }

    setIsOpen(false);
    props.refetch();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className='pl-3' variant={'destructive'}>
          <Trash className='w-4 h-4 mr-2' />
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete authenticator</DialogTitle>
          <DialogDescription>
            Are you sure you want to remove{' '}
            <span className='font-bold underline'>
              {props.authenticator.name}
            </span>
            ?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className='mt-4'>
          <DialogClose asChild>
            <Button variant={'secondary'}>Cancel</Button>
          </DialogClose>
          <Button variant={'destructive'} type='submit' onClick={handleConfirm}>
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export interface Props {
  authenticator: Authenticator;
  refetch: () => void;
}
