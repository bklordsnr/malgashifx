import Image from "next/image";
import { RxAvatar } from "react-icons/rx";

interface AvatarProps {
  src?: string | null | undefined;
}

const Avatar: React.FC<AvatarProps> = ({ src }) => {
  if (src) {
    return (
      <Image
        src={src}
        alt="avatar"
        className="rounded-full"
        height={30}
        width={30}
      />
    );
  }
  return <RxAvatar size={30} />;
};

export default Avatar;
