import { useEffect } from "react"
import { Link, useParams, useSearchParams } from "react-router-dom"
import { observer } from "mobx-react-lite"
import Loader from "../../components/Loader/Loader"
import CustomTable from "../../components/CustomTable/CustomTable"
import SearchInput from "../../components/SearchInput/SearchInput"
import TeamListStore from "../../store/TeamListStore"
import { SEARCH } from "../../utils/const"
import cls from "./TeamList.module.scss"

const TeamList = () => {
  const {id} = useParams()
  const [searchParams] = useSearchParams()
  const searchString = searchParams.get(SEARCH)

  const store = searchString
    ? TeamListStore.teamList.filter(item => item.name.includes(searchString))
    : TeamListStore.teamList


  useEffect(() => {
    TeamListStore.setTeamList(id)
  }, [id])

  const columnConfig = [
    {
      columnHeader: "Flag",
      key: "Flag",
      contentRender: storeItem => (
        <img
          src={storeItem.crestUrl}
          alt={storeItem.name}
          title={storeItem.name}
          className={cls.image}
        />
      )
    },
    {
      columnHeader: "Name",
      key: "Name",
      contentRender: storeItem => (
        <Link to={`/team/${storeItem.id}`}>{storeItem.name}</Link>
      )
    },
    {
      columnHeader: "Calendar",
      key: "Calendar",
      contentRender: storeItem => (
        <Link to={`/calendar/teams/${storeItem.id}`}>Calendar</Link>
      )
    },
  ]

  return <> 
    {TeamListStore.isLoading
      ? <Loader />
      : <>
      <h1>{TeamListStore.competionName} Team list</h1>
      <SearchInput />
      <Link to={`/calendar/competitions/${id}`}>{TeamListStore.competionName} calendar</Link>
      <CustomTable  columnConfig={columnConfig} store={store} />
      </>
    }
  </>
}

export default observer(TeamList)
