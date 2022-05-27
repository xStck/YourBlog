const mongoose = require('mongoose');
const Blog = require("../model/Blog");
const User = require("../model/User");
const Joi = require("joi")

const blogAddValidate = (data) => {
    const schema = Joi.object({
        title: Joi.string().required().label("Title"),
        description: Joi.string().required().label("Description"),
        image: Joi.string().optional().allow('').label("Image"),
        user: Joi.string().required().label("User"),
    })
    return schema.validate(data)
}

const blogUpdateValidate = (data) => {
    const schema = Joi.object({
        title: Joi.string().required().label("Title"),
        description: Joi.string().required().label("Description"),
    })
    return schema.validate(data)
}

const getBlogs = async (req, res) => {
    let blogs;

    try {
        blogs = await Blog.find().populate("user");
    } catch (error) {
        return res.session(500).json({ message: "Wewnętrzny błąd serwera." })
    }

    if (!blogs) {
        return res.status(404).json({ message: "Nie znaleziono żadnych blogów" });
    }

    return res.status(200).json({ blogs });
}

const addNewBlog = async (req, res) => {
    const { error } = blogAddValidate(req.body)
    if (error)
        return res.status(400).send({ message: error.details[0].message })

    const { title, description, image, user } = req.body;
    let registeredUser;

    try {
        registeredUser = await User.findById(user);
    } catch (error) {
        return res.session(500).json({ message: "Wewnętrzny błąd serwera." })
    }

    if (!registeredUser) {
        return res.status(400).json({ message: "Nie znaleziono użytkownika o podanym id" });
    }

    const newBlog = new Blog({
        title,
        description,
        image,
        user
    });

    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await newBlog.save({ session });
        registeredUser.userBlogs.push(newBlog);
        await registeredUser.save({ session });
        await session.commitTransaction();
    } catch (error) {
        return res.session(500).json({ message: "Wewnętrzny błąd serwera." })
    }

    return res.status(200).json({ newBlog });
}

const updateBlog = async (req, res) => {
    const { error } = blogUpdateValidate(req.body)
    if (error)
        return res.status(400).send({ message: error.details[0].message })
    const updatedBlogId = req.params.id;
    const { title, description } = req.body;
    let updatedBlog;

    try {
        updatedBlog = await Blog.findByIdAndUpdate(updatedBlogId, {
            title,
            description
        });
    } catch (error) {
        return res.session(500).json({ message: "Wewnętrzny błąd serwera." })
    }

    if (!updatedBlog) {
        return res.status(409).json({ message: "Nie udało się zaktualizować bloga." });
    }

    return res.status(200).json({ updatedBlog });
}

const getBlogDetailsById = async (req, res) => {
    const blogId = req.params.id;
    let blog;

    try {
        blog = await Blog.findById(blogId);
    } catch (error) {
        return res.session(500).json({ message: "Wewnętrzny błąd serwera." })
    }

    if (!blog) {
        return res.status(404).json({ message: "Nie znaleziono bloga o podanym id" });
    }

    return res.status(200).json({ blog });
}

const getUserBlogs = async (req, res) => {
    const userId = req.params.id;
    let specificUserBlogs;

    try {
        specificUserBlogs = await User.findById(userId).populate("userBlogs");
    } catch (error) {
        return res.session(500).json({ message: "Wewnętrzny błąd serwera." })
    }

    if (!specificUserBlogs) {
        return res.status(404).json({ message: "Nie znaleziono blogów użytkownika o id " + userId });
    }

    return res.status(200).json({ userAndHisBlogs: specificUserBlogs });
}

const deleteBlog = async (req, res) => {
    const id = req.params.id;
    let deletedBlog;

    try {
        deletedBlog = await Blog.findByIdAndRemove(id).populate('user');
        await deletedBlog.user.userBlogs.pull(deletedBlog);
        await deletedBlog.user.save();
    } catch (error) {
        return res.session(500).json({ message: "Wewnętrzny błąd serwera." })
    }

    if (!deletedBlog) {
        return res.status(409).json({ message: "Nie udało się usunąć bloga." });
    }

    return res.status(200).json({ message: "Poprawnie usunięto bloga" });
}

exports.getBlogs = getBlogs;
exports.addNewBlog = addNewBlog;
exports.updateBlog = updateBlog;
exports.getBlogDetailsById = getBlogDetailsById;
exports.getUserBlogs = getUserBlogs;
exports.deleteBlog = deleteBlog;
