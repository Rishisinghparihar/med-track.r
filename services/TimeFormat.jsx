import moment from "moment";

export const FormateDate=(timestamp)=>{
    return new Date(timestamp).setHours(0,0,0,0)
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