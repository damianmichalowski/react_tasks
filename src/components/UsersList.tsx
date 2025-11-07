import { useEffect, useState } from 'react'
import type { User } from '../utils/client'
import { getUsers, updateUser } from '../utils/client'

const UsersListSimple = () => {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const [perPage] = useState(10) // Fixed items per page
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [editForm, setEditForm] = useState({ name: '', email: '', status: '' })

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const data = await getUsers(query, page, perPage)
      setUsers(data)
      setLoading(false)
    }

    const handler = setTimeout(fetchData, 300)
    return () => clearTimeout(handler)
  }, [query, page, perPage])

  const handleNextPage = () => setPage((prev) => prev + 1)
  const handlePrevPage = () => setPage((prev) => Math.max(prev - 1, 1))
  const handleEditClick = (user: User) => {
    setEditingUser(user)
    setEditForm({ name: user.name, email: user.email, status: user.status })
  }
  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEditForm((prev) => ({ ...prev, [name]: value }))
  }
  const handleEditSubmit = async () => {
    if (!editingUser) return

    try {
      const updatedUser = await updateUser(editingUser.id, editForm)
      setUsers((prev) =>
        prev.map((user) => (user.id === updatedUser.id ? updatedUser : user))
      )
      setEditingUser(null)
    } catch (error) {
      console.error('Failed to update user:', error)
    }
  }

  return (
    <div>
      <div className="mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setPage(1)
          }}
          placeholder="Szukaj po imieniu"
          className="w-full p-2 border rounded-md"
        />
      </div>

      {loading ? (
        <p>Ładowanie użytkowników...</p>
      ) : users.length === 0 ? (
        <p>Brak użytkowników do wyświetlenia.</p>
      ) : (
        <>
          {editingUser && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
              <div className="bg-zinc-800 p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
                <h3 className="text-xl font-bold mb-4 text-white">
                  Edytuj użytkownika: {editingUser.name}
                </h3>
                <input
                  type="text"
                  name="name"
                  value={editForm.name}
                  onChange={handleEditChange}
                  placeholder="Imię"
                  className="w-full p-2 border border-gray-600 bg-zinc-700 text-white rounded-md mb-3 placeholder-gray-400"
                />
                <input
                  type="email"
                  name="email"
                  value={editForm.email}
                  onChange={handleEditChange}
                  placeholder="Email"
                  className="w-full p-2 border border-gray-600 bg-zinc-700 text-white rounded-md mb-3 placeholder-gray-400"
                />
                <input
                  type="text"
                  name="status"
                  value={editForm.status}
                  onChange={handleEditChange}
                  placeholder="Status"
                  className="w-full p-2 border border-gray-600 bg-zinc-700 text-white rounded-md mb-4 placeholder-gray-400"
                />
                <div className="flex justify-end gap-2">
                  <button onClick={() => setEditingUser(null)}>Anuluj</button>
                  <button onClick={handleEditSubmit}>Zapisz</button>
                </div>
              </div>
            </div>
          )}
          <ul className="space-y-3">
            {users.map((user) => (
              <li
                key={user.id}
                className="p-3 border rounded-md grid grid-cols-[2fr_3fr_1fr_1fr] items-center gap-4"
              >
                <p className="font-medium truncate text-left">{user.name}</p>
                <p className="text-sm text-gray-300 truncate text-left">
                  {user.email}
                </p>
                <p className="text-sm text-gray-300 truncate text-left">
                  {user.status}
                </p>
                <button
                  onClick={() => handleEditClick(user)}
                  className="bg-yellow-500 text-white p-2 rounded-md"
                >
                  Edytuj
                </button>
              </li>
            ))}
          </ul>
          <div className="flex justify-between mt-4">
            <button
              onClick={handlePrevPage}
              disabled={page === 1}
              className="disabled:opacity-50"
            >
              Poprzednia
            </button>
            <span>Strona {page}</span>
            <button
              onClick={handleNextPage}
              disabled={users.length < perPage} // Disable if fewer records than perPage
              className="disabled:opacity-50"
            >
              Następna
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default UsersListSimple
