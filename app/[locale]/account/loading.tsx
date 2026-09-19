const LoadingSkeleton = ({ className = "" }: { className?: string }) => (
  <div
    className={`animate-pulse rounded-md bg-muted ${className}`}
    aria-hidden="true"
  />
);

const AccountLoading = () => {
  return (
    <div className="w-full py-8 sm:py-10 lg:py-12">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 space-y-3">
          <LoadingSkeleton className="h-4 w-20" />
          <LoadingSkeleton className="h-8 w-56 sm:h-9 sm:w-72" />
        </div>

        {/* Balance Cards */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="rounded-2xl border-custom2 bg-background p-5"
            >
              <div className="flex items-center justify-between">
                <LoadingSkeleton className="h-4 w-24" />
                <LoadingSkeleton className="h-9 w-9 rounded-xl" />
              </div>

              <LoadingSkeleton className="mt-4 h-8 w-28" />
            </div>
          ))}
        </section>

        {/* Withdrawal Section */}
        <section className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[1.4fr_0.6fr]">
          {/* Withdrawal Form */}
          <div className="rounded-2xl border-custom2 bg-background p-5 sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="w-full space-y-2">
                <LoadingSkeleton className="h-6 w-36" />
                <LoadingSkeleton className="h-4 w-full max-w-lg" />
                <LoadingSkeleton className="h-4 w-3/4 max-w-md" />
              </div>

              <LoadingSkeleton className="hidden h-11 w-11 shrink-0 rounded-xl sm:block" />
            </div>

            <div className="mt-6 space-y-5">
              {/* Amount */}
              <div>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <LoadingSkeleton className="h-4 w-16" />
                  <LoadingSkeleton className="h-3 w-28" />
                </div>

                <LoadingSkeleton className="h-12 w-full rounded-xl" />

                <div className="mt-2 flex gap-4">
                  <LoadingSkeleton className="h-3 w-20" />
                  <LoadingSkeleton className="h-3 w-20" />
                </div>
              </div>

              {/* Phone Number */}
              <div>
                <LoadingSkeleton className="mb-2 h-4 w-28" />
                <LoadingSkeleton className="h-12 w-full rounded-xl" />
                <LoadingSkeleton className="mt-2 h-3 w-48" />
              </div>

              {/* Button */}
              <LoadingSkeleton className="h-12 w-full rounded-xl" />
            </div>
          </div>

          {/* Withdrawal Information */}
          <div className="rounded-2xl border-custom2 bg-background p-5 sm:p-6">
            <div className="flex items-center gap-3">
              <LoadingSkeleton className="h-10 w-10 rounded-xl" />

              <div className="space-y-1.5">
                <LoadingSkeleton className="h-4 w-32" />
                <LoadingSkeleton className="h-3 w-40" />
              </div>
            </div>

            <div className="mt-6 divide-y divide-border">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between gap-4 py-4"
                >
                  <LoadingSkeleton className="h-4 w-28" />
                  <LoadingSkeleton className="h-4 w-24" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Account Overview */}
        <section className="mt-8 rounded-2xl border-custom2 bg-background p-5 sm:p-6">
          <div className="space-y-2">
            <LoadingSkeleton className="h-6 w-40" />
            <LoadingSkeleton className="h-4 w-full max-w-lg" />
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="rounded-xl border-custom bg-muted/20 p-4"
              >
                <LoadingSkeleton className="h-3 w-24" />
                <LoadingSkeleton className="mt-3 h-5 w-32" />
              </div>
            ))}
          </div>
        </section>

        {/* Withdrawal History */}
        <section className="mt-8">
          <div className="rounded-2xl border-custom2 bg-background p-5 sm:p-6">
            <div className="space-y-2">
              <LoadingSkeleton className="h-6 w-44" />
              <LoadingSkeleton className="h-4 w-full max-w-md" />
            </div>

            <div className="mt-6 space-y-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between gap-4 rounded-xl border border-border p-4"
                >
                  <div className="space-y-2">
                    <LoadingSkeleton className="h-4 w-24" />
                    <LoadingSkeleton className="h-3 w-32" />
                  </div>

                  <LoadingSkeleton className="h-5 w-20" />
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AccountLoading;
