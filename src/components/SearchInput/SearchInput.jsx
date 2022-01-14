import { useSearchParams } from "react-router-dom"
import { SEARCH } from "../../utils/const"

const SearchInput = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const onChange = (e) => {
    setSearchParams({[SEARCH]: e.target.value})
  }

  return (
    <input
      type="text"
      value={searchParams.get(SEARCH) || ""}
      onChange={onChange}
    />
  )
}

export default SearchInput
