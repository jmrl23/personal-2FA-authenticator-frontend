import { Check, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { useState } from 'react';
import { AuthenticatorUpdateDialog } from '@/components/dialogs/authenticator-update-dialog';
import { AuthenticatorDeleteDialog } from '@/components/dialogs/authenticator-delete-dialog';

export function AuthenticatorCard({ authenticator, refetch }: Props) {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  return (
    <Card className='mb-4' key={authenticator.id}>
      <CardHeader>
        <CardTitle>
          <h1 className='text-base font-bold mb-2'>{authenticator.name}</h1>
        </CardTitle>
        <CardDescription>
          <div className='flex justify-end gap-x-4'>
            <Button
              className='pl-3'
              variant={'secondary'}
              onClick={() => {
                if (isCopied) return;
                navigator.clipboard.writeText(authenticator.code);
                setIsCopied(true);
                setTimeout(() => {
                  setIsCopied(false);
                }, 2000);
              }}
            >
              {isCopied ? (
                <Check className='w-4 h-4 mr-2 text-green-500' />
              ) : (
                <Copy className='w-4 h-4 mr-2' />
              )}
              <span>{authenticator.code}</span>
            </Button>
            <AuthenticatorUpdateDialog
              authenticator={authenticator}
              refetch={refetch}
            />
            <AuthenticatorDeleteDialog
              authenticator={authenticator}
              refetch={refetch}
            />
          </div>
        </CardDescription>
      </CardHeader>
    </Card>
  );
}

export interface Props {
  authenticator: Authenticator;
  refetch: () => void;
}
