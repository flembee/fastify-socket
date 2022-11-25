import models from '../models/index.js';
class MessagesService {
    constructor(db) {
        this.Model = db.model('messages', models.MessagesModel);
    }

    async getByChannel(id) {
        const obtained = await this.Model.find({ channelId : id})
        .populate(['channelId','userId']);

        return obtained;
    }

    async add(data) {
        const object = await this.Model.create(data);

        return object;
    }

    async delete(nodeData) {
        let deleted = false;

        const result = await this.Model.deleteMany({ _id: nodeData }).lean();
        deleted = { ids: nodeData, deleted: result.n > 0 };

        return deleted;
    }
}

export default MessagesService;