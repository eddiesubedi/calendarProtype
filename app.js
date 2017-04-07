var calendar = (function(){
  var $calendar, $monthTitle, $yearTitle
  var $mL
  var $mR
  var $yL
  var $yR
  function generateMonthCalendar(selector){
    $(selector).append(`
      <table class="calendar-table">
          <tbody>
              <tr class="week-label">
                  <td>
                      <p class = "full-week">SUNDAY</p>
                      <p class = "abbr-week">SUN</p>

                  </td>
                  <td>
                      <p class = "full-week">MONDAY</p>
                      <p class = "abbr-week">MON</p>
                  </td>
                  <td>
                      <p class = "full-week">TUESDAY</p>
                      <p class = "abbr-week">TUE</p>
                  </td>
                  <td>
                      <p class = "full-week">WEDNESDAY</p>
                      <p class = "abbr-week">WED</p>
                  </td>
                  <td>
                      <p class = "full-week">THRUSDAY</p>
                      <p class = "abbr-week">THU</p>
                  </td>
                  <td>
                      <p class = "full-week">FRIDAY</p>
                      <p class = "abbr-week">FRI</p>
                  </td>
                  <td>
                      <p class = "full-week">SATURDAY</p>
                      <p class = "abbr-week">SAT</p>
                  </td>
              </tr>
              <tr class="week">
                  <td></td><td></td><td></td><td></td><td></td><td></td><td></td>
              </tr>
              <tr class="week">
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td>
              </tr>
              <tr class="week">
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td>
              </tr>
              <tr class="week">
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td>
              </tr>
              <tr class="week">
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td>
              </tr>
              <tr class="week">
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td>
              </tr>
          </tbody>
      </table>
    `)
  }
  function generateWeekCalendar(selector){
    $(selector).append(`
      <table class="calendar-table">
        <tbody>
            <tr class="week-label">
                <td>
                    <p class="full-week">Sunday</p>
                    <p class="abbr-week">SUN</p>
                </td>
                <td>
                    <p class="full-week">Monday</p>
                    <p class="abbr-week">MON</p>
                </td>
                <td>
                    <p class="full-week">Tuesday</p>
                    <p class="abbr-week">TUE</p>
                </td>
                <td>
                    <p class="full-week">Wednesday</p>
                    <p class="abbr-week">WED</p>
                </td>
                <td>
                    <p class="full-week">Thrusday</p>
                    <p class="abbr-week">THU</p>
                </td>
                <td>
                    <p class="full-week">Friday</p>
                    <p class="abbr-week">FRI</p>
                </td>
                <td>
                    <p class="full-week">Saturday</p>
                    <p class="abbr-week">SAT</p>
                </td>
            </tr>
            <tr class="week">
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
        </tbody>
    </table>
    `)
  }

  function generateDayCalendar(selector){
    $(selector).append(`
      <table class="calendar-table">
        <tbody>
            <tr class="week-label">
                <td>
                    <p class="day-label">Sunday</p>
                </td>
            </tr>
            <tr class="week week-day">
                <td></td>
            </tr>
        </tbody>
      </table>
    `)
  }

  function fillInMonthCalendar(calendarElem, rowClass, month, year){
    var trs = $(calendarElem).find('>table > tbody > '+rowClass)
    var date = new Date(month+'/01/'+year)
    var firstDayOfMonth = date.getDay()
    var numOfDays = new Date(year, month, 0).getDate()

    var day = 1
    var remaningDays = 1

    var prevMonth = month-1
    var prevYear = year-1
    var prevnumOfDays = new Date(prevYear, prevMonth, 0).getDate()-firstDayOfMonth+1

    trs.each(function(i, element){
      var tds = $(element).find('> td')
      tds.each(function(j, element){
        if(i==0 && !(j>=firstDayOfMonth)){
          $(element).append('<div class="not-curr date">'+prevnumOfDays+'</div>')
          prevnumOfDays = prevnumOfDays+1
        }
        if(i==0 && j>=firstDayOfMonth){
          $(element).append('<div class="date">'+day+'</div>')
          day=day+1
        }else if(day<=numOfDays && i>0){
          $(element).append('<div class="date">'+day+'</div>')
          day=day+1
        }else if(i>0){
          $(element).append('<div class="not-curr date">'+remaningDays+'</div>')
          remaningDays = remaningDays+1
        }
      })
    })
  }

  var currDate = new Date()
  var currMonth = currDate.getMonth()
  var currYear = currDate.getFullYear()
  var months = ['Janurary','February','March','April','May','June','July','August','September','October','November','December']

  function setMonthCalendar(){
    $('.month-labels').removeClass('inactive')
    $monthTitle.text(months[currMonth])
    $yearTitle.text(currYear)
    $('.calendar-table').remove()
    generateMonthCalendar($calendar)
    fillInMonthCalendar($calendar[0], '.week',currMonth+1,currYear)
    addData()
  }

  function setClickFunctions(){
    setMonthClickFunctions()
    setControlsClickFunctions()
  }
  function removeAllLabels(){
    $('.month-labels').addClass('inactive')
  }
  function setControlsClickFunctions(){
    $('.cal-btn').click(function(e){
      $('.cal-btn').removeClass('active-btn')
      $(e.target).addClass('active-btn')
    })
    $('.week-btn').click(function(){
      setWeekCalendar()
    })
    $('.month-btn').click(function(){
      setMonthCalendar()
    })
    $('.day-btn').click(function(){
      setDayCalendar()
    })
  }
  function setMonthClickFunctions(){
    $mL.click(function(){
      if($('.month-btn').hasClass('active-btn')){
        decrementCurrMonth()
        setMonthCalendar()
      }
    })

    $mR.click(function(){
      if($('.month-btn').hasClass('active-btn')){
        incrementCurrMonth()
        setMonthCalendar()
      }
    })

    $yL.click(function(){
      if($('.month-btn').hasClass('active-btn')){
        currYear=currYear-1
        setMonthCalendar()
      }
    })
    $yR.click(function(){
      if($('.month-btn').hasClass('active-btn')){
        currYear=currYear+1
        setMonthCalendar()
      }
    })
  }
  function setDayCalendar(){
    removeAllLabels()
    $('.calendar-table').remove()
    generateDayCalendar($calendar)
    $('.week td').css('height','500px')
  }
  function setWeekCalendar(){
    removeAllLabels()
    $('.calendar-table').remove()
    generateWeekCalendar($calendar)
    $('.week td').css('height','500px')
  }

  function incrementCurrMonth(){
    if(currMonth==11){
      currMonth = 0
    }else{
      currMonth = currMonth+1
    }
  }
  function decrementCurrMonth(){
    if(currMonth==0){
      currMonth = 11
    }else{
      currMonth = currMonth-1
    }
  }

  $('.s').click(function(){
    var month = $('input[name="Month"]').val()
    var year = $('input[name="Year"]').val()
    $('.calendar-table').remove()

    if(isNaN(month) || isNaN(year)){
      $('input[name="Month"]').val('')
      $('input[name="Year"]').val('')
    }else{
      generateMonthCalendar($calendar)
      fillInMonthCalendar($calendar[0], '.week',month,year)
    }
  })

  function init(selector){
    $calendar = $(selector.calendar)
    $monthTitle =  $(selector.monthTitle)
    $yearTitle = $(selector.yearTitle)
    $mL = $(selector.mL)
    $mR = $(selector.mR)
    $yL = $(selector.yL)
    $yR = $(selector.yR)
    setClickFunctions()
    setMonthCalendar()
  }
  return{init:init}
})()


