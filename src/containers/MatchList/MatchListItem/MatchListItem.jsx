import { Link } from "react-router-dom"
import { FINISHED, POSTPONED } from "../../../utils/const"

const MatchListItem = ({ match }) => {
  const dateFormat = { year: "numeric", month: "long", day: "numeric" }

  return (
    <div>
      {match.competition && (
        <Link to={`/competition/${match.competition.id}`}>
          {match.competition.name}
        </Link>
      )}
      <div>
        {new Date(match.utcDate).toLocaleDateString("en-US", dateFormat)}
      </div>
      {match.status === FINISHED && (
        <div>
          {match.score.fullTime.homeTeam} : {match.score.fullTime.awayTeam}
        </div>
      )}
      {match.status === POSTPONED && <div>{match.status}</div>}
      <div>
        <Link to={`/team/${match.homeTeam.id}`}>{match.homeTeam.name}</Link>
        {" - "}
        <Link to={`/team/${match.awayTeam.id}`}>{match.awayTeam.name}</Link>
      </div>
    </div>
  )
}

export default MatchListItem
