import { useTranslations } from "next-intl";
import { IoNotificationsOutline } from "react-icons/io5";
import { FaArrowRightLong } from "react-icons/fa6";

import { Link } from "@/i18n/navigation";

const NotificationsPage = () => {
  const t = useTranslations("Notifications");

  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-5 py-12">
      <div className="flex w-full max-w-md flex-col items-center text-center">
        <div className="relative flex h-20 w-20 items-center justify-center rounded-full border-custom2 bg-background">
          <IoNotificationsOutline size={38} className="text-primary" />

          <span
            className="absolute right-3 top-3 h-2.5 w-2.5 rounded-full bg-primary"
            aria-hidden="true"
          />
        </div>

        <span className="mt-6 text-xs font-semibold uppercase tracking-wider text-primary">
          {t("label")}
        </span>

        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
          {t("title")}
        </h1>

        <p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
          {t("description")}
        </p>

        <Link
          href="/account"
          className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary/80"
        >
          {t("accountLink")}
          <FaArrowRightLong size={16} />
        </Link>
      </div>
    </main>
  );
};

export default NotificationsPage;