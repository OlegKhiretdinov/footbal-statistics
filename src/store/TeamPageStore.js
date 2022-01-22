import { action, makeObservable, observable } from "mobx"
import { baseUrl, tokenKey } from "../utils/const"

class TeamPageStore {
  teamData = {}
  isLoading = false

  constructor() {
    makeObservable(this, {
      teamData: observable,
      isLoading: observable,
      setTeamData: action,
    })
  }

  setTeamData(id) {
    this.isLoading = true
    fetch(`${baseUrl}/teams/${id}`, {
      headers: {
        "X-Auth-Token": tokenKey,
      },
    })
      .then((response) => response.json())
      .then(
        action((data) => {
          this.teamData = data
          this.isLoading = false
        })
      )
  }
}

export default new TeamPageStore()
