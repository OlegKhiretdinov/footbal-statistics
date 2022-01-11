import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { observer } from "mobx-react-lite"
import MatchListStore from "../../store/MatchListStore"

const  MatchList = () => {
  const {id, type} = useParams()
  const store = MatchListStore.matchList

  useEffect(() => {
    MatchListStore.setMatchList(id, type)
  }, [id, type])

  const table = store.map(match => (
    <div key={match.id} style={{padding: "15px"}}>
      {match.competition?.name}
      <div>{match.utcDate}</div>
      <div>{match.score.fullTime.homeTeam} : {match.score.fullTime.awayTeam}</div>
      <div>{match.homeTeam.name} - {match.awayTeam.name}</div>
    </div>
  ))

  return (
    <>
      <h1>{`${type} MatchList ${id}`}</h1>
      {table}
    </>
  )
}

export default observer(MatchList)
