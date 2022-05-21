import Blog from '../model/Blog';

export const getBlogs = async (req, res, next) => {
    let blogs;

    try {
        blogs = await Blog.find();
    } catch (error) {
        return console.log(error);
    }

    if (!blogs) {
        return res.status(404).json({ message: "Nie znaleziono żadnych blogów" });
    }

    return res.status(200).json({ blogs });
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
        return console.log(error);
    }

    return res.status(200).json({ newBlog });
}

export const updateBlog = async (req, res, next) => {
    const updatedBlogId = req.params.id;
    const { title, description } = req.body;
    let updatedBlog;

    try {
        updatedBlog = await Blog.findByIdAndUpdate(updatedBlogId, {
            title,
            description
        })
    } catch (error) {
        return console.log(error)
    }

    if (!updatedBlog) {
        return res.status(500).json({ message: "Niespodziewany błąd serwera!" })
    }

    return res.status(200).json({ updatedBlog })

}