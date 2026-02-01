import React from 'react'
import { Link } from 'react-router-dom'

export default function Breadcrumb({ items }) {
  // items: [{ label, to? }]
  return (
    <nav className="flex items-center gap-1.5 text-sm" aria-label="Breadcrumb">
      {items.map((item, idx) => (
        <React.Fragment key={idx}>
          {idx > 0 && (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-slate-600">
              <polyline points="9,18 15,12 9,6" />
            </svg>
          )}
          {item.to && idx < items.length - 1 ? (
            <Link to={item.to} className="text-slate-500 hover:text-green-400 transition-colors duration-200">
              {item.label}
            </Link>
          ) : (
            <span className={`${idx === items.length - 1 ? 'text-slate-300' : 'text-slate-500'} truncate max-w-48`}>
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  )
}