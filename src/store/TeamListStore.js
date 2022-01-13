import { action, makeObservable, observable } from "mobx"
import { baseUrl, tokenKey } from "../utils/const"

class TeamListStore {
  teamList = []
  competionName = ""
  isLoading = false

  constructor() {
    makeObservable(this, {
      teamList: observable,
      competionName: observable,
      isLoading: observable,
      setTeamList: action,
    })
  }

  setTeamList(id) {
    this.isLoading = true
    fetch(`${baseUrl}/competitions/${id}/teams`, {
      headers: {
        'X-Auth-Token': tokenKey,
      }
    })
    .then(response => response.json())
    .then(action(data => {
      this.competionName = data.competition.name
      this.teamList = data.teams
      this.isLoading = false
    }))
  }
}

export default new TeamListStore()
