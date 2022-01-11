import { action, makeObservable, observable } from "mobx"

const url = 'https://api.football-data.org/v2'
const token = '5a3212400041421fada0041ca9629a7e'

class MatchListStore {
  matchList = []

  constructor() {
    makeObservable(this, {
      matchList: observable,
      setMatchList: action,
    })
  }

  setMatchList(id, type) {
    fetch(`${url}/${type}/${id}/matches/`, {
      headers: {
        'X-Auth-Token': token,
      }
    })
    .then(responce => responce.json())
    .then(data => this.matchList = data.matches)
  }
}

export default new MatchListStore()
