import { useState } from 'react';
import { AuthorizationContext } from '@/contexts/authorization';
import { AuthorizationDialog } from '@/components/dialogs/authorization-dialog';
import Content from './Content';

export default function App() {
  const [secret, setSecret] = useState<string>('');

  return (
    <AuthorizationContext.Provider value={secret}>
      {!secret && <AuthorizationDialog setAuthorization={setSecret} />}
      {secret && <Content />}
    </AuthorizationContext.Provider>
  );
}
