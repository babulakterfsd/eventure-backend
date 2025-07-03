import { Schema, model } from 'mongoose';
import { TScrappedData } from './hypestat.interface';

const scrappedDataSchema = new Schema<TScrappedData>(
  {
    domain: {
      type: String,
      required: true,
      trim: true,
    },
    info: [
      {
        source: {
          type: String,
          required: true,
          trim: true,
        },
        percentage: {
          type: Number,
          required: true,
          min: 0,
          max: 100,
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

export const ScrappedModel = model<TScrappedData>(
  'scrappedData',
  scrappedDataSchema,
);
