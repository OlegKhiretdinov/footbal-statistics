import { useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { observer } from "mobx-react-lite"
import TeamPageStore from "../../store/TeamPageStore"
import Loader from "../../components/Loader/Loader"

const TeamPage = () => {
  const {id} = useParams()

  const {teamData} = TeamPageStore

  useEffect(() => {
    TeamPageStore.setTeamData(id)
  }, [])

  return (
    TeamPageStore.isLoading
    ? <Loader />
    : <div>
        <h1>{teamData.name}</h1>
        <div><img src={teamData.crestUrl} alt={`crest ${teamData.name}`} /></div>
        <div>
          Web Site: 
          <a href={teamData.website}>
            {teamData.website}
          </a>
        </div>
        <Link to={`/calendar/teams/${teamData.id}`}>Calendar</Link>
      </div>
  )
}

export default observer(TeamPage)
