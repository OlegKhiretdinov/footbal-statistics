import { useState } from "react";
import ReactDatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";

const CustomRangeDatePicker = (props) => {
  const {dateFilterHandler, initDateFrom, initDateTo} = props

  const [dateFrom, setDateFrom] = useState(initDateFrom)
  const [dateTo, setDateTo] = useState(initDateTo)

  return(
    <form onSubmit={dateFilterHandler}>
      <div>
        <ReactDatePicker
          maxDate={dateTo}
          onChange={(date) => setDateFrom(date)}
          selected={dateFrom}
          showYearDropdown
          dropdownMode="select"
          isClearable
          dateFormat="yyyy-MM-dd"
          placeholderText="Select date"
        />
        <ReactDatePicker
          minDate={dateFrom}
          onChange={(date) => setDateTo(date)}
          selected={dateTo}
          showYearDropdown
          dropdownMode="select"
          isClearable
          dateFormat="yyyy-MM-dd"
          placeholderText="Select date"
        />
        <button type="submit" disabled={!dateFrom !== !dateTo }>Filter</button>
      </div>
    </form>
  )
}

export default CustomRangeDatePicker
