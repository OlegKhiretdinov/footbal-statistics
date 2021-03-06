import { useEffect } from "react"
import { Link, useParams, useSearchParams } from "react-router-dom"
import { observer } from "mobx-react-lite"
import Loader from "../../components/Loader/Loader"
import CustomTable from "../../components/CustomTable/CustomTable"
import SearchInput from "../../components/SearchInput/SearchInput"
import TeamListStore from "../../store/TeamListStore"
import { SEARCH } from "../../utils/const"
import cls from "./TeamList.module.scss"
import logo from "../../assets/default_logo.svg"
import calendarSvg from "../../assets/calendar.svg"

const TeamList = () => {
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const searchString = searchParams.get(SEARCH)

  const store = searchString
    ? TeamListStore.teamList.filter((item) => item.name.includes(searchString))
    : TeamListStore.teamList

  useEffect(() => {
    TeamListStore.setTeamList(id)
  }, [id])

  const columnConfig = [
    {
      columnHeader: "Flag",
      key: "Flag",
      contentRender: ({ crestUrl, name }) => (
        <img
          src={crestUrl || logo}
          alt={name}
          title={name}
          className={cls.image}
        />
      ),
    },
    {
      columnHeader: "Name",
      key: "Name",
      contentRender: (storeItem) => (
        <Link to={`/team/${storeItem.id}`}>{storeItem.name}</Link>
      ),
    },
    {
      columnHeader: "Calendar",
      key: "Calendar",
      contentRender: (storeItem) => (
        <Link to={`/calendar/teams/${storeItem.id}`}>
          <img src={calendarSvg} alt="Calendar" />
        </Link>
      ),
    },
  ]

  return (
    <>
      {TeamListStore.isLoading ? (
        <Loader />
      ) : (
        <>
          <h1>{TeamListStore.competionName} Team list</h1>
          <SearchInput placeholder={"find team(just start typing)"} />
          <Link to={`/calendar/competitions/${id}`} className={cls.link}>
            All {TeamListStore.competionName} matches
          </Link>
          <CustomTable columnConfig={columnConfig} store={store} />
        </>
      )}
    </>
  )
}

export default observer(TeamList)
