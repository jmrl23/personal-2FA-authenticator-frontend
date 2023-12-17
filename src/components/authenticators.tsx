import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { AuthenticatorCard } from './cards/authenticator-card';

export function Authenticators({ authenticators, refetch }: Props) {
  return (
    <div className='mt-4'>
      {authenticators.length < 1 && (
        <Card>
          <CardHeader>
            <CardTitle>No authenticators</CardTitle>
            <CardDescription>
              You haven't yet registered any authenticators as of the moment,
              kindly create one by creating the{' '}
              <span className='font-bold underline'>create</span> button.
            </CardDescription>
          </CardHeader>
        </Card>
      )}
      {authenticators.map((authenticator) => (
        <AuthenticatorCard authenticator={authenticator} refetch={refetch} />
      ))}
    </div>
  );
}

export interface Props {
  authenticators: Authenticator[];
  refetch: () => void;
}
