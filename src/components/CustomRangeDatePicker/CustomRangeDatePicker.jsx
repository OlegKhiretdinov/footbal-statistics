import { useState } from "react"
import ReactDatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import cls from "./CustomRangeDatePicker.module.scss"

const CustomRangeDatePicker = (props) => {
  const { dateFilterHandler, initDateFrom, initDateTo } = props

  const [dateFrom, setDateFrom] = useState(initDateFrom)
  const [dateTo, setDateTo] = useState(initDateTo)

  return (
    <form className={cls.rangePicker} onSubmit={dateFilterHandler}>
      <div className={cls.inputWrapper}>
        <ReactDatePicker
          className={cls.input}
          maxDate={dateTo}
          onChange={(date) => setDateFrom(date)}
          selected={dateFrom}
          showYearDropdown
          dropdownMode="select"
          isClearable
          dateFormat="yyyy-MM-dd"
          placeholderText="Select date from"
        />
      </div>
      <div className={cls.inputWrapper}>
        <ReactDatePicker
          className={cls.input}
          minDate={dateFrom}
          onChange={(date) => setDateTo(date)}
          selected={dateTo}
          showYearDropdown
          dropdownMode="select"
          isClearable
          dateFormat="yyyy-MM-dd"
          placeholderText="Select date to"
        />
      </div>

      <button
        className={cls.filterButton}
        type="submit"
        disabled={!dateFrom !== !dateTo}
      >
        Filter
      </button>
    </form>
  )
}

export default CustomRangeDatePicker
