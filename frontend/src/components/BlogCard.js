import { Avatar, Card, CardContent, CardHeader, CardMedia, IconButton, Typography } from '@mui/material'
import { red } from '@mui/material/colors'
import React from 'react'
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';

const BlogCard = ({ title, description, image, user, isUser, id }) => {
    const navigator = useNavigate()
    const handleEdit = (event) => {
        navigator(`/userblogs/${id}`);
    }
    const handleDelete = (event) => {
       
    }
    
    return (
        <div> <Card sx={{ margin: "auto", mt: 2, width: "50%", boxShadow: "5px 5px 10px #000" }}>
            {isUser && (
                <Box display="flex" >
                    <IconButton onClick = {handleEdit} sx = {{marginLeft: "auto"}}>
                        <ModeEditOutlineIcon />
                    </IconButton>
                    <IconButton onClick = {handleDelete} >
                        <DeleteOutlineIcon />
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
                subheader="September 14, 2016"
            />
            <CardMedia
                component="img"
                height="194"
                image={image}
                alt="Paella dish"
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    <b>{user}: </b>{description}
                </Typography>
            </CardContent>
        </Card></div>
    )
}

export default BlogCard