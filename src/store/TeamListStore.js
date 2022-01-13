import { action, makeObservable, observable } from "mobx"
import { baseUrl, tokenKey } from "../utils/const"

class TeamListStore {
  teamList = []
  competionName = ""

  constructor() {
    makeObservable(this, {
      teamList: observable,
      competionName: observable,
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
    .then(data => {
      this.competionName = data.competition.name
      this.teamList = data.teams})
  }
}

export default new TeamListStore()
