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
    const start = moment(startDate, 'DD/MM/YYYY');
    const end = moment(endDate, 'DD/MM/YYYY');
    const datesRange = [];
    let currentDate = startDate;
    while(start.isSameOrBefore (end)){
        datesRange.push(currentDate);
        start.add(1,'days');
    }
    return datesRange;
}

export const getDateRangeToDisplay=()=>{
    
}
