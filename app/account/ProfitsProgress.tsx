
import { SafeUser } from "@/types";
import Progressbar from "./Progressbar";
import Time from "./Time";

interface AccountProps {
  currentUser: SafeUser | null;
}


const ProfitsProgress: React.FC<AccountProps> = ({ currentUser}) => {
  return (
    <div className="flex flex-col gap-1 justify-center max-w-[300px] ">
      <Progressbar percentage={currentUser?.Rate} circleWidth={200} />
      <Time />
    </div>
  );
};

export default ProfitsProgress;