$(document).ready(function(){
  calendar.init({
    calendar: '.calendar',
    monthTitle: '.month-title',
    yearTitle: '.year-title',
    mL: '.mL',
    yL: '.yL',
    mR: '.mR',
    yR: '.yR'
  })
})





function addData(){

    $('.week:nth-child(2) td:nth-child(1)').append('<p class="event blue">Mindful Recovery</p>')
    $('.week:nth-child(2) td:nth-child(1)').append('<p class="event red">Walking Meditation</p>')
    $('.week:nth-child(2) td:nth-child(1)').append('<p class="event yellow">Sunday Service: '+'“'+'The Watcher and the Stories We Tell Ourselves: How to See the Mustard Seed”</p>')

    $('.week:nth-child(2) td:nth-child(2)').append('<p class="event red">Lama Yeshe Jinpa: Teachings on the Lotus Sutra</p>')
    // $('').append('<p class="event red"></p>')
    $('.week:nth-child(2) td:nth-child(3)').append('<p class="event yellow">Mindful Yoga with Sandi</p>')
    $('.week:nth-child(2) td:nth-child(3)').append('<p class="event blue">Mindfulness Meditation Support Group</p>')

    $('.week:nth-child(2) td:nth-child(4)').append('<p class="event red">Just Plain Sitting</p>')
    $('.week:nth-child(2) td:nth-child(4)').append('<p class="event red">Mid-Day Mindfulness</p>')
    $('.week:nth-child(2) td:nth-child(4)').append('<p class="event blue">Beginning Meditation</p>')

    $('.week:nth-child(2) td:nth-child(5)').append('<p class="event red">Mindful Yoga with Sandi</p>')
    $('.week:nth-child(2) td:nth-child(5)').append('<p class="event blue">Introduction to Bagua Circle Walking Nei Gong</p>')
    $('.week:nth-child(2) td:nth-child(5)').append('<p class="event yellow">Mindful Yoga with Sandi</p>')

    $('.week:nth-child(2) td:nth-child(7)').append('<p class="event blue">Mindfulness Meditation for Everybody</p>')
    $('.week:nth-child(2) td:nth-child(7)').append('<p class="event red">Medicine Buddha Practice</p>')

    $(':nth-child(3) td:nth-child(1)').append('<p class="event blue">Mindful Recovery</p>')
    $(':nth-child(3) td:nth-child(1)').append('<p class="event red">Walking Meditation</p>')
    $(':nth-child(3) td:nth-child(1)').append('<p class="event yellow">Sunday Service: Boddhisattva’s path</p>')
    $(':nth-child(3) td:nth-child(1)').append('<p class="event red">Buddhism from the Ground Up</p>')

    $(':nth-child(3) td:nth-child(2)').append('<p class="event yellow">Just Plain Sitting</p>')

    $(':nth-child(3) td:nth-child(3)').append('<p class="event blue">Mindful Yoga with Sandi</p>')
    $(':nth-child(3) td:nth-child(3)').append('<p class="event yellow">Mindfulness Meditation Support Group</p>')

    $(':nth-child(3) td:nth-child(4)').append('<p class="event blue">Just Plain Sitting</p>')
    $(':nth-child(3) td:nth-child(4)').append('<p class="event red">Mid-Day Mindfulness</p>')
    $(':nth-child(3) td:nth-child(4)').append('<p class="event blue">Beginning Meditation</p>')

    $(':nth-child(3) td:nth-child(5)').append('<p class="event red">Mindful Yoga with Sandi</p>')
    $(':nth-child(3) td:nth-child(5)').append('<p class="event blue">Introduction to Bagua Circle Walking Nei Gong</p>')
    $(':nth-child(3) td:nth-child(5)').append('<p class="event red">Mindful Yoga with Sandi</p>')

    $(':nth-child(3) td:nth-child(7)').append('<p class="event yellow">Mindfulness Meditation for Everybody</p>')

    $(':nth-child(4) td:nth-child(1)').append('<p class="event blue">Mindful Recovery</p>')
    $(':nth-child(4) td:nth-child(1)').append('<p class="event red">Walking Meditation</p>')
    $(':nth-child(4) td:nth-child(1)').append('<p class="event red">Sunday Service: Boddhisattva’s path</p>')

    $(':nth-child(4) td:nth-child(2)').append('<p class="event yellow">Lama Yeshe Jinpa: Teachings on the Lotus Sutra</p>')

    $(':nth-child(4) td:nth-child(3)').append('<p class="event blue">Mindful Yoga with Sandi</p>')
    $(':nth-child(4) td:nth-child(3)').append('<p class="event yellow">Mindfulness Meditation Support Group</p>')

    $(':nth-child(4) td:nth-child(4)').append('<p class="event blue">Just Plain Sitting</p>')
    $(':nth-child(4) td:nth-child(4)').append('<p class="event red">Mid-Day Mindfulness</p>')
    $(':nth-child(4) td:nth-child(4)').append('<p class="event yellow">Beginning Meditation</p>')

    $(':nth-child(4) td:nth-child(5)').append('<p class="event blue">Mindful Yoga with Sandi</p>')
    $(':nth-child(4) td:nth-child(5)').append('<p class="event red">Introduction to Bagua Circle Walking Nei Gong</p>')
    $(':nth-child(4) td:nth-child(5)').append('<p class="event blue">Mindful Yoga with Sandi</p>')

    $(':nth-child(4) td:nth-child(7)').append('<p class="event red">Mindfulness Meditation for Everybody</p>')
    $(':nth-child(4) td:nth-child(7)').append('<p class="event red">Journey to Awaken Kirtan Experience</p>')

    $(':nth-child(5) td:nth-child(1)').append('<p class="event blue">Mindful Recovery </p>')
    $(':nth-child(5) td:nth-child(1)').append('<p class="event red">Walking Meditation </p>')
    $(':nth-child(5) td:nth-child(1)').append('<p class="event yellow">Sunday Service: Boddhisattvas path </p>')
    $(':nth-child(5) td:nth-child(1)').append('<p class="event red">Buddhism from the Ground Up </p>')
    $(':nth-child(5) td:nth-child(2)').append('<p class="event blue">Just Plain Sitting</p>')

    $(':nth-child(5) td:nth-child(3)').append('<p class="event red">Mindful Yoga with Sandi</p>')
    $(':nth-child(5) td:nth-child(3)').append('<p class="event red">Mindfulness Meditation Support Group</p>')

    $(':nth-child(5) td:nth-child(4)').append('<p class="event yellow">Just Plain Sitting</p>')
    $(':nth-child(5) td:nth-child(4)').append('<p class="event red">Mid-Day Mindfulness</p>')
    $(':nth-child(5) td:nth-child(4)').append('<p class="event yellow">Beginning Meditation</p>')

    $(':nth-child(5) td:nth-child(5)').append('<p class="event blue">Mindful Yoga with Sandi</p>')
    $(':nth-child(5) td:nth-child(5)').append('<p class="event blue">Introduction to Bagua Circle Walking Nei Gong</p>')
    $(':nth-child(5) td:nth-child(5)').append('<p class="event red">Mindful Yoga with Sandi</p>')

    $(':nth-child(5) td:nth-child(7)').append('<p class="event yellow">Becoming Buddha – Monthly Meditation Workshop</p>')
    $(':nth-child(5) td:nth-child(7)').append('<p class="event red">Mindfulness Meditation for Everybody</p>')
    $(':nth-child(5) td:nth-child(7)').append('<p class="event yellow">Vajrasattva Practice</p>')

    $(':nth-child(6) td:nth-child(1)').append('<p class="event blue">Mindful Recovery</p>')
    $(':nth-child(6) td:nth-child(1)').append('<p class="event blue">Walking Meditation</p>')
    $(':nth-child(6) td:nth-child(1)').append('<p class="event red">Sunday Service: Boddhisattva’s path</p>')

    $(':nth-child(6) td:nth-child(2)').append('<p class="event yellow">Lama Yeshe Jinpa: Teachings on the Lotus Sutra</p>')

    $(':nth-child(6) td:nth-child(3)').append('<p class="event blue">Mindful Yoga with Sandi</p>')
    $(':nth-child(6) td:nth-child(3)').append('<p class="event red">Mindfulness Meditation Support Group</p>')

    $(':nth-child(6) td:nth-child(4)').append('<p class="event yellow">Just Plain Sitting</p>')
    $(':nth-child(6) td:nth-child(4)').append('<p class="event red">Mid-Day Mindfulness</p>')
    $(':nth-child(6) td:nth-child(4)').append('<p class="event yellow">Beginning Meditation</p>')

    $(':nth-child(6) td:nth-child(5)').append('<p class="event blue">Mindful Yoga with Sandi</p>')
    $(':nth-child(6) td:nth-child(5)').append('<p class="event yellow">Introduction to Bagua Circle Walking Nei Gong</p>')
    $(':nth-child(6) td:nth-child(5)').append('<p class="event blue">Mindful Yoga with Sandi</p>')

    $(':nth-child(6) td:nth-child(7)').append('<p class="event red">Mindfulness Meditation for Everybody</p>')

    $(':nth-child(7) td:nth-child(1)').append('<p class="event yellow">Mindful Recovery</p>')
    $(':nth-child(7) td:nth-child(1)').append('<p class="event red">Walking Meditation</p>')
    $(':nth-child(7) td:nth-child(1)').append('<p class="event yellow">Sunday Service: Boddhisattva’s path</p>')

    $(':nth-child(7) td:nth-child(2)').append('<p class="event red">Just Plain Sitting</p>')

    $(':nth-child(7) td:nth-child(3)').append('<p class="event blue">Mindful Yoga with Sandi</p>')
    $(':nth-child(7) td:nth-child(3)').append('<p class="event blue">Mindfulness Meditation Support Group</p>')

    $(':nth-child(7) td:nth-child(4)').append('<p class="event yellow">Just Plain Sitting</p>')
    $(':nth-child(7) td:nth-child(4)').append('<p class="event blue">Mid-Day Mindfulness</p>')
    $(':nth-child(7) td:nth-child(4)').append('<p class="event red">Beginning Meditation</p>')

    $(':nth-child(7) td:nth-child(5)').append('<p class="event yellow">Mindful Yoga with Sandi</p>')
    $(':nth-child(7) td:nth-child(5)').append('<p class="event red">Introduction to Bagua Circle Walking Nei Gong</p>')
    $(':nth-child(7) td:nth-child(5)').append('<p class="event yellow">Mindful Yoga with Sandi</p>')

    $(':nth-child(7) td:nth-child(7)').append('<p class="event blue">Mindfulness Meditation for Everybody</p>')
    $(':nth-child(7) td:nth-child(7)').append('<p class="event red">Medicine Buddha Practice</p>')
  }