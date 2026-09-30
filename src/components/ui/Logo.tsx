import Image from 'next/image';
import { COMPANY_NAME } from '@/lib/constants';

interface LogoProps {
  className?: string;
  priority?: boolean;
}

// Source images are 800x263; the dark variant has the black artwork recoloured white.
const WIDTH = 800;
const HEIGHT = 263;

export default function Logo({ className = 'h-10 w-auto', priority = false }: LogoProps) {
  return (
    <>
      <Image
        src="/images/logo/hm-logo-light.png"
        alt={COMPANY_NAME}
        width={WIDTH}
        height={HEIGHT}
        priority={priority}
        className={`${className} dark:hidden`}
      />
      <Image
        src="/images/logo/hm-logo-dark.png"
        alt={COMPANY_NAME}
        width={WIDTH}
        height={HEIGHT}
        priority={priority}
        className={`${className} hidden dark:block`}
      />
    </>
  );
}
