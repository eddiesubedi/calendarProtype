var calendar = (function(){
  var $calendar, $monthTitle, $yearTitle
  var $mL
  var $mR
  var $yL
  var $yR
  function generateCalnderSkeletion(selector){
    $(selector).append(`
      <table class="calendar-table">
          <tbody>
              <tr class="week-label">
                  <td>
                      <p class = "full-week">Sunday</p>
                      <p class = "abbr-week">SUN</p>
                  </td>
                  <td>
                      <p class = "full-week">Monday</p>
                      <p class = "abbr-week">MON</p>
                  </td>
                  <td>
                      <p class = "full-week">Tuesday</p>
                      <p class = "abbr-week">TUE</p>
                  </td>
                  <td>
                      <p class = "full-week">Wednesday</p>
                      <p class = "abbr-week">WED</p>
                  </td>
                  <td>
                      <p class = "full-week">Thrusday</p>
                      <p class = "abbr-week">THU</p>
                  </td>
                  <td>
                      <p class = "full-week">Friday</p>
                      <p class = "abbr-week">FRI</p>
                  </td>
                  <td>
                      <p class = "full-week">Saturday</p>
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
  function fillInCalendar(calendarElem, rowClass, month, year){
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

  function setMonthYearLabel(){
    $monthTitle.text(months[currMonth])
    $yearTitle.text(currYear)
    $('.calendar-table').remove()
    generateCalnderSkeletion($calendar)
    fillInCalendar($calendar[0], '.week',currMonth+1,currYear)
  }

  function setClickFunctions(){
    $mL.click(function(){
      decrementCurrMonth()
      setMonthYearLabel()
    })

    $mR.click(function(){
      incrementCurrMonth()
      setMonthYearLabel()
    })

    $yL.click(function(){
      currYear=currYear-1
      setMonthYearLabel()
    })
    $yR.click(function(){
      currYear=currYear+1
      setMonthYearLabel()
    })
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
      generateCalnderSkeletion($calendar)
      fillInCalendar($calendar[0], '.week',month,year)
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
    setMonthYearLabel()
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