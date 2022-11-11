import { deepParseJson } from 'deep-parse-json';

import models from '../models/index.js';
import config from '../../../config/index.js';

const { search } = config;

class ChannelsService {
    constructor(db) {
        this.Model = db.model('channels', models.ChannelsModel);
    }

    async search({
        select,
        populate,
        page,
        limit,
        sortField,
        sortDirection,
        querySearch,
        queryParams,
    }) {
        const options = {
            select: select || '',
            populate: populate || ['users'],
            page: page || search.pageOptions.page,
            limit: limit || search.pageOptions.limit,
            sort: sortField
                ? { [sortField]: sortDirection || search.pageOptions.sort.key }
                : search.pageOptions.sort,
        };
        const queryObject = querySearch
            ? deepParseJson(querySearch)
            : deepParseJson(queryParams);

        return this.Model.paginate({ ...queryObject }, options);
    }

    async get(id) {
        const obtained = await this.Model.findOne({ _id: id })
        .populate(['users']);

        return obtained;
    }

    async getByUser(id) {
        const obtained = await this.Model.findOne({ users : id})
        .populate(['users']);

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

export default ChannelsService;