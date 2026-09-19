import Image from "next/image";
import { RxAvatar } from "react-icons/rx";

interface AvatarProps {
  src?: string | null;
}

const Avatar = ({ src }: AvatarProps) => {
  return (
    <div className="avatar-shell">
      <div className="relative h-8 w-8 overflow-hidden rounded-full bg-muted">
        {src ? (
          <Image
            src={src}
            alt="Profile avatar"
            fill
            sizes="32px"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <RxAvatar
              size={22}
              className="text-muted-foreground"
              aria-hidden="true"
            />
          </div>
        )}
      </div>

      <span className="avatar-status" aria-hidden="true" />
    </div>
  );
};

export default Avatar;