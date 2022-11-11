import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const { ObjectId } = mongoose.Schema.Types

const ChannelsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    users: [{
        type: ObjectId,
        ref: 'users',
        default: [],
    }],
    createdAt: { type: Date, default: new Date() },
    updatedAt: { type: Date, default: new Date() },
}, 
{
    versionKey: false,
    minimize: false,
    strict: true,
});

ChannelsSchema.index({ name: 1 });
ChannelsSchema.plugin(mongoosePaginate);

export default ChannelsSchema;
