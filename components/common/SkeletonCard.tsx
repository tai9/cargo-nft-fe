export const SkeletonCard = () => {
  return (
    <div className="border border-slate-600 shadow rounded-md p-4 max-w-xl w-full mx-auto">
      <div className="animate-pulse flex space-x-4">
        <div className="flex-1 space-y-6 py-1">
          <div className="h-72 bg-slate-700 rounded"></div>
          {/* <div className="rounded-full bg-slate-700 h-10 w-10"></div> */}
          <div className="h-2 bg-slate-700 rounded"></div>
          <div className="h-2 bg-slate-700 rounded"></div>

          <div className="h-2 bg-slate-700 rounded"></div>
        </div>
      </div>
    </div>
  )
}
