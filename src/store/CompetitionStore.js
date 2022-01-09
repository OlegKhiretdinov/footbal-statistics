import { action, makeObservable, observable } from "mobx"

const url = 'https://api.football-data.org/v2'
const token = '5a3212400041421fada0041ca9629a7e'

class CompetitionStore {
  competitionList = []
  constructor() {
    makeObservable(this, {
      competitionList: observable,
      setCompetitionList: action,
    })
  }

  setCompetitionList() {
    fetch(`${url}/competitions/?plan=TIER_ONE&areas=2077`, {
      headers: {
        'X-Auth-Token': token,
      }
    })
    .then(response => response.json())
    .then(data => {
      this.competitionList = data.competitions.map(item => {
        return {
          competition: item.name,
          id: item.id,
          areaName: item.area.name,
          areaImg: item.area.ensignUrl
        }
      })
      console.log(data.competitions)}
    )
  }


}

export default new CompetitionStore()
