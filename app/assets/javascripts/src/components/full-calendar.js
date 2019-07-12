// $(document).ready(function () {
//   // Fetch our events
//   $.ajax({
//     url: "http://localhost:3000/events.json",
//     method: "GET",
//     datatype: "json",
//     // success: function (data) {
//     //   console.log('calendar data', data)
//     // }
    
//   // }).done(function (response) {
//   //   // TODO: Handle our response
//   }).done(function(response){
//     console.log("FullCalendar", response)
//     var events = [];
//     $.each(response, function(e){
//       events.push({
//         start: e.start_date,
//         end: e.end_date,
//         title: e.name
//       });
//     });
//     $('#calendar').fullCalendar({
//       events: events
//     });
//   });
// });