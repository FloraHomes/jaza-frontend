import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  /** `dark` = default logo on light backgrounds; `light` = white logo on dark backgrounds */
  variant?: "light" | "dark";
  className?: string;
  priority?: boolean;
}

export default function Logo({
  variant = "dark",
  className = "",
  priority = false,
}: LogoProps) {
  const src = variant === "light" ? "/logo-white.png" : "/logo2.png";

  return (
    <Link
      href="/"
      className={`inline-flex shrink-0 items-center ${className}`}
      aria-label="Jazã & Sakeenah home"
    >
      <Image
        src={src}
        alt="Jazã & Sakeenah"
        width={220}
        height={56}
        priority={priority}
        className="h-9 w-auto sm:h-10"
      />
    </Link>
  );
}
