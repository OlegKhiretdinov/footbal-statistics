import { action, makeObservable, observable } from "mobx"
import { baseUrl, tokenKey } from "../utils/const"

class CompetitionStore {
  competitionList = []
  constructor() {
    makeObservable(this, {
      competitionList: observable,
      setCompetitionList: action,
    })
  }

  setCompetitionList() {
    fetch(`${baseUrl}/competitions/?plan=TIER_ONE&areas=2077`, {
      headers: {
        'X-Auth-Token': tokenKey,
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
    })
  }


}

export default new CompetitionStore()
