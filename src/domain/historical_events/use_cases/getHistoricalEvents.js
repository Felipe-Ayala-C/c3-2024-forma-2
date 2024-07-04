import historicalEventsRepository from '../repository/historicalEventsRepository'

exports.getHistoricalEventsByOcurrence = (ctx) => {
    ctx.body = historicalEventsRepository.getHistoricalEvents(ctx.params.ocurrence)
    

    return ctx
}