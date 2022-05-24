import { Avatar, Card, CardContent, CardHeader, CardMedia, IconButton, Typography } from '@mui/material'
import { red } from '@mui/material/colors'
import React from 'react'
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Box } from '@mui/system';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";

const BlogCard = ({ title, description, image, user, isUser, id }) => {
    const navigator = useNavigate();
    const whichTab = useLocation().pathname;

    const handleEdit = (event) => {
        navigator(`/userblogs/${id}`);
    };

    const sendDeleteRequest = async () => {
        const response = await axios.delete(`http://localhost:8080/api/blog/${id}`)
            .catch(error => console.log(error));

        const responseData = await response.data;
        return responseData;
    };

    const handleDelete = () => {
        sendDeleteRequest().then(() => window.location.reload()).then(()=>console.log(whichTab)).then(()=>navigator(`${whichTab}`))
    };

    return (
        <div> <Card sx={{ margin: "auto", mt: 2, width: "50%", boxShadow: "5px 5px 10px #000" }}>
            {isUser && (
                <Box display="flex" >
                    <IconButton onClick={handleEdit} sx={{ marginLeft: "auto" }}>
                        <ModeEditOutlineIcon />
                    </IconButton>
                    <IconButton onClick={handleDelete} >
                        <DeleteOutlineIcon color="error"/>
                    </IconButton>
                </Box>
            )}
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        {user.charAt(0)}
                    </Avatar>
                }
                title={title}
            />
            {image &&
            <CardMedia
                component="img"
                height="194"
                image={image}
                alt={image}
            />
            }
            <CardContent>
                <hr />
                <br />
                <Typography variant="body2" color="text.secondary">
                    <b>{user}: </b>{description}
                </Typography>
            </CardContent>
        </Card></div>
    )
}

export default BlogCard