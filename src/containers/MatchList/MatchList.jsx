import { useEffect } from "react"
import { Link, useParams, useSearchParams } from "react-router-dom"
import { observer } from "mobx-react-lite"
import MatchListStore from "../../store/MatchListStore"
import Loader from "../../components/Loader/Loader"
import SearchInput from "../../components/SearchInput/SearchInput"
import { SEARCH } from "../../utils/const"

const  MatchList = () => {
  const {id, type} = useParams()
  const [searchParams] = useSearchParams()
  const searchString = searchParams.get(SEARCH)
  
  useEffect(() => {
    MatchListStore.setMatchList(id, type)
  }, [id, type])
  
  const store = searchString
    ? MatchListStore.matchList.filter(item => (
        item.homeTeam.name.includes(searchString)
        || item.awayTeam.name.includes(searchString))
      )
    : MatchListStore.matchList

  const table = store.map(match => (
    <div key={match.id} style={{padding: "15px"}}>
      {match.competition && 
      <Link to={`/competition/${match.competition.id}`}>
        {match.competition.name}
      </Link>}
      <div>{match.utcDate}</div>
      <div>{match.score.fullTime.homeTeam} : {match.score.fullTime.awayTeam}</div>
      <div>
        <Link to={`/team/${match.homeTeam.id}`}>
          {match.homeTeam.name}
        </Link>
        {" - "}
        <Link to={`/team/${match.awayTeam.id}`}>
          {match.awayTeam.name}
        </Link>
      </div>
    </div>
  ))

  return (
    MatchListStore.isLoading
    ? <Loader />
    : <>
        <h1>{`${MatchListStore.name} Match List `}</h1>
        <SearchInput />
        {table}
      </>
  )
}

export default observer(MatchList)
