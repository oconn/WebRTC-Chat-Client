$(document).ready(function(){
  var socket = io.connect('http://localhost:3000');
  socket.on('welcome', function (data) {
    // alert(data.msg);
    // socket.emit('my other event', { my: 'data' });
  });

  socket.on("add chatter", function(chatter){
    $("#chat-list").append('<li>' + chatter + '</li>');
  });

  $(".loginForm").on('submit', function(e){
    e.preventDefault();
    
    var name = $.trim($("#userName").val());
    
    if(name.length < 1){
      $("#userName").css("border", "1px solid red");
    } else {
      socket.emit("login", {name: name});
      $(this).slideUp();
    }
  });
});