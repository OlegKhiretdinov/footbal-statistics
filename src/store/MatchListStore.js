import { action, makeObservable, observable } from "mobx"
import { baseUrl, tokenKey } from "../utils/const"

class MatchListStore {
  matchList = []
  name = ""
  isLoading = false

  constructor() {
    makeObservable(this, {
      matchList: observable,
      name: observable,
      isLoading: observable,
      setMatchList: action,
    })
  }

  setMatchList(id, type) {
    this.isLoading = true
    fetch(`${baseUrl}/${type}/${id}/matches/`, {
      headers: {
        'X-Auth-Token': tokenKey,
      }
    })
    .then(responce => responce.json())
    .then(action(data => {
      this.matchList = data.matches
      if(type === 'competitions') {
        this.name = data.competition.name
      } else {
        this.name = ''
      }
      this.isLoading = false
    }))
  }
}

export default new MatchListStore()
