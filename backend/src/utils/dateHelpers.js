const moment = require('moment');

exports.validateAndFormatDateRange = (start, end) => {
  if (!start || !end || !moment(start).isValid() || !moment(end).isValid()) {
    throw new Error('Invalid or missing date range.');
  }

  const startDate = moment(start).startOf('day');
  const endDate = moment(end).endOf('day');

  return { startDate, endDate };
};
