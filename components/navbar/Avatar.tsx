import React from "react";
import Image from "next/image";
import { RxAvatar } from "react-icons/rx";

interface AvatarProps {
  src?: string | null;
}

const Avatar: React.FC<AvatarProps> = ({ src }) => {
  if (src) {
    return (
      <div className="avatar-pulse border-2  rounded-full w-fit">
        <Image
          src={src}
          alt="avatar"
          className="rounded-full"
          height={30}
          width={30}
        />
      </div>
    );
  }

  return (
    <div className="border-2 avatar-pulse rounded-full w-fit p-1">
      <RxAvatar size={30} />
    </div>
  );
};

export default Avatar;