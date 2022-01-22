import { useEffect } from "react"
import { Link, useParams, useSearchParams } from "react-router-dom"
import { observer } from "mobx-react-lite"
import MatchListStore from "../../store/MatchListStore"
import Loader from "../../components/Loader/Loader"
import SearchInput from "../../components/SearchInput/SearchInput"
import { DATE_FROM, DATE_TO, SEARCH } from "../../utils/const"
import CustomRangeDatePicker from "../../components/CustomRangeDatePicker/CustomRangeDatePicker"
import { urlStringToObject } from "../../utils/parseUrlParams"

const  MatchList = () => {
  const {id, type} = useParams()
  const [filterParams, setFilterParams] = useSearchParams()
  const searchString = filterParams.get(SEARCH)

  const paramDateFrom = filterParams.get(DATE_FROM)
  const paramDateTo = filterParams.get(DATE_TO)

  let initDateFrom
  let initDateTo

  if (paramDateFrom) {
    initDateFrom = new Date(paramDateFrom)
  }

  if (paramDateTo) {
    initDateTo = new Date(paramDateTo)
  }

  useEffect(() => {
    const dateParams = {
      [DATE_FROM]: paramDateFrom,
      [DATE_TO]: paramDateTo,
    }
    MatchListStore.setMatchList(id, type, dateParams)
  }, [])
    
  const store = searchString
  ? MatchListStore.matchList.filter(item => (
    item.homeTeam.name.includes(searchString)
    || item.awayTeam.name.includes(searchString))
    )
    : MatchListStore.matchList
      
  const dateFilterHandler = (event) => {
    event.preventDefault()

    const paramsObj = urlStringToObject(filterParams.toString())
    const dateFrom = event.target[0].value
    const dateTo = event.target[2].value

    if(dateFrom && dateTo) {
      setFilterParams({...paramsObj,
        [DATE_FROM]: dateFrom,
        [DATE_TO]: dateTo,
      })
    } else {
      delete paramsObj[DATE_TO]
      delete paramsObj[DATE_FROM]
      setFilterParams(paramsObj)
    }

    const dateParams = {
      [DATE_FROM]: dateFrom,
      [DATE_TO]: dateTo,
    }

    MatchListStore.setMatchList(id, type, dateParams)
  }

  const dateFormat = {year: 'numeric', month: 'long', day: 'numeric'}

  const table = store?.map(match => (
    <div key={match.id}>
      {match.competition && 
      <Link to={`/competition/${match.competition.id}`}>
        {match.competition.name}
      </Link>}
      <div>{new Date(match.utcDate).toLocaleDateString("en-US", dateFormat)}</div>
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
        <CustomRangeDatePicker
          dateFilterHandler={dateFilterHandler}
          initDateFrom={initDateFrom}
          initDateTo={initDateTo}
        />
        {table}
      </>
  )
}

export default observer(MatchList)
