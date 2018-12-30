<?php 
require_once "Posts.class.php";
$posts = new Posts();



//Post all posts
if(isset($_POST["posts"]) && !empty($_POST["posts"])){

    $array=$posts->getAllPosts();
    echo json_encode($array);

}

//Post post by id
if(isset($_POST["post_id"]) && !empty($_POST["post_id"])){

    $array = $posts->getPost( $_POST["post_id"] );
     echo json_encode( $array );

}

//Create new post
if(isset($_POST["newPost"]) && !empty($_POST["newPost"])){

    $posts->createPost($_POST["newPost"][0], $_POST["newPost"][1] );
    echo json_encode( true );

}

//Edit post
if(isset($_POST["editedPost"]) && !empty($_POST["editedPost"])){

    $posts->updatePost($_POST["editedPost"][0], $_POST["editedPost"][1] , $_POST["editedPost"][2] );
    echo json_encode( true );

}


?>

