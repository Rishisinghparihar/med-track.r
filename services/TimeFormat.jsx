import moment from "moment";

export const FormateDate=(timestamp)=>{
    return moment(timestamp).format('DD/MM/YYYY');
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

