import ReactDatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";

const CustomRangeDatePicker = (props) => {
  const {dateFilterHandler, dateFrom, dateTo, setDateFrom, setDateTo} = props

  return(
    <form onSubmit={dateFilterHandler}>
      <div>
        <ReactDatePicker
          maxDate={dateTo}
          onChange={setDateFrom}
          selected={dateFrom}
          showYearDropdown
          dropdownMode="select"
          isClearable
          dateFormat="dd/MM/yyyy"
          placeholderText="Select date"
        />
        <ReactDatePicker
          minDate={dateFrom}
          onChange={setDateTo}
          selected={dateTo}
          showYearDropdown
          dropdownMode="select"
          isClearable
          dateFormat="dd/MM/yyyy"
          placeholderText="Select date"
        />
        <button type="submit" disabled={!dateFrom !== !dateTo }>Filter</button>
      </div>
    </form>
  )
}

export default CustomRangeDatePicker
