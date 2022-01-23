import { useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { observer } from "mobx-react-lite"
import TeamPageStore from "../../store/TeamPageStore"
import Loader from "../../components/Loader/Loader"
import cls from "./TeamPage.module.scss"

const TeamPage = () => {
  const { id } = useParams()

  const { teamData } = TeamPageStore

  useEffect(() => {
    TeamPageStore.setTeamData(id)
  }, [id])

  return TeamPageStore.isLoading ? (
    <Loader />
  ) : (
    <div>
      <h1>{teamData.name}</h1>
      <div className={cls.desctription}>
        <div className={cls.item}>
          <img
            src={teamData.crestUrl}
            alt={`crest ${teamData.name}`}
            title={teamData.name}
            className={cls.logo}
          />
        </div>
        <div className={cls.item}>
          <p>
            Web Site:
            <a href={teamData.website} target={"_blank"} rel="noreferrer">
              {teamData.website}
            </a>
          </p>
          <p>
            <Link to={`/calendar/teams/${teamData.id}`}>Calendar</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default observer(TeamPage)
