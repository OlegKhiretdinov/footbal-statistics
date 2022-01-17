import { useSearchParams } from "react-router-dom"
import { SEARCH } from "../../utils/const"
import { urlStringToObject } from "../../utils/parseUrlParams"

const SearchInput = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const onChange = (e) => {
    const value = e.target.value
    const paramsObj = urlStringToObject(searchParams.toString())
    if (value) {
      setSearchParams({...paramsObj, [SEARCH]: value})
    } else {
      delete paramsObj[SEARCH]
      setSearchParams(paramsObj)
    }
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
