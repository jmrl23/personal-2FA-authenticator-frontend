import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Pen } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { authenticatorUpdateDialogSchema } from '@/lib/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { request } from '@/lib/utils';
import { useContext, useState } from 'react';
import { AuthorizationContext } from '@/contexts/authorization';

export function AuthenticatorUpdateDialog(props: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const form = useForm<z.infer<typeof authenticatorUpdateDialogSchema>>({
    resolver: zodResolver(authenticatorUpdateDialogSchema),
    defaultValues: {
      name: props.authenticator.name,
      key: void 0,
    },
  });
  const authorization = useContext(AuthorizationContext);
  const onSubmit = async (
    formData: z.infer<typeof authenticatorUpdateDialogSchema>,
  ) => {
    if (!formData.key) {
      formData.key = void 0;
    }

    const data = await request(
      fetch('/api/update', {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${authorization}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: props.authenticator.id,
          ...formData,
        }),
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
        <Button className='lg:pl-3' title='Update'>
          <Pen className='w-4 h-4 lg:mr-2' />
          <span className='hidden lg:inline'>Update</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update authenticator</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              name='name'
              control={form.control}
              render={({ field, formState }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage>{formState.errors.name?.message}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              name='key'
              control={form.control}
              render={({ field, formState }) => (
                <FormItem>
                  <FormLabel>Key</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage>{formState.errors.key?.message}</FormMessage>
                </FormItem>
              )}
            />
            <DialogFooter className='mt-4 gap-4'>
              <DialogClose asChild>
                <Button variant={'secondary'}>Cancel</Button>
              </DialogClose>
              <Button type='submit'>Confirm</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export interface Props {
  authenticator: Authenticator;
  refetch: () => void;
}
