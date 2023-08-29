import { Request, Response } from "express";
import Post from "./models/Post";
import Group from "./models/Group";

export const getPosts = async (_: Request, res: Response) => {
  try {
    const posts = await Post.find();

    return res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const createPost = async (req: Request, res: Response) => {
  try {
    const { content, groupId } = req.body;
    const newPost = new Post({ content, groupId });

    await newPost.save();

    return res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const createGroup = async (req: Request, res: Response) => {
  try {
    const { groupName } = req.body;
    console.log(groupName);
    const newGroup = new Group({ groupName });

    await newGroup.save();

    return res.status(201).json(newGroup);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

// Get all the groups
export const getGroups = async (_: Request, res: Response) => {
  try {
    const groups = await Group.find();

    return res.status(201).json(groups);
  } catch (err) {
    res.status(404).json({ error: err });
  }
};

// Gets top 10 most active groups. i.e groups with most posts
export const getMostActiveGroups = async (_: Request, res: Response) => {
  try {
    const groups = await Group.aggregate([
      {
        $lookup: {
          from: "posts",
          localField: "_id",
          foreignField: "groupId",
          as: "posts",
        },
      },
      {
        $project: {
          _id: 0,
          groupName: 1,
          postCount: { $size: "$posts" },
        },
      },
      { $sort: { postCount: -1 } },
      { $limit: 10 },
    ]);
    return res.status(200).json(groups);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
