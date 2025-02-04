import moment from "moment";

export const FormateDate=(timestamp)=>{
    return new Date(timestamp)
}

export const FormateDateForText=(Date)=>{
    return moment(Date).format('ll')
}

export const FormateTime=(timestamp)=>{
    const date = new Date(timestamp);
    const timestring = date.toLocaleTimeString([],{
        hour:"2-digit",
        minute:"2-digit",
    })
    return timestring;
}

export const getDatesRange=(startDate,endDate)=>{
    const start = moment(new Date(startDate), 'DD/MM/YYYY');
    const end = moment(new Date(endDate), 'DD/MM/YYYY');
    const dates = [];
    while(start.isSameOrBefore(end)){
        dates.push(start.format('DD/MM/YYYY'));
        start.add(1,'days');
    }
    return dates;
}

export const getDateRangeToDisplay=()=>{
    const dateList= [];
    for(let i=0; i<=7; i++){
        dateList.push({
            date:moment().add(i,'days').format('DD'),
            day:moment().add(i,'days').format('ddd'),
            FormateDate:moment().add(i,'days').format('DD/MM/YYYY'),
        })
    }
    return dateList;
}


// // gpt bkl ka code
// import moment from "moment";

// /**
//  * Convert a timestamp to a JavaScript Date object.
//  * @param {number} timestamp - Timestamp value.
//  * @returns {Date} - JavaScript Date object.
//  */
// export const FormateDate = (timestamp) => new Date(timestamp);

// /**
//  * Format a date for display in a readable text format.
//  * @param {Date | string} date - JavaScript Date object or valid date string.
//  * @returns {string} - Formatted date (e.g., "Jan 2, 2024").
//  */
// export const FormateDateForText = (date) => moment(date).format("ll");

// /**
//  * Convert a timestamp to a formatted time string (hh:mm AM/PM).
//  * @param {number} timestamp - Timestamp value.
//  * @returns {string} - Formatted time string.
//  */
// export const FormateTime = (timestamp) => {
//   return new Date(timestamp).toLocaleTimeString([], {
//     hour: "2-digit",
//     minute: "2-digit",
//   });
// };

// /**
//  * Get an array of dates between a given start and end date.
//  * @param {string} startDate - Start date in "DD/MM/YYYY" format.
//  * @param {string} endDate - End date in "DD/MM/YYYY" format.
//  * @returns {string[]} - Array of date strings in "DD/MM/YYYY" format.
//  */
// export const getDatesRange = (startDate, endDate) => {
//   const start = moment(startDate, "DD/MM/YYYY");
//   const end = moment(endDate, "DD/MM/YYYY");
//   const datesRange = [];

//   while (start.isSameOrBefore(end)) {
//     datesRange.push(start.format("DD/MM/YYYY"));
//     start.add(1, "days");
//   }
  
//   return datesRange;
// };

// /**
//  * Generate a list of the next 7 days with formatted dates.
//  * @returns {Array} - Array of objects containing day, date, and formatted date.
//  */
// export const getDateRangeToDisplay = () => {
//   return Array.from({ length: 7 }, (_, i) => ({
//     date: moment().add(i, "days").format("DD"),
//     day: moment().add(i, "days").format("ddd"),
//     FormateDate: moment().add(i, "days").format("DD/MM"),
//   }));
// };
