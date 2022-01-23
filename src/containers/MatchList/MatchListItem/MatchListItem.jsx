import { Link } from "react-router-dom"
import { FINISHED, POSTPONED } from "../../../utils/const"
import cls from "./MatchListItem.module.scss"

const MatchListItem = ({ match }) => {
  const dateFormat = { year: "numeric", month: "long", day: "numeric" }

  return (
    <div className={cls.item}>
      <div className={cls.matchItemHeader}>
        <div>
          {new Date(match.utcDate).toLocaleDateString("en-US", dateFormat)}
        </div>
        {match.competition && (
          <Link
            to={`/competition/${match.competition.id}`}
            className={cls.link}
          >
            {match.competition.name}
          </Link>
        )}
      </div>
      {match.status === FINISHED && (
        <div>
          {match.score.fullTime.homeTeam} : {match.score.fullTime.awayTeam}
        </div>
      )}
      {match.status === POSTPONED && <div>{match.status}</div>}
      <div className={cls.teamNameWrapper}>
        <div className={cls.teamName}>
          <Link to={`/team/${match.homeTeam.id}`} className={cls.link}>
            {match.homeTeam.name}
          </Link>
        </div>
        <p> - </p>
        <div className={cls.teamName}>
          <Link to={`/team/${match.awayTeam.id}`} className={cls.link}>
            {match.awayTeam.name}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default MatchListItem
