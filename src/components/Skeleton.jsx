import React from 'react'

const S = ({ className = '' }) => (
  <div className={`bg-slate-800 rounded skeleton-pulse ${className}`} />
)

export function EventCardSkeleton() {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
      <S className="h-48 w-full rounded-none" />
      <div className="p-5 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <S className="h-5 w-24" />
          <S className="h-5 w-16" />
        </div>
        <S className="h-6 w-full" />
        <S className="h-6 w-4/5" />
        <div className="flex items-center gap-2 mt-1">
          <S className="h-4 w-4 rounded-full" />
          <S className="h-4 w-32" />
        </div>
        <div className="flex items-center justify-between mt-2 pt-3 border-t border-slate-800">
          <S className="h-6 w-20" />
          <S className="h-9 w-28 rounded-lg" />
        </div>
      </div>
    </div>
  )
}

export function DetailSkeleton() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Image gallery placeholder */}
        <div className="lg:col-span-2 flex flex-col gap-3">
          <S className="h-80 w-full rounded-2xl" />
          <div className="flex gap-2">
            {[1,2,3,4].map(i => <S key={i} className="h-20 w-20 rounded-lg flex-1" />)}
          </div>
        </div>
        {/* Info placeholder */}
        <div className="flex flex-col gap-4">
          <S className="h-6 w-1/2" />
          <S className="h-8 w-full" />
          <S className="h-8 w-3/4" />
          <div className="flex flex-col gap-2 mt-2">
            <S className="h-4 w-full" />
            <S className="h-4 w-full" />
            <S className="h-4 w-4/5" />
          </div>
          <S className="h-10 w-full rounded-lg mt-4" />
        </div>
      </div>
    </div>
  )
}

export function ListingSkeleton({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {Array.from({ length: count }).map((_, i) => (
        <EventCardSkeleton key={i} />
      ))}
    </div>
  )
}