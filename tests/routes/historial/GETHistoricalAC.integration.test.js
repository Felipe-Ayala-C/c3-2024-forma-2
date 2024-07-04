import { app, server } from "../../../src/index.js";
import request from "supertest";
import sinon from "sinon";

import getHistoricalEvents from "../../../src/domain/historical_events/repository/historicalEventsRepository.js"
import eventosJSON from '../../../dataset/historical_data.json'
 

describe("GET /history/:ocurrence)", () => {

    beforeEach(() => {
        sinon.restore();
    });

    afterAll(() => {
        server.close()  
    })

    test("Se espera obtener datos historicos AC si :ocurrence = ac", async () => {
        sinon.stub(getHistoricalEvents, 'getHistoricalEvents').returns(eventosJSON.result.events.filter((evn) => evn.date < 0));
        const response = await request(app.callback()).get('/api/history/:ac');
        expect(response.status).toBe(200);
        expect(response.body).toEqual(eventosJSON.result.events.filter((evn) => evn.date < 0));

    });

    test("Se espera obtener datos historicos DC si :ocurrence = dc", async () => {
        sinon.stub(getHistoricalEvents, 'getHistoricalEvents').returns(eventosJSON.result.events.filter((evn) => evn.date > 0));
        const response = await request(app.callback()).get('/api/history/:dc');
        expect(response.status).toBe(200);
        expect(response.body).toEqual(eventosJSON.result.events.filter((evn) => evn.date > 0));
        
    });

    test("Se espera NO obtener datos historicos si :ocurrence = '12", async () => {
        sinon.stub(getHistoricalEvents, 'getHistoricalEvents').returns(new Error("Solo se aceptan caracteres no numéricos"));
        const response = await request(app.callback()).get('/api/history/:12');
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ error: "Solo se aceptan caracteres no numéricos" });
        
    });    

    test("Se espera NO obtener datos historicos si :ocurrence = 'adcsc", async () => {
        sinon.stub(getHistoricalEvents, 'getHistoricalEvents').returns(new Error("El input debe ser ac o dc"));
        const response = await request(app.callback()).get('/api/history/:adcsc');
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ error: "El input debe ser ac o dc" });
        
    });  


    // No logro hacer que me funcione, intente editar getHistoricalEvents.js pero al editarlo me generaba error en los 2 primeros test

})
