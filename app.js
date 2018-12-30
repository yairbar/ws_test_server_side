$(document).ready(function(){

loadAllPosts()

  });

//Show all posts
  function loadAllPosts(){

    request =  $.ajax({
        url: "controller.php",
        type: "POST",
        dataType:"json",
        data:{posts:1},

    });
    request.done(function(data) {

        $("#posts").html("")

        if( data.length > 0)
        {
            var str = '<h1>Post manager</h1>';
                str += '<table style="width:100%">';
            $('#posts').append(str);

            for (i in data){

                
                str =  '<tr><td style="width:90%"> <a href="#"  class="post">';
                str +=  ' <h3 onclick="loadPost('+ data[i].id +')"   >' + data[i].title + '</h3> </a> </td>';
                str +=  '<td><a href="#" onclick="editPost('+ data[i].id +')" >Edit</a></td></tr>';

                $('#posts').append(str);
            }
        }
        
        str = '</table><button onclick="newPost()"> + New post</button>';

        $('#posts').append(str);

    });
    request.fail(function(){ console.log(request.fail); });

};

//View post
  function loadPost(id){

    request =  $.ajax({
        url: "controller.php",
        type: "POST",
        dataType:"json",
        data:{post_id:id},

    });
    request.done(function(data) {
       $("#posts").html("")

       var str = '<h3>'+data[0].title+'</h3>';
       str +='<p class="content">'+data[0].content+'</p>';
       
       $('#posts').append(str);


    });
    request.fail(function(){ console.log(request.fail); });

    
}

//Form to create a new post
function newPost(){

    $("#posts").html("")

    var str = '<div id="form"><h1>Create post</h1>'
        str += '<label for="title"> Post title:   </label><input type="text" name="title" ><br><br>';
        str += '<label for="content" > Content:   </label><textarea rows="5" name="content"></textarea><br><br>';
        str += '<div class="btns">';
        str += '<button name="newPost" onclick="addNewPost(event)">Publish</button>';
        str += '<br><button onclick="previewPost()" >Preview</button></div>';
        str += '</div>';
    
    $('#posts').append(str);

}

//Save the new post
function addNewPost(event){
    event.preventDefault()
    console.log("new post")

    var title = $("#posts").find(" input[name = 'title'] ").val();
    var content = $("#posts").find(" textarea ").val();
    
    if( title === "") return alert("The title is empty");
    else if(content === "") return alert("The content is empty"); 

    else{

    var newPost = [title, content]

    request =  $.ajax({
        url: "controller.php",
        type: "POST",
        dataType:"json",
        data:{newPost : newPost},

    });
    request.done(function(data) {
        loadAllPosts();
    });
    request.fail(function(){ console.log(request.fail); });

    
    
    }
}

//Form edit post
function editPost(id){

    request =  $.ajax({
        url: "controller.php",
        type: "POST",
        dataType:"json",
        data:{post_id:id},

    });
    request.done(function(data) {
        
        $("#posts").html("")


        var str = '<div id="form"> <h1>Edit post</h1>'
            str += '<input type="hidden" name="post_id" value="'+ data[0].id +'">'
            str += '<label for="title"> Post title:   </label><input type="text" name="title"  value="'+ data[0].title +'" ><br><br>';
            str += '<label for="content" > Content:   </label><textarea rows="10" name="content">'+ data[0].content +'</textarea><br><br>';
            str += '<div class="btns">';
            str += '<button name="newPost" onclick="savePost(event)">Publish</button>';
            str += '<button onclick="previewPost()" >Preview</button></div>';
            str += '</div>';
        
        $('#posts').append(str);


    });
    request.fail(function(){ console.log(request.fail); });

}

//Save edited post
function savePost(event){

    event.preventDefault()

    var id =  $("#posts").find(" input[name = 'post_id'] ").val();
    var title = $("#posts").find(" input[name = 'title'] ").val();
    var content = $("#posts").find(" textarea ").val();


    if( title === "") return alert("The title is empty");
    else if(content === "") return alert("The content is empty"); 

    else{
       
        var editedPost = [ id , title , content ]

        request =  $.ajax({
            url: "controller.php",
            type: "POST",
            dataType:"json",
            data:{editedPost : editedPost},
    
        });
        request.done(function(data) {
            loadAllPosts();
        });
        request.fail(function(){ console.log(request.fail); });
    
        

    }
    
}

//View a post without saving
function previewPost(){

    var title = $("#posts").find(" input[name = 'title'] ").val();
    var content = $("#posts").find(" textarea ").val();

    $("#form").hide();

    var str = '<div class="preview"> <h3>' + title + '</h3>';
    str +='<p class="content">' + content + '</p>';
    str +='<br><button onclick="backForm()" >Back</button></div>';
    
    $('#posts').append(str);


}

//Back to form from preview mode
function backForm(){
    $("#form").show();
    $(".preview").html("");
}