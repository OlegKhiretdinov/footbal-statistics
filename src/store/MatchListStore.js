import { action, makeObservable, observable } from "mobx"
import { baseUrl, DATE_FROM, DATE_TO, tokenKey } from "../utils/const"

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

  setMatchList(id, type, dateParams) {
    let params = ""

    if (dateParams[DATE_FROM] && dateParams[DATE_TO]) {
      params += `dateFrom=${dateParams[DATE_FROM]}&dateTo=${dateParams[DATE_TO]}`
    }

    this.isLoading = true
    fetch(`${baseUrl}/${type}/${id}/matches/?${params}`, {
      headers: {
        "X-Auth-Token": tokenKey,
      },
    })
      .then((responce) => responce.json())
      .then(
        action((data) => {
          this.matchList = data.matches
          if (type === "competitions") {
            this.name = data.competition.name
          } else {
            this.name = ""
          }
          this.isLoading = false
        })
      )
  }
}

export default new MatchListStore()
