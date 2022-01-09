import { action, makeObservable, observable } from "mobx"

const url = 'https://api.football-data.org/v2'
const token = '5a3212400041421fada0041ca9629a7e'

class TeamListStore {
  teamList = []

  constructor() {
    makeObservable(this, {
      teamList: observable,
      setTeamList: action,
    })
  }

  setTeamList(id) {
    console.log(id)
    fetch(`${url}/competitions/${id}/teams`, {
      headers: {
        'X-Auth-Token': token,
      }
    })
    .then(response => response.json())
    .then(data => this.teamList = data.teams)
    .then(data => console.log(data))
  }
}

export default new TeamListStore()
