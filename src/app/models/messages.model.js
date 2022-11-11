import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const { ObjectId } = mongoose.Schema.Types

const MessagesSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true,
    },
    channelId: {
        type: ObjectId,
        required: true,
        ref: 'channels',
    },
    userId: {
        type: ObjectId,
        required: true,
        ref: 'users',
    },
    createdAt: { type: Date, default: new Date() },
    updatedAt: { type: Date, default: new Date() },
}, 
{
    versionKey: false,
    minimize: false,
    strict: true,
});

MessagesSchema.index({ channelId: 1 });
MessagesSchema.plugin(mongoosePaginate);

export default MessagesSchema;
