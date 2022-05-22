import { Avatar, Card, CardContent, CardHeader, CardMedia, Typography } from '@mui/material'
import { red } from '@mui/material/colors'
import React from 'react'

const BlogCard = ({ title, description, image, user }) => {
    return (
        <div> <Card sx={{ margin: "auto", mt: 2, width: "50%", boxShadow: "5px 5px 10px #000" }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        {user}
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
                    {description}
                </Typography>
            </CardContent>
        </Card></div>
    )
}

export default BlogCard