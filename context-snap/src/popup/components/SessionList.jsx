export default function SessionList({ sessions, onLoad, onDelete }) {
  if (sessions.length === 0) return null

  return (
    <div className="mt-3">
      <p className="text-xs font-semibold text-gray-600 mb-1">Saved Sessions</p>
      <div className="space-y-1 max-h-32 overflow-y-auto">
        {sessions.map((session) => (
          <div
            key={session.id}
            className="flex items-center justify-between bg-gray-50 
                       border border-gray-200 rounded-lg px-2 py-1"
          >
            <div>
              <p className="text-xs font-medium text-gray-700">{session.name}</p>
              <p className="text-xs text-gray-400">
                {session.messageCount} messages · {session.source}
              </p>
            </div>
            <div className="flex gap-1">
              <button
                onClick={() => onLoad(session)}
                className="text-xs text-indigo-600 hover:text-indigo-800"
              >
                Load
              </button>
              <button
                onClick={() => onDelete(session.id)}
                className="text-xs text-red-400 hover:text-red-600"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}