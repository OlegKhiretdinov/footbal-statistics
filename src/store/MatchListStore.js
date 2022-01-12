import { action, makeObservable, observable } from "mobx"
import { baseUrl, tokenKey } from "../utils/const"

class MatchListStore {
  matchList = []

  constructor() {
    makeObservable(this, {
      matchList: observable,
      setMatchList: action,
    })
  }

  setMatchList(id, type) {
    fetch(`${baseUrl}/${type}/${id}/matches/`, {
      headers: {
        'X-Auth-Token': tokenKey,
      }
    })
    .then(responce => responce.json())
    .then(data => this.matchList = data.matches)
  }
}

export default new MatchListStore()
