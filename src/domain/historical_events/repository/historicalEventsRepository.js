import eventosJSON from '../../../../dataset/historical_data.json'

exports.getHistoricalEvents = (ocurrence) => {
    let filtered_events = []
    if(ocurrence.lenght == 2){
        
        if( Number(ocurrence) == NaN){
            if (ocurrence == 'ac'){
                filtered_events = eventosJSON.result.events.filter((evn) => evn.date < 0)
            } else if(ocurrence =='dc'){
                filtered_events = eventosJSON.result.events.filter((evn) => evn.date > 0)
            }
        } else {
            const error = Error("Solo se aceptan caracteres no numéricos")
            error.status = 400
            throw error
        }

    }else {
        const error = Error("El input debe ser ac o dc")
        error.status = 400
        throw error
    }
    return filtered_events
}