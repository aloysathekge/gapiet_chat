import moment from "moment";
import { Dimensions } from "react-native";

export const {width:deviceWidth, height:deviceHeight}=Dimensions.get("window")

export const hp=(percentage:number)=>{
    return (percentage*deviceHeight)/100
}

export const wp=(percentage:number)=>{
    return (percentage*deviceWidth)/100
}


export const stripHtmlTags=(html:any)=>{
    return html.replace(/<[^>]*>?/gm,'')
}

export const formatTime= (timestamp: string | Date, detailed: boolean = false) => {
    const momentDate = moment(timestamp);
    
    if (detailed) {
        return momentDate.format("h:mm A · MMM D, YYYY");
    }
    
    const now = moment();
    const diffMinutes = now.diff(momentDate, 'minutes');
    const diffHours = now.diff(momentDate, 'hours');
    const diffDays = now.diff(momentDate, 'days');

    if (diffMinutes < 1) {
        return 'now';
    } else if (diffMinutes < 60) {
        return `${diffMinutes}m`;
    } else if (diffHours < 24) {
        return `${diffHours}h`;
    } else if (diffDays < 7) {
        return `${diffDays}d`;
    } else {
        return momentDate.format('MMM D');
    }
}
