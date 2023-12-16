import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useContext } from 'react';
import { AuthorizationContext } from '@/contexts/authorization';
import { Form, FormField } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { authorizationDialogFormSchema } from '@/lib/schemas';

export function AuthorizationDialog(props: Props) {
  const secret = useContext(AuthorizationContext);
  const form = useForm<z.infer<typeof authorizationDialogFormSchema>>({
    resolver: zodResolver(authorizationDialogFormSchema),
    defaultValues: { code: '' },
  });
  const onSubmit = (
    formData: z.infer<typeof authorizationDialogFormSchema>,
  ) => {
    props.setAuthorization(formData.code);
  };

  return (
    <Dialog open={secret === ''}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Authorization</DialogTitle>
          <DialogDescription>
            Enter the authorization code to ensure you are authorized on using
            this application
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='grid gap-4 py-4'
          >
            <div className='grid grid-cols-12 items-center gap-4'>
              <FormField
                control={form.control}
                name='code'
                render={({ field }) => (
                  <>
                    <Label htmlFor='code' className='text-right col-span-2'>
                      Code
                    </Label>
                    <Input
                      type='password'
                      id='code'
                      className='col-span-10 lg:col-span-6'
                      {...field}
                    />
                    <Button className='col-span-12 lg:col-span-4' type='submit'>
                      Confirm
                    </Button>
                  </>
                )}
              />
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export interface Props {
  setAuthorization: React.Dispatch<React.SetStateAction<string>>;
}
