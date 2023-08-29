import { Schema, model, Types } from "mongoose";

export interface IPost {
    groupId: Types.ObjectId;
    content: string;
}

const postSchema = new Schema<IPost>(
    {
        groupId: {
            type: Schema.Types.ObjectId,
            ref: "Group",
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Post = model<IPost>("Post", postSchema);

export default Post;
