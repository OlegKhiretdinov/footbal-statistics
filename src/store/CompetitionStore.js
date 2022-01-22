import { action, makeObservable, observable } from "mobx"
import { baseUrl, tokenKey } from "../utils/const"

class CompetitionStore {
  competitionList = []
  isLoading = false

  constructor() {
    makeObservable(this, {
      competitionList: observable,
      isLoading: observable,
      setCompetitionList: action,
    })
  }

  setCompetitionList() {
    this.isLoading = true
    fetch(`${baseUrl}/competitions/?plan=TIER_ONE&areas=2077`, {
      headers: {
        "X-Auth-Token": tokenKey,
      },
    })
      .then((response) => response.json())
      .then(
        action((data) => {
          this.competitionList = data.competitions.map((item) => {
            return {
              competition: item.name,
              id: item.id,
              areaName: item.area.name,
              areaImg: item.area.ensignUrl,
            }
          })
          this.isLoading = false
        })
      )
  }
}

export default new CompetitionStore()
