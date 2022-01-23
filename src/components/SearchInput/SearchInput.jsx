import { useSearchParams } from "react-router-dom"
import { SEARCH } from "../../utils/const"
import { urlStringToObject } from "../../utils/parseUrlParams"
import cls from "./SearchInput.module.scss"

const SearchInput = ({ placeholder }) => {
  const [searchParams, setSearchParams] = useSearchParams()

  const onChange = (e) => {
    const value = e.target.value
    const paramsObj = urlStringToObject(searchParams.toString())
    if (value) {
      setSearchParams({ ...paramsObj, [SEARCH]: value })
    } else {
      delete paramsObj[SEARCH]
      setSearchParams(paramsObj)
    }
  }

  return (
    <div className={cls.search}>
      <input
        type="text"
        value={searchParams.get(SEARCH) || ""}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  )
}

export default SearchInput
