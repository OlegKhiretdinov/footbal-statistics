import { action, makeObservable, observable } from "mobx"
import { baseUrl, tokenKey } from "../utils/const"

class TeamListStore {
  teamList = []

  constructor() {
    makeObservable(this, {
      teamList: observable,
      setTeamList: action,
    })
  }

  setTeamList(id) {
    fetch(`${baseUrl}/competitions/${id}/teams`, {
      headers: {
        'X-Auth-Token': tokenKey,
      }
    })
    .then(response => response.json())
    .then(data => this.teamList = data.teams)
  }
}

export default new TeamListStore()
