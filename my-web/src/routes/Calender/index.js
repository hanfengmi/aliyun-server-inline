import React from 'react';
import { connect } from 'dva';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import WebWrap from '../../components/WebWrap';
import events from './events'
import 'react-big-calendar/lib/css/react-big-calendar.css'

BigCalendar.momentLocalizer(moment);

@connect(({ calender }) => ({
    calender,
}))

class Calender extends React.Component {
    constructor(...props) {
        super(...props)
    
        this.state = { events }
    }

    onNavigate(){
        console.log('日期改变了，重新调接口')
    }

    handleSelect = (e) => {
        console.log(e)
    }
  render(){
      return (
        <WebWrap>
                <BigCalendar
                    events={this.state.events} // 数据
                    defaultView={BigCalendar.Views.WEEK}
                    views={['week']}
                    onNavigate={this.onNavigate.bind(this)}
                    scrollToTime={new Date(2018, 7, 1, 6)} 
                    selectable
                    onSelectEvent={this.handleSelect.bind(this)}
                />
        </WebWrap>
      );
  }
  
};


export default Calender;