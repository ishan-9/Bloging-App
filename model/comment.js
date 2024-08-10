import { Schema, model } from "mongoose";

const commnetSchema = new Schema({
    content:{
        type : String,
        required : true
    },
    blogId : {
        type : Schema.Types.ObjectId,
        ref : 'blog'
    },
    createdBy : {
        type : Schema.Types.ObjectId,
        ref : 'user'
    }
},
{ timestamps : true}
)

const Comment = model('comment', commnetSchema); 

export default Comment;