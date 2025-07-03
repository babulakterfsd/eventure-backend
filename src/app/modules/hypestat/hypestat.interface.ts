/* eslint-disable no-unused-vars */

export type TScrappedData = {
  _id: string;
  domain: string;
  info: {
    source: string;
    percentage: number;
  }[];
};
