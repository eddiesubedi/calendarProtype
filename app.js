function generateCalnderSkeletion(selector){
	$(selector).append(`
		<table class="calendar-table">
		    <tbody>
		        <tr class="week-label">
		            <td>
		                <p>Sunday</p>
		            </td>
		            <td>
		                <p>Monday</p>
		            </td>
		            <td>
		                <p>Tuesday</p>
		            </td>
		            <td>
		                <p>Wednesday</p>
		            </td>
		            <td>
		                <p>Thrusday</p>
		            </td>
		            <td>
		                <p>Friday</p>
		            </td>
		            <td>
		                <p>Saturday</p>
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
	`);
};
function print(p){
	console.log(p)
}
function fillInCalendar(calendarElem, rowClass, month, year){
	var trs = $(calendarElem).find('>table > tbody > '+rowClass);
	var date = new Date(month+'/01/'+year);
	var firstDayOfMonth = date.getDay();
	var numOfDays = new Date(year, month, 0).getDate();

	print(firstDayOfMonth);
	print(numOfDays);

	var day = 1;
	var remaningDays = 1;

	var prevMonth = month-1;
	var prevYear = year-1;
	var prevnumOfDays = new Date(prevYear, prevMonth, 0).getDate()-firstDayOfMonth+1;

	trs.each(function(i, element){
		var tds = $(element).find('> td');
		tds.each(function(j, element){
			if(i==0 && !(j>=firstDayOfMonth)){
				$(element).append('<div class="not-curr date">'+prevnumOfDays+'</div>');
				prevnumOfDays = prevnumOfDays+1;
			}
			if(i==0 && j>=firstDayOfMonth){
				$(element).append('<div class="date">'+day+'</div>');
				day=day+1;
			}else if(day<=numOfDays && i>0){
				$(element).append('<div class="date">'+day+'</div>');
				day=day+1;
			}else if(i>0){
				$(element).append('<div class="not-curr date">'+remaningDays+'</div>');
				remaningDays = remaningDays+1;
			}
		});
	});
}
$('.s').click(function(){
	var month = $("input[name='Month']").val();
	var year = $("input[name='Year']").val();
	$('.calendar-table').remove();

	if(isNaN(month) || isNaN(year)){
		$("input[name='Month']").val('');
		$("input[name='Year']").val('');
	}else{
		generateCalnderSkeletion('.calendar');
		fillInCalendar($('.calendar')[0], '.week',month,year);
	}
});
generateCalnderSkeletion('.calendar');
var month = 9;
var year = 2018;
fillInCalendar($('.calendar')[0], '.week',month,year);