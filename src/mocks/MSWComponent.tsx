import { useEffect, useState } from 'react';

export const MSWComponent = ({
  children,
  enableMSW,
}: {
  children: React.ReactNode;
  enableMSW: boolean;
}) => {
  const [mswReady, setMswReady] = useState(false);
  useEffect(() => {
    const init = async () => {
      if (enableMSW) {
        const initMsw = await import('./index').then((res) => res.initMsw);
        await initMsw();
      } else {
        const stopMsw = await import('./index').then((res) => res.stopMsw);
        await stopMsw();
      }
      setMswReady(true);
    };

    if (!mswReady) {
      init();
    }
  }, [mswReady, enableMSW]);

  return <>{children}</>;
};
