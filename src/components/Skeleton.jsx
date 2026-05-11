const Skeleton = ({ className = '' }) => (
  <div className={`animate-pulse rounded-xl bg-surface-container ${className}`} />
)

export const StatCardSkeleton = () => (
  <div className="bg-surface-container-lowest rounded-xl shadow-ambient p-6 border border-primary/10">
    <Skeleton className="h-4 w-1/2 mb-3" />
    <Skeleton className="h-9 w-1/3" />
  </div>
)

export const CardSkeleton = () => (
  <div className="bg-surface-container-lowest rounded-xl shadow-ambient p-4 border border-primary/10">
    <Skeleton className="h-32 w-full mb-3" />
    <Skeleton className="h-5 w-3/4 mb-2" />
    <Skeleton className="h-4 w-1/2 mb-1" />
    <Skeleton className="h-4 w-1/3" />
  </div>
)

export const RowSkeleton = ({ count = 4 }) => (
  <>
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="flex items-center gap-4 p-4 border-b border-surface-variant last:border-0">
        <Skeleton className="w-12 h-12 rounded-lg flex-shrink-0" />
        <Skeleton className="h-4 flex-1" />
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-16" />
      </div>
    ))}
  </>
)

export default Skeleton
