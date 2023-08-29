import express from "express";
import {
  createGroup,
  createPost,
  getGroups,
  getMostActiveGroups,
  getPosts,
} from "./controllers";

const router = express.Router();

router.get("/posts", getPosts);
router.post("/posts", createPost);

router.get("/groups", getGroups);
router.get("/groups/most-active", getMostActiveGroups);
router.post("/groups", createGroup);

export default router;
