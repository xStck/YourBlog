const mongoose = require('mongoose');
const Blog = require("../model/Blog");
const User = require("../model/User");

const getBlogs = async (req, res) => {
    let blogs;

    try {
        blogs = await Blog.find().populate("user");
    } catch (error) {
        return console.log(error);
    }

    if (!blogs) {
        return res.status(404).json({ message: "Nie znaleziono żadnych blogów" });
    }

    return res.status(200).json({ blogs });
}

const addNewBlog = async (req, res) => {
    const { title, description, image, user } = req.body;
    let registeredUser;

    try {
        registeredUser = await User.findById(user);
    } catch (error) {
        return console.log(error);
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
        console.log(error);
        return res.session(500).json({ message: "Nieoczekiwany błąd serwera w trakcie dodawania bloga" })
    }

    return res.status(200).json({ newBlog });
}

const updateBlog = async (req, res) => {
    const updatedBlogId = req.params.id;
    const { title, description } = req.body;
    let updatedBlog;

    try {
        updatedBlog = await Blog.findByIdAndUpdate(updatedBlogId, {
            title,
            description
        });
    } catch (error) {
        return console.log(error);
    }

    if (!updatedBlog) {
        return res.status(500).json({ message: "Niespodziewany błąd serwera w trakcie wykonywania update bloga!" });
    }

    return res.status(200).json({ updatedBlog });
}

const getBlogDetailsById = async (req, res) => {
    const blogId = req.params.id;
    let blog;

    try {
        blog = await Blog.findById(blogId);
    } catch (error) {
        return console.log(error);
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
        return console.log(error);
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
        return console.log(error);
    }

    if (!deletedBlog) {
        return res.status(500).json({ message: "Niespodziewany błąd serwera w trakcie usuwania bloga!" });
    }

    return res.status(200).json({ message: "Poprawnie usunięto blog o id: " + id });
}

exports.getBlogs = getBlogs;
exports.addNewBlog = addNewBlog;
exports.updateBlog = updateBlog;
exports.getBlogDetailsById = getBlogDetailsById;
exports.getUserBlogs = getUserBlogs;
exports.deleteBlog = deleteBlog;
