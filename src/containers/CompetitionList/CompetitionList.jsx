import { observer } from "mobx-react-lite"
import { useEffect } from "react"
import { Link, useSearchParams } from "react-router-dom"
import CustomTable from "../../components/CustomTable/CustomTable"
import Loader from "../../components/Loader/Loader"
import SearchInput from "../../components/SearchInput/SearchInput"
import CompetitionStore from "../../store/CompetitionStore"
import { SEARCH } from "../../utils/const"
import cls from "./CompetitionList.module.scss"
import calendarSvg from "../../assets/calendar.svg"

const CompetitionList = () => {
  const [searchParams] = useSearchParams()
  const searchString = searchParams.get(SEARCH)

  useEffect(() => {
    CompetitionStore.setCompetitionList()
  }, [])

  const columnConfig = [
    {
      columnHeader: "Area",
      key: "Area",
      contentRender: (storeItem) => (
        <div key={storeItem.id}>
          <img
            className={cls.image}
            src={storeItem.areaImg}
            alt={storeItem.areaName}
            title={storeItem.areaName}
          />
        </div>
      ),
    },
    {
      columnHeader: "Competition",
      key: "Competition",
      contentRender: (storeItem) => (
        <Link to={`/competition/${storeItem.id}`}>{storeItem.competition}</Link>
      ),
    },
    {
      columnHeader: "Calendar",
      key: "Calendar",
      contentRender: (storeItem) => (
        <Link to={`/calendar/competitions/${storeItem.id}`}>
          <img src={calendarSvg} alt="Calendar" />
        </Link>
      ),
    },
  ]

  const store = searchString
    ? CompetitionStore.competitionList.filter((item) =>
        item.competition.includes(searchString)
      )
    : CompetitionStore.competitionList

  return (
    <>
      <h1>Competition List</h1>
      <SearchInput placeholder={"find liague(just start typing)"} />
      {CompetitionStore.isLoading ? (
        <Loader />
      ) : (
        <CustomTable columnConfig={columnConfig} store={store} />
      )}
    </>
  )
}

export default observer(CompetitionList)
