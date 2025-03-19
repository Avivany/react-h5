import { useEffect } from 'react';

import { useRouter } from '@/hooks';

export default function NotFount() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push('/');
    }, 1000);
  }, [router]);

  return (
    <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
      404
    </div>
  );
}