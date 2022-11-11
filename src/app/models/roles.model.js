import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const RolesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        enum: ['Admin', 'Manager', 'User']
    },
    createdAt: { type: Date, default: new Date() },
    updatedAt: { type: Date, default: new Date() },
}, 
{
    versionKey: false,
    minimize: false,
    strict: true,
});

RolesSchema.index({ name: 1 });
RolesSchema.plugin(mongoosePaginate);

export default RolesSchema;
