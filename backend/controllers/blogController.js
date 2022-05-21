import Blog from '../model/Blog';

export const getBlogs = async (req, res, next) => {
    let blogs;

    try {
        blogs = await Blog.find();
    } catch (error) {
        return console.log(error);
    }

    if (!blogs) {
        return res.status(404).json({ message: "Nie znaleziono żadnych blogów" })
    }

    return res.status(200).json({ blogs })
}

export const addNewBlog = async (req, res, next) => {
    const { title, description, image, user } = req.body;

    const newBlog = new Blog({
        title,
        description,
        image,
        user
    });

    try {
        await newBlog.save();
    } catch (error) {
        return console.log(error)
    }

    return res.status(200).json({ newBlog })
}