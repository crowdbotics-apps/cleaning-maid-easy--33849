
import React, { useState, useMemo } from "react"
// react component used to create a calendar with events on it
import {
  Calendar as ReactBigCalendar,
  momentLocalizer,
  Views,
  Navigate
} from "react-big-calendar"
import moment from "moment"
import SweetAlert from "react-bootstrap-sweetalert"

// reactstrap components
import { Card, CardBody, Row, Col } from "reactstrap"

import { events } from "variables/general.js"

const localizer = momentLocalizer(moment)

const Calendar = () => {
  const [addEvents, setAddEvents] = useState(events)
  const [alertMsg, setAlertMsg] = useState(null)

  const selectedEvent = event => {
    // alert(event.title);
  }

  const addNewEventAlert = slotInfo => {
    // setAlertMsg(
    //   <SweetAlert
    //     input
    //     showCancel
    //     style={{ display: "block", marginTop: "-100px" }}
    //     title="Input something"
    //     onConfirm={e => addNewEvent(e, slotInfo)}
    //     onCancel={() => hideAlert()}
    //     confirmBtnBsStyle="info"
    //     cancelBtnBsStyle="danger"
    //   />
    // )
  }

  const addNewEvent = (e, slotInfo) => {
    var newEvents = addEvents
    newEvents.push({
      title: e,
      start: slotInfo.start,
      end: slotInfo.end
    })
    setAddEvents(newEvents)
    setAlertMsg(null)
  }

  const hideAlert = () => {
    setAlertMsg(null)
  }

  const resourceMap = [
    { resourceId: 1, resourceTitle: "Board room" },
    { resourceId: 2, resourceTitle: "Training room" },
    { resourceId: 3, resourceTitle: "Meeting room 1" },
    { resourceId: 4, resourceTitle: "Meeting room 2" }
  ]

 
  const eventColors = (event, start, end, isSelected) => {
    var backgroundColor = "event-";
    event.color
      ? (backgroundColor = backgroundColor + event.color)
      : (backgroundColor = backgroundColor + "default");
    return {
      className: backgroundColor,
    };
  };
  

  return (
    <>
      <div className="content">
        {alertMsg}
        <Row>
          <Col className="ml-auto mr-auto" md="12">
            <Card className="card-calendar">
              <CardBody>
                <ReactBigCalendar
                  selectable
                  defaultDate={new Date()}
                  localizer={localizer}
                  events={addEvents}
                  views={{
                    day: true,
                    week: true,
                    month: true
                  }}
                startAccessor='start'
                endAccessor='end'
                  toolbar={true}
                  formats = {{
                    dayHeaderFormat: ({start, end}) => {
                        return (moment.utc(start).format('MM/DD/YYYY') + ', ' + moment.utc(end).format('MM/DD/YYYY') );
                    },
                    monthHeaderFormat: ({start}) => {
                      return (moment.utc(start).format('MMMM'));
                  },
                  selectRangeFormat: ({start,end}) => {
                    return (new Date() );
                },
                  
                  
                }}
                  defaultView="day"
                  scrollToTime={new Date()}
                  onSelectEvent={event => selectedEvent(event)}
                  onSelectSlot={slotInfo => addNewEventAlert(slotInfo)}
                  eventPropGetter={eventColors}
                  dayLayoutAlgorithm={"no-overlap"}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default Calendar
