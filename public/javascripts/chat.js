
var socket = io.connect('http://mjodev.com');

$(".loginForm").on('submit', function(e){
  e.preventDefault();
  
  var name = $.trim($("#userName").val());
  
  if(name.length < 1){
    $("#userName").css("border", "1px solid red");
  } else {
    socket.emit("login", {name: name});
    $(this).slideUp();
    listenForChatter();
  }
});

function listenForChatter(){
  socket.on("add chatter", function(chatter){
    $("#chat-list ul").append('<li data-name="' + chatter + '">' + chatter + '</li>');
  });

  socket.on("remove chatter", function(chatter){
    $("#chat-list ul li[data-name=" + chatter + "]").remove();
  });

  socket.on("chat", function(msg){
    $("#messages").append("\
      <div class='msg'>\
        <p>" + msg + "</p>\
      </div>\
      ");
  });

  $(".textForm").on("submit", function(e){
    e.preventDefault();

    var message = $.trim($("#message").val());
    $("#message").val("");
    socket.emit("messages", message);
  });
}
