import request from 'superagent'

const rootUrl = '/api/v1'

export function getLobby(): Promise<string[]> {
  return request.get(rootUrl + '/lobby').then((res) => {
    return res.body
  })
}
