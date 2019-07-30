export default function dateFormatter(){
    return {
        toString: function toString(date){
            return date
            .toISOString()
            .replace(/T/, ' ')
            .replace(/\..+/, '');
        }
    };
}