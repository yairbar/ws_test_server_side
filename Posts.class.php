<?php 

require_once "db.php";

class Posts{

    public $_db;
    public $post_id;
    public $post_title;
    public $post_content;

    
    public function __construct(){
        $this->_db = DB::getInstance();
    }

    public function getAllPosts(){

        $params = array();
        $query = 'SELECT * from posts';
        return $this->_db->query($query ,$params)->_result;
    }

    public function getPost( $id ){

        $params = array();
        $query = 'select * from posts where id = '.$id;
        return $this->_db->query($query ,$params)->_result;
       
    }

    public function updatePost($id , $title, $content) {

        $this->post_id = $id;
        $this->post_title = $title;
        $this->post_content = $content;

        $params = array(
          ':id' => $this->post_id,
          ':title' => $this->post_title,
          ':content' => $this->post_content,
        );

        $query = 'UPDATE posts SET title=:title, content=:content WHERE id=:id';
        $this->_db->query($query, $params);


      }

    public function createPost($title, $content) {

        $this->post_id = NULL;
        $this->post_title = $title;
        $this->post_content = $content;

        $params = array(
          ':title' => $this->post_title,
          ':content' => $this->post_content
        );
       
        $query = 'INSERT INTO posts( title, content ) VALUES ( :title, :content )';
        $this->_db->query($query, $params);
      }

}

?>