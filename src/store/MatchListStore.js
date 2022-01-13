import { action, makeObservable, observable } from "mobx"
import { baseUrl, tokenKey } from "../utils/const"

class MatchListStore {
  matchList = []
  name = ""

  constructor() {
    makeObservable(this, {
      matchList: observable,
      name: observable,
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
    .then(data => {
      this.matchList = data.matches
      if(type === 'competitions') {
        this.name = data.competition.name
      } else {
        this.name = ''
      }
    })
  }
}

export default new MatchListStore()
