import { useEffect, useState } from 'react'
import "./styles/schedule.css"
// import "./styles/schedule.scss"
import bookingData from "./bookingData.js"

function App() {

  const [todaysWeek, setTodaysWeek] = useState(null)
  const [week, setWeek] = useState(todaysWeek)
  const [darkMode, setDarkMode] = useState("light")

  useEffect(() => {
  // Calculates what week it is
    const currentDate = new Date();
    const startDate = new Date(currentDate.getFullYear(), 0, 1);
    var days = Math.floor((currentDate - startDate) /
        (24 * 60 * 60 * 1000));
         
    setTodaysWeek(Math.ceil(days / 7))

  }, [])


  useEffect(() => {
    setWeek(todaysWeek)
  }, [todaysWeek])


  document.body.style.transition = ".3s"

  function handleCheckBox(checkBox) {
    if (checkBox) {
      document.body.style.backgroundColor = "#1e0e1e"
      document.body.style.color = "#ffffff"
      document.body.style.fill = "#ffffff"
      setDarkMode('dark')
    } else {
      document.body.style.backgroundColor = "#ffffff"
      document.body.style.color = "#000000"
      document.body.style.fill = "#000000"
      setDarkMode("light")
    }
  }


  function minutesToDecimals (minute) {
    const decimals = minute/60
    return decimals
  }


  // Positioning the booking vertically by % dependent on the start time of the booking
  function positionBooking (time) {
    const minutes = minutesToDecimals(time.minute)
    const procent = (time.hour + minutes)*100/24
    return procent
  }


  // Converting the length of a booking from time to pixels and 1 hour is 18px
  function bookingLength(start, end) {
    const startMinutes = minutesToDecimals(start.minute)
    start = start.hour + startMinutes

    const endMinutes = minutesToDecimals(end.minute)
    end = end.hour + endMinutes

    const length = (end - start) * 18
    return length
  }

  
  return (
    <div style={{backgroundColor: "#1e0e0e"}}>
      <div className="switchDiv">
          <span>Background: </span>
              <label className="switch">
                  <input 
                      type="checkbox" 
                      name="checkbox"
                      onClick={(e) => {handleCheckBox(e.target.checked);}}
                  />
                  <span className="slider round"></span>
              </label>
      </div>
      <div className="content">
        <div className="scheduleRemote">
          
          {/* This if statement does that we only cant view current and coming weeks and not the previous ones*/}
          { week === todaysWeek ? (
            <button className={`arrowBtn ${darkMode}`} style={{cursor: "default"}}>
              <svg xmlns="http://www.w3.org/2000/svg" width="25" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
              </svg>
            </button>
          ):(
            <button className='arrowBtn' onClick={() => setWeek((week) => week - 1)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="25" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
              </svg>
            </button>
          )}

          <h3>Week {week}</h3>
          <button className='arrowBtn' onClick={() => setWeek((week) => week + 1)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="25" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
            </svg>
          </button>
          <div className="colorInstruction">
            <span>Available</span>
            <div className="freeExample"></div>
            <span>Booked</span>
            <div className="bookedExample"></div>
          </div>
        </div>
        <div className="schedule">
          <table className={darkMode}>
            <colgroup>
            </colgroup>
            <tr>
              <td style={darkMode === "light" ? 
                {border: "none", backgroundColor: "white", "width": 50 + "px"} 
                : 
                {border: "none", backgroundColor: "#1e0e1e", "width": 50 + "px"}}>
              </td>
              <th>Monday</th>
              <th>Tuesday</th>
              <th>Wednesday</th>
              <th>Thursday</th>
              <th>Friday</th>
              <th>Saturday</th>
              <th>Sunday</th>
            </tr>
            <tr>
              <td>00:00</td>
              <td rowSpan="12">
                {bookingData
                .filter((item) => {
                  if (item.day === "monday" && item.week === week) {
                    return item
                  }
                })
                .map((item) => {
                  return (
                    <div
                      className={`availableTime ${item.availability}`}
                      style={{
                        top: positionBooking(item.startTime) + "%",
                        height: bookingLength(item.startTime, item.endTime) + "px"
                      }}
                    >
                      <div className="bookingInfo">
                        <span>Availability: {item.availability}</span>
                        <br/>
                        <span>Time: {item.startTime.hour}.{item.startTime.minute} - {item.endTime.hour}.{item.endTime.minute}</span>
                      </div>
                    </div>
                  )
                })}
              </td>
              <td rowSpan="12">
                {bookingData
                .filter((item) => {
                  if (item.day === "tuesday" && item.week === week) {
                    return item
                  }
                })
                .map((item) => {
                  return (
                    <div
                      className={`availableTime ${item.availability}`}
                      style={{
                        top: positionBooking(item.startTime) + "%",
                        height: bookingLength(item.startTime, item.endTime) + "px"
                      }}
                    >
                      <div className="bookingInfo">
                        <span>Availability: {item.availability}</span>
                        <br/>
                        <span>Time: {item.startTime.hour}.{item.startTime.minute} - {item.endTime.hour}.{item.endTime.minute}</span>
                      </div>
                    </div>
                  )
                })}
              </td>
              <td rowSpan="12">
                {bookingData
                .filter((item) => {
                  if (item.day === "wednesday" && item.week === week) {
                    return item
                  }
                })
                .map((item) => {
                  return (
                    <div
                      className={`availableTime ${item.availability}`}
                      style={{
                        top: positionBooking(item.startTime) + "%",
                        height: bookingLength(item.startTime, item.endTime) + "px"
                      }}
                    >
                      <div className="bookingInfo">
                        <span>Availability: {item.availability}</span>
                        <br/>
                        <span>Time: {item.startTime.hour}.{item.startTime.minute} - {item.endTime.hour}.{item.endTime.minute}</span>
                      </div>
                    </div>
                  )
                })}
              </td>
              <td rowSpan="12">
                {bookingData
                .filter((item) => {
                  if (item.day === "thursday" && item.week === week) {
                    return item
                  }
                })
                .map((item) => {
                  return (
                    <div
                      className={`availableTime ${item.availability}`}
                      style={{
                        top: positionBooking(item.startTime) + "%",
                        height: bookingLength(item.startTime, item.endTime) + "px"
                      }}
                    >
                      <div className="bookingInfo">
                        <span>Availability: {item.availability}</span>
                        <br/>
                        <span>Time: {item.startTime.hour}.{item.startTime.minute} - {item.endTime.hour}.{item.endTime.minute}</span>
                      </div>
                    </div>
                  )
                })}
              </td>
              <td rowSpan="12">
                {bookingData
                .filter((item) => {
                  if (item.day === "friday" && item.week === week) {
                    return item
                  }
                })
                .map((item) => {
                  return (
                    <div
                      className={`availableTime ${item.availability}`}
                      style={{
                        top: positionBooking(item.startTime) + "%",
                        height: bookingLength(item.startTime, item.endTime) + "px"
                      }}
                    >
                      <div className="bookingInfo">
                        <span>Availability: {item.availability}</span>
                        <br/>
                        <span>Time: {item.startTime.hour}.{item.startTime.minute} - {item.endTime.hour}.{item.endTime.minute}</span>
                      </div>
                    </div>
                  )
                })}
              </td>
              <td rowSpan="12">
                {bookingData
                .filter((item) => {
                  if (item.day === "saturday" && item.week === week) {
                    return item
                  }
                })
                .map((item) => {
                  return (
                    <div
                      className={`availableTime ${item.availability}`}
                      style={{
                        top: positionBooking(item.startTime) + "%",
                        height: bookingLength(item.startTime, item.endTime) + "px"
                      }}
                    >
                      <div className="bookingInfo">
                        <span>Availability: {item.availability}</span>
                        <br/>
                        <span>Time: {item.startTime.hour}.{item.startTime.minute} - {item.endTime.hour}.{item.endTime.minute}</span>
                      </div>
                    </div>
                  )
                })}
              </td>
              <td rowSpan="12">
                {bookingData
                .filter((item) => {
                  if (item.day === "sunday" && item.week === week) {
                    return item
                  }
                })
                .map((item) => {
                  return (
                    <div
                      className={`availableTime ${item.availability}`}
                      style={{
                        top: positionBooking(item.startTime) + "%",
                        height: bookingLength(item.startTime, item.endTime) + "px"
                      }}
                    >
                      <div className="bookingInfo">
                        <span>Availability: {item.availability}</span>
                        <br/>
                        <span>Time: {item.startTime.hour}.{item.startTime.minute} - {item.endTime.hour}.{item.endTime.minute}</span>
                      </div>
                    </div>
                  )
                })}
              </td>
            </tr>
            <tr>
              <td>02:00</td>
            </tr>
            <tr>
              <td>04:00</td>
            </tr>
            <tr>
              <td>06:00</td>
            </tr>
            <tr>
              <td>08:00</td>
            </tr>
            <tr>
              <td>10:00</td>
            </tr>
            <tr>
              <td>12:00</td>
            </tr>
            <tr>
              <td>14:00</td>
            </tr>
            <tr>
              <td>16:00</td>
            </tr>
            <tr>
              <td>18:00</td>
            </tr>
            <tr>
              <td>20:00</td>
            </tr>
            <tr>
              <td>22:00</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
