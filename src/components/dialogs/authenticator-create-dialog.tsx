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
import { PlusIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { authenticatorCreateDialogSchema } from '@/lib/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { request } from '@/lib/utils';
import { useContext, useState } from 'react';
import { AuthorizationContext } from '@/contexts/authorization';

export function AuthenticatorCreateDialog(props: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const form = useForm<z.infer<typeof authenticatorCreateDialogSchema>>({
    resolver: zodResolver(authenticatorCreateDialogSchema),
    defaultValues: {
      name: '',
      key: '',
    },
  });
  const authorization = useContext(AuthorizationContext);
  const onSubmit = async (
    formData: z.infer<typeof authenticatorCreateDialogSchema>,
  ) => {
    const data = await request(
      fetch('/api/create', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authorization}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      }),
    );

    if (data instanceof Error) {
      alert(data.message);

      return;
    }

    setIsOpen(false);
    form.setValue('name', '');
    form.setValue('key', '');
    props.refetch();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className='md:pl-3'>
          <PlusIcon className='w-6 h-6 mr-0 md:mr-2' />
          <span className='hidden md:inline'>Create</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create authenticator</DialogTitle>
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
            <DialogFooter className='mt-4'>
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
  refetch: () => void;
}
