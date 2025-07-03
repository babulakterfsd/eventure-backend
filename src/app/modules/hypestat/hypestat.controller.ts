import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { hypeStatServices } from './hypestat.service';

//create data
const createData = catchAsync(async (req, res) => {
  const result = await hypeStatServices.saveDataInDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Data has been saved succesfully',
    data: result,
  });
});

export const HypeStatControllers = {
  createData,
};
