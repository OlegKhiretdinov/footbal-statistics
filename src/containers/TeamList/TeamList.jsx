import { useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { observer } from "mobx-react-lite"
import TeamListStore from "../../store/TeamListStore"
import CustomTable from "../../components/CustomTable/CustomTable"
import cls from "./TeamList.module.css"

const TeamList = () => {
  const {id} = useParams()
  const store = TeamListStore.teamList

  useEffect(() => {
    TeamListStore.setTeamList(id)
  }, [])

  const columnConfig = [
    {
      columnHeader: "Flag",
      key: "Flag",
      contentRender: (storeItem) => (
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
        <Link to={`team/${storeItem.id}`}>{storeItem.name}</Link>
      )
    }
  ]
  return <>
    <h1>Team list</h1>
    <CustomTable  columnConfig={columnConfig} store={store} />
    </>
}

export default observer(TeamList)
