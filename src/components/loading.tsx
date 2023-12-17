import { Card, CardContent } from '@/components/ui/card';

export function Loading() {
  return (
    <Card className='my-4'>
      <CardContent className='pt-4 pb-4'>Loading, please wait..</CardContent>
    </Card>
  );
}
