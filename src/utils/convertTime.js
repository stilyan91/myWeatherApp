const targetTimeZone = "Europe/Sofia";

const formatDate = (localTime) => {
    const localObservationDateTime = new Date(localTime)
    const dateFormatter = new Intl.DateTimeFormat("en-US", {
        timeZone: targetTimeZone,
        year: 'numeric',
        month: 'short',
        day: '2-digit'
    });
    return dateFormatter.format(localObservationDateTime);
}

export default formatDate;