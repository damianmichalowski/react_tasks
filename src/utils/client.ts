// get users
// http://gorest.co.in/public/v2/users

// update user
// PUT|PATCH /public/v2/users/7583015

const BASE = 'https://gorest.co.in/public/v2'

export type User = {
  id: number
  name: string
  email: string
  status: string
}

const authHeaders = () => {
  const token = import.meta.env.VITE_GOREST_TOKEN as string
  return { Authorization: `Bearer ${token}` }
}

export async function getUsers(query: string, page = 1, per_page = 100) {
  try {
    const params = new URLSearchParams()
    if (query.trim()) params.set('name', query.trim())
    params.set('page', String(Math.max(1, page)))
    params.set('per_page', String(Math.min(100, per_page)))

    const res = await fetch(`${BASE}/users?${params.toString()}`, {
      headers: {
        ...authHeaders(),
      },
    })
    if (!res.ok) throw new Error('Get users failed')
    return await res.json()
  } catch (error) {
    console.log('getUsers failed', error)
    return []
  }
}

export async function updateUser(
  id: number,
  payload: Partial<Pick<User, 'name' | 'email' | 'status'>>
): Promise<User> {
  try {
    const res = await fetch(`${BASE}/users/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...authHeaders(),
      },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      throw new Error(`Update user failed: ${res.status}`)
    }

    return (await res.json()) as User
  } catch (error) {
    console.error('updateUser failed:', error)
    throw error
  }
}
