import Link from "next/link";
import { IoNotificationsOutline } from "react-icons/io5";
import { FaArrowRightLong } from "react-icons/fa6";

const NotificationsPage = () => {
  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-5 py-12">
      <div className="flex w-full max-w-md flex-col items-center text-center">
        <div className="relative flex h-20 w-20 items-center justify-center rounded-full border-custom2 bg-background">
          <IoNotificationsOutline size={38} className="text-primary" />

          <span className="absolute right-3 top-3 h-2.5 w-2.5 rounded-full bg-primary" />
        </div>

        <span className="mt-6 text-xs font-semibold uppercase tracking-wider text-primary">
          Notifications
        </span>

        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
          You&apos;re all caught up
        </h1>

        <p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
          There are no new notifications right now. We&apos;ll let you know
          when something important needs your attention.
        </p>

        <Link
          href="/account"
          className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary/80"
        >
          Go to your account
          <FaArrowRightLong size={16} />
        </Link>
      </div>
    </main>
  );
};

export default NotificationsPage;