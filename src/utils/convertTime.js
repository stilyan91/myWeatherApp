const targetTimeZone = "Europe/Sofia";

const formatDate = (localTime) => {
    const localObservationDateTime = new Date(localTime)
    const dateFormatter = new Intl.DateTimeFormat("en-US", { timeZone: targetTimeZone });
    return dateFormatter.format(localObservationDateTime);
}

export default formatDate;