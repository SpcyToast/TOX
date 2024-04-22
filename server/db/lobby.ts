import db from './connection.ts'

export async function getLobby() {
  return db('lobby').select()
}
