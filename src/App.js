import classes from "./App.module.css";
import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import { red } from "@mui/material/colors";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

function App() {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [isComments, setIsComments] = useState(false);
  const [idPost, setIdPost] = useState();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getDatePosts();
    getDateUser();
    getDateComments();
  }, []);

  const getDatePosts = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");

    setPosts(await res.json());
  };

  const getDateComments = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/comments");

    setComments(await res.json());
  };

  const getDateUser = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");

    setUsers(await res.json());
  };

  const clickHanlder = (e) => {
    setIsComments(true);
    setIdPost(e.target.id);
  };
  return (
    <div>
      {posts.map((post) => {
        return users.map((user) => {
          if (post.userId === user.id) {
            return (
              <Card
                sx={{ maxWidth: 345 }}
                key={post.id}
                className={classes.card}
              >
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                      {user.name.charAt(0)}
                    </Avatar>
                  }
                  title={user.name}
                  subheader={post.title}
                />
                <CardContent>
                  <Typography>{post.body}</Typography>
                </CardContent>
                {isComments && (
                  <CardContent>
                    <Typography>
                      {comments.map((comment) => {
                        if (
                          idPost === comment.postId.toString() &&
                          post.id === comment.postId
                        ) {
                          return `${comment.body}.`;
                        }
                      })}
                    </Typography>
                  </CardContent>
                )}
                <CardActions>
                  <Button onClick={clickHanlder} id={post.id} size="small">
                    Comment
                  </Button>
                </CardActions>
              </Card>
            );
          }
        });
      })}
    </div>
  );
}

export default App;
