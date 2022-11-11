import { deepParseJson } from 'deep-parse-json';

import models from '../models/index.js';
import config from '../../../config/index.js';
import utils from '../utils/index.js';

const { search } = config;
const { objectToDotNotation } = utils;

class RolesService {
    constructor(db) {
        this.Model = db.model('roles', models.RolesModel);
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
            populate: populate || [],
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
        const obtained = await this.Model.findOne({ _id: id });
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

    async update(id, data) {
        const updated = await this.Model.findOneAndUpdate(
            { _id: id },
            { $set: objectToDotNotation({ updatedAt: Date.now(), ...data }) },
            { new: true }
        ).catch((e) => {
            throw e;
        });

        return updated;
    }
}

export default RolesService;