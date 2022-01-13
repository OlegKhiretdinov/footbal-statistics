import { makeObservable, observable } from "mobx"
import { baseUrl, tokenKey } from "../utils/const"

class TeamPageStore {
  teamData = {}

  constructor() {
    makeObservable(this, {
      teamData: observable,
    })
  }

  setTeamData(id) {
    fetch(`${baseUrl}/teams/${id}`, {
      headers: {
        'X-Auth-Token': tokenKey,
      }
    })
    .then(response => response.json())
    .then(data => this.teamData = data)
  }
}

export default new TeamPageStore()
