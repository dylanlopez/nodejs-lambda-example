import * as dotenv from 'dotenv';
import * as https from 'https';
import { PlanetResponse } from './models/PlanetResponse';
import { Planet } from './models/Planet';

dotenv.config();

export const validateEmpty = (event: any): boolean => {
  if (event == "undefined" || 
      event == null) {
        return true;
  }
  if (event.length == 0) {
    return true;
  }
  return false;
}

export default async (event: any): Promise<PlanetResponse> => {
  console.log('Start Process');
  if (validateEmpty(event)) {
    throw new Error("No se envió ningún request");
  }
  try{
    const response = new PlanetResponse();
    https.get('https://swapi.py4e.com/api/planets/', (res) => {
      if (res.statusCode != 200){
        res.resume();
        return;
      }

      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('close', () => {
        // console.log(JSON.parse(data));
        let results = JSON.parse(data);
        response.count = results.count;
        response.next = results.next;
        response.previous = results.previous;
        results.results.forEach(function(planet) {
          console.log(planet);
          let planeta = new Planet();
          planeta.nombre = planet.name;
          planeta.periodo_rotacion = planet.rotation_period;
          planeta.periodo_orbital = planet.orbital_period;
          planeta.diametro = planet.diameter;
          planeta.clima = planet.climate;
          planeta.gravedad = planet.gravity;
          planeta.tierra = planet.terrain;
          planeta.superficie_agua = planet.surface_water;
          planeta.poblacion = planet.population;
          planeta.residentes = planet.residents;
          planeta.peliculas = planet.films; 
          planeta.creacion = planet.created;
          planeta.edicion = planet.edited;
          planeta.url = planet.url;
          response.results.push(planeta);
        }, this);
        // console.log(response);
      });
    });
    return response;
  } catch (error) {
    console.error('Error in main:', error.message);
    throw error;
  }
}