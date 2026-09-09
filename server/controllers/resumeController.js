const User = require("../models/User");
const fs = require("fs");
const path = require("path");

// Upload Resume
const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "Please upload a resume",
      });
    }

    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Delete previous resume file
    if (user.resume?.filename) {
      const oldFilePath = path.join(
        __dirname,
        "../uploads",
        user.resume.filename
      );

      if (fs.existsSync(oldFilePath)) {
        fs.unlinkSync(oldFilePath);
      }
    }

    // Save new resume information
    user.resume = {
      filename: req.file.filename,
      originalName: req.file.originalname,
      path: `/uploads/${req.file.filename}`,
    };

    await user.save();

    res.status(201).json({
      message: "Resume uploaded successfully",
      resume: user.resume,
    });
  } catch (error) {
    res.status(500).json({
      message: "Resume upload failed",
      error: error.message,
    });
  }
};

// Get Resume
const getResume = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json({
      resume: user.resume || null,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch resume",
      error: error.message,
    });
  }
};

// Delete Resume
const deleteResume = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (!user.resume) {
      return res.status(404).json({
        message: "No resume found",
      });
    }

    const filePath = path.join(
      __dirname,
      "../uploads",
      user.resume.filename
    );

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    user.resume = undefined;

    await user.save();

    res.json({
      message: "Resume deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Resume deletion failed",
      error: error.message,
    });
  }
};

module.exports = {
  uploadResume,
  getResume,
  deleteResume,
};