import * as React from 'react';
import { DatePickerInput } from 'react-native-paper-dates';

const Datepicker = () => {
    const [inputDate, setInputDate] = React.useState(inputDate)
  
    return (
        <DatePickerInput
          locale="en"
          label="Birthdate"
          value={inputDate}
          onChange={(d) => setInputDate(d)}
          inputMode="start"
          mode="outlined"
        />
    )
}

export default Datepicker;