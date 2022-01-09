import { observer } from "mobx-react-lite"
import { useEffect } from "react"
import { Link } from "react-router-dom"
import CustomTable from "../../components/CustomTable/CustomTable"
import CompetitionStore from "../../store/CompetitionStore"
import cls from './CompetitionList.module.css'


const CompetitionList = () => {
  useEffect(() => {
    CompetitionStore.setCompetitionList()
  }, [])

  const columnConfig = [
    {
      columnHeader: "Area",
      key: 'Area',
      contentRender: (storeItem) => (
        <div key={storeItem.id}>
          <img
            className={cls.image}
            src={storeItem.areaImg}
            alt={storeItem.areaName}
            title={storeItem.areaName}
          />
        </div>
      )
    },
    {
      columnHeader: "Competition",
      key: "Competition",
      contentRender: storeItem => <a href={`/${storeItem.id}`}>{storeItem.competition}</a>
      // contentRender: storeItem => <Link to={`/${storeItem.id}`}>{storeItem.competition}</Link>
    }
  ]
  
  const store = CompetitionStore.competitionList

  return (
    <>
      <h1>CompetitionList</h1>
      {CompetitionStore ? <CustomTable columnConfig={columnConfig} store={store}/> : null}
    </>
  )
}

export default observer(CompetitionList)
