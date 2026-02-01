import React from 'react'

export default function StarRating({ rating, maxStars = 5, size = 16 }) {
  const stars = []
  for (let i = 1; i <= maxStars; i++) {
    const diff = rating - (i - 1)
    let type = 'empty'
    if (diff >= 1) type = 'full'
    else if (diff >= 0.3) type = 'half'
    stars.push(type)
  }

  return (
    <div className="flex items-center gap-0.5">
      {stars.map((type, idx) => (
        <svg key={idx} width={size} height={size} viewBox="0 0 24 24" fill="none">
          <defs>
            <linearGradient id={`star-grad-${idx}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#facc15" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
            <clipPath id={`star-half-${idx}`}>
              <rect x="0" y="0" width="12" height="24" />
            </clipPath>
          </defs>
          {/* Empty star outline */}
          <path
            d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
            fill={type === 'full' ? 'url(#star-grad-' + idx + ')' : '#334155'}
            stroke={type === 'full' ? '#f59e0b' : '#475569'}
            strokeWidth="1"
          />
          {/* Half star overlay */}
          {type === 'half' && (
            <path
              d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
              fill="url(#star-grad-0)"
              stroke="#f59e0b"
              strokeWidth="1"
              clipPath={`url(#star-half-${idx})`}
            />
          )}
        </svg>
      ))}
    </div>
  )
}