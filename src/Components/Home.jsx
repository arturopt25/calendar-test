import React, { useState } from 'react'
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select'
import './Home.css'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';



const Home = () => {

    //declaracion de estados y valores 

    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedDate2, setSelectedDate2] = useState(null);
    const [column, setColumn] = useState(null);
    const [dateList, setDateList] = useState([]);

    const options = [
        { value: '1', label: '1' },
        { value: '2', label: '2' },
        { value: '3', label: '3' },
        { value: '4', label: '4' },
        { value: '5', label: '5' },
        { value: '6', label: '6' },
        { value: '7', label: '7' },
        { value: '8', label: '8' },
        { value: '9', label: '9' },
        { value: '10', label: '10' }
      ]

      
      
      const onSubmit=(values, props)=>{
          values.preventDefault()
          console.log(column[Object.keys(column)[0]]);

          const firstDate = dateString(selectedDate)
          const lastDate = dateString(selectedDate2)
          setDateList(dateRange(firstDate, lastDate));
        
    }

    // logica de calendario 

    function dateRange(startDate, endDate) {
        var start      = startDate.split('-');
        var end        = endDate.split('-');
        var startYear  = parseInt(start[2]);
        var endYear    = parseInt(end[2]);
        var dates      = [];
      
        for(var i = startYear; i <= endYear; i++) {
          var endMonth = i != endYear ? 11 : parseInt(end[1]) - 1;
          var startMon = i === startYear ? parseInt(start[1])-1 : 0;
          for(var j = startMon; j <= endMonth; j = j > 12 ? j % 12 || 11 : j+1) {
            var month = j;
            var displayMonth = month < 10 ? '0'+month : month;
            dates.push({year: i, month: displayMonth});
          }
        }
        return dates;
      }
    const dateString = (d) => ( d.getDate() < 10 ? "0"+ d.getDate() :  d.getDate())  + "-" + ( d.getMonth()+1 < 10 ? "0"+ (d.getMonth()+1) :  d.getMonth()+1) + "-" + d.getFullYear();
    

    return (
        <div>
            <section className="content">
                <div className="formulario">
                    <form onSubmit={onSubmit}>
                    <h3>Calendario</h3>
                    <div className="input-container">
                        <p>Seleccione las Fechas</p>
                        <DatePicker 
                        placeholderText="Fecha inicial"
                        selected={selectedDate} 
                        onChange= {date => setSelectedDate(date)} 
                        dateFormat="MM/yyyy"
                        showMonthYearPicker
                        startDate={selectedDate}
                        endDate={selectedDate2}
                        maxDate={selectedDate2}
                        isClearable
                        />
                        <DatePicker 
                        placeholderText="Fecha final"
                        selected={selectedDate2} 
                        onChange= {date2 => setSelectedDate2(date2)}
                        dateFormat="MM/yyyy"
                        showMonthYearPicker 
                        endDate={selectedDate2}
                        minDate={selectedDate}
                        isClearable
                        />
                    
                    </div>
                    <div className="select">
                    
                    <Select 
                    placeholder="Columnas" 
                    options={options}
                    onChange= {col => setColumn(col)} />
                    </div>
                    <button type="submit" className="boton">Enviar</button>
                        
                    </form>
                </div>
                <div class="custom-shape-divider-bottom-1630373554">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" class="shape-fill"></path>
                </svg>
                </div>
            </section>

                
                    
                 {dateList.map(dias => (
                    <Calendar 
                    className="calendario" 
                    defaultValue={new Date(dias.year, dias.month, 1)}
                    />)
                  )}
               


            
            
        </div>
    )
}

export default Home
