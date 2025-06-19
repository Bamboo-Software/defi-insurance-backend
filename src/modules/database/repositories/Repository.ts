import {
  FilterQuery,
  Model,
  QueryOptions,
  SaveOptions,
  UpdateQuery,
  UpdateWithAggregationPipeline,
  ProjectionType,
  MongooseBulkWriteOptions,
  AnyBulkWriteOperation,
  InsertManyOptions,
  PipelineStage,
  AggregateOptions,
  MongooseBaseQueryOptions,
} from 'mongoose';
import { Document, ObjectId } from 'mongoose';

export type UpdateResult = {
  matchedCount: number;
  modifiedCount: number;
  acknowledged: boolean;
  upsertedCount: number;
  upsertedId: unknown | ObjectId;
};

export type DeleteResult = {
  deletedCount: number;
  acknowledged?: boolean;
  deleted?: boolean;
};

export type CountOptions = {
  /** The number of documents to skip. */
  skip?: number;
  /** The maximum amounts to count before aborting. */
  limit?: number;
  /** Number of milliseconds to wait before aborting the query. */
  maxTimeMS?: number;
  /** An index name hint for the query. */
  hint?: string | Document;
};

export class Repository<T extends Document> {
  constructor(private readonly _model: Model<T>) {}

  async create(doc: Partial<T>, saveOptions?: SaveOptions): Promise<T | null> {
    const createdModel = new this._model(doc);
    const savedResult = await createdModel.save(saveOptions);
    return savedResult;
  }

  async createMany(
    docs: Partial<T>[],
    saveOptions?: SaveOptions,
  ): Promise<T[]> {
    return this._model.create(docs, saveOptions);
  }

  async insertMany(docs: Partial<T>[], options?: InsertManyOptions) {
    return this._model.insertMany(docs, options);
  }

  async find(
    filter?: FilterQuery<T>,
    projection?: ProjectionType<T> | null,
    options?: QueryOptions<T> | null | undefined,
  ): Promise<T[]> {
    return this._model.find(filter, projection, options);
  }

  async findOne(
    filter?: FilterQuery<T>,
    projection?: ProjectionType<T> | null,
    options?: QueryOptions & { cacheKey?: string; cacheTTL?: number },
  ): Promise<T | null> {
    return this._model.findOne(filter, projection, options);
  }

  async findById(
    id: string | ObjectId,
    projection?: ProjectionType<T> | null,
    options?: QueryOptions & { cacheKey?: boolean | string; cacheTTL?: number },
  ): Promise<T | null> {
    return this._model.findById(id, projection, options);
  }

  async findAndCount(
    filter?: FilterQuery<T>,
    projection?: ProjectionType<T> | null,
    options?: QueryOptions<T> | null | undefined,
  ): Promise<{ total: number; items: T[] }> {
    const [total, items] = await Promise.all([
      this._model.countDocuments(filter),
      this._model.find(filter, projection, options),
    ]);
    return { total, items };
  }

  async countDocuments(
    filter?: FilterQuery<T>,
    options?: (CountOptions & MongooseBaseQueryOptions<T>) | null,
  ): Promise<number> {
    return this._model.countDocuments(filter, options);
  }

  async updateOne(
    filter: FilterQuery<T>,
    updated: UpdateWithAggregationPipeline | UpdateQuery<T>,
    options?: QueryOptions<T> | null,
  ): Promise<UpdateResult> {
    return await this._model.updateOne(filter, updated, options as unknown);
  }

  async findOneAndUpdate(
    filter: FilterQuery<T>,
    updated: UpdateQuery<T>,
    options?: QueryOptions<T> | null,
  ): Promise<T | null> {
    return await this._model.findOneAndUpdate(filter, updated, options);
  }

  async findByIdAndUpdate(
    id: string | ObjectId,
    updated: UpdateQuery<T>,
    options?: QueryOptions<T> | null,
  ): Promise<T | null> {
    return await this._model.findByIdAndUpdate(id, updated, options);
  }

  async updateMany(
    filter: FilterQuery<T>,
    updated: UpdateWithAggregationPipeline | UpdateQuery<T>,
    options?: QueryOptions<T> | null,
  ): Promise<UpdateResult> {
    return await this._model.updateMany(filter, updated, options as unknown);
  }

  async deleteOne(
    filter: FilterQuery<T>,
    options?: QueryOptions<T>,
  ): Promise<DeleteResult> {
    const { deletedCount, acknowledged } = await this._model.deleteOne(
      filter,
      options as unknown,
    );
    return { deletedCount, acknowledged, deleted: !!deletedCount };
  }

  async deleteMany(
    filter: FilterQuery<T>,
    options?: QueryOptions<T>,
  ): Promise<DeleteResult> {
    const { deletedCount, acknowledged } = await this._model.deleteMany(
      filter,
      options as unknown,
    );
    return { deletedCount, acknowledged, deleted: !!deletedCount };
  }

  async softDelete(
    filter: FilterQuery<T>,
    options?: QueryOptions<T>,
  ): Promise<boolean> {
    const result = await this._model.updateOne(
      filter,
      { deletedAt: new Date() },
      options as unknown,
    );
    return result.modifiedCount > 0;
  }

  async exists(filter: FilterQuery<T>): Promise<boolean> {
    const result = await this._model.exists(filter);
    return !!result;
  }

  bulkWrite(
    writes: Array<AnyBulkWriteOperation<T>>,
    options?: MongooseBulkWriteOptions & { ordered: false },
  ) {
    return this._model.bulkWrite(writes as any, options);
  }

  aggregate<T = any>(
    piplines: PipelineStage[],
    options?: AggregateOptions,
  ): Promise<T[]> {
    return this._model.aggregate(piplines, options);
  }

  async findOneOrCreate(
    filter: FilterQuery<T>,
    doc: Partial<T>,
    options?: QueryOptions<T> & { saveOptions?: SaveOptions },
  ): Promise<T> {
    const existingDoc = await this._model.findOne(filter, null, options);
    if (existingDoc) return existingDoc;

    const createdDoc = new this._model(doc);
    return createdDoc.save(options?.saveOptions);
  }
}
