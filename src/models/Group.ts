import { Schema, model } from "mongoose";

export interface IGroup {
    groupName: string;
}

const groupSchema = new Schema<IGroup>({
    groupName: {
        required: true,
        type: String,
    },
});

const Group = model<IGroup>("Group", groupSchema);
export default Group;
