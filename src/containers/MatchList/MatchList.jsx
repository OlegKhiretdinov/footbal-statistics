import { useCallback, useEffect, useState } from "react"
import { Link, useParams, useSearchParams } from "react-router-dom"
import { observer } from "mobx-react-lite"
import MatchListStore from "../../store/MatchListStore"
import Loader from "../../components/Loader/Loader"
import SearchInput from "../../components/SearchInput/SearchInput"
import { DATE_FROM, DATE_TO, SEARCH } from "../../utils/const"
import CustomRangeDatePicker from "../../components/CustomRangeDatePicker/CustomRangeDatePicker"
import { urlStringToObject } from "../../utils/parseUrlParams"
import { objDateToString } from "../../utils/utils"

const  MatchList = () => {
  const {id, type} = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const searchString = searchParams.get(SEARCH)

  const [dateFrom, setDateFrom] = useState(searchParams.get(DATE_FROM) && new Date(searchParams.get(DATE_FROM)))
  const [dateTo, setDateTo] = useState(searchParams.get(DATE_TO) && new Date(searchParams.get(DATE_TO)))

  const loadData = useCallback(() => {
    const dateParams = {
      [DATE_FROM]: dateFrom && objDateToString(dateFrom),
      [DATE_TO]: dateTo && objDateToString(dateTo),
    }
    MatchListStore.setMatchList(id, type, dateParams)
  }, [dateFrom, dateTo, id, type])

  useEffect(() => {
    loadData()
  }, [loadData])

  const store = searchString
    ? MatchListStore.matchList.filter(item => (
        item.homeTeam.name.includes(searchString)
        || item.awayTeam.name.includes(searchString))
      )
    : MatchListStore.matchList

    const dateFilterHandler = (event) => {
      event.preventDefault()
      const paramsObj = urlStringToObject(searchParams.toString())

      if(dateFrom && dateTo) {
        setSearchParams({...paramsObj,
          [DATE_FROM]: objDateToString(dateFrom),
          [DATE_TO]: objDateToString(dateTo),
        })
      } else {
        delete paramsObj[DATE_TO]
        delete paramsObj[DATE_FROM]
        setSearchParams(paramsObj)
      }
      loadData()
    }

  const dateFarmat = {year: 'numeric', month: 'long', day: 'numeric'}

  const table = store.map(match => (
    <div key={match.id}>
      {match.competition && 
      <Link to={`/competition/${match.competition.id}`}>
        {match.competition.name}
      </Link>}
      <div>{new Date(match.utcDate).toLocaleDateString("en-US", dateFarmat)}</div>
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
          dateFrom={dateFrom && new Date(dateFrom)}
          dateTo={dateTo && new Date(dateTo)}
          dateFilterHandler={dateFilterHandler}
          setDateFrom={setDateFrom}
          setDateTo={setDateTo}
        />
        {table}
      </>
  )
}

export default observer(MatchList)
