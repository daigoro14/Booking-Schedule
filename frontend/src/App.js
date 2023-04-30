import "./styles/schedule.css"
import bookingData from "./bookingData.js"

function App() {

  function minutesToDecimals (minute) {
    const decimals = minute/60
    return decimals
  }

  // Positioning the booking element vertically with %
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


  // var curr = new Date; // get current date
  // var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
  // var last = first + 6; // last day is the first day + 6

  // var firstday = new Date(curr.setDate(first)).toUTCString();
  // var lastday = new Date(curr.setDate(last)).toUTCString();

  // console.log(firstday)
  // console.log(lastday)


  const currentDate = new Date();
  const startDate = new Date(currentDate.getFullYear(), 0, 1);
  var days = Math.floor((currentDate - startDate) /
      (24 * 60 * 60 * 1000));
       
  var weekNumber = Math.ceil(days / 7);
   
  // Display the calculated result      
  console.log("Week number of " + currentDate +
      " is :   " + weekNumber);

  return (
    <div>
      <div className="content">
        <div className="scheduleRemote">
          <svg xmlns="http://www.w3.org/2000/svg" width="25" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
          </svg>
          {/* <h3>Week 51 {`${firstday} - ${lastday}`}</h3> */}
          <svg xmlns="http://www.w3.org/2000/svg" width="25" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
          </svg>
          <div className="colorInstruction">
            <span>Available</span>
            <div className="freeExample"></div>
            <span>Booked</span>
            <div className="bookedExample"></div>
          </div>
        </div>
        <div className="schedule">
          <table>
            <colgroup>
              {/* <col span="1" style={{width: 25 + "px"}}/> */}
              {/* <col style="background-color:yellow"/> */}
            </colgroup>
            <tr>
              <td style={{border: "none", backgroundColor: "white", "width": 50 + "px"}}></td>
              <th>Monday</th>
              <th>Tuesday</th>
              <th>Wednesday</th>
              <th>Thursday</th>
              <th>Friday</th>
              <th>Saturday</th>
              <th>Sunday</th>
            </tr>
            <tr>
              <td>2am</td>
              <td rowSpan="12">
                {bookingData
                .filter((item) => {
                  if (item.day == "monday") {
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
                  if (item.day == "tuesday") {
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
                  if (item.day == "wednesday") {
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
                  if (item.day == "thursday") {
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
                  if (item.day == "friday") {
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
                  if (item.day == "saturday") {
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
                  if (item.day == "sunday") {
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
              <td>4am</td>
            </tr>
            <tr>
              <td>6am</td>
            </tr>
            <tr>
              <td>8am</td>
            </tr>
            <tr>
              <td>10am</td>
            </tr>
            <tr>
              <td>12pm</td>
            </tr>
            <tr>
              <td>14pm</td>
            </tr>
            <tr>
              <td>16pm</td>
            </tr>
            <tr>
              <td>18pm</td>
            </tr>
            <tr>
              <td>20pm</td>
            </tr>
            <tr>
              <td>22pm</td>
            </tr>
            <tr>
              <td>24pm</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
