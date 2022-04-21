import { Serie } from './serie.js';
import { datosSeries } from './data.js';

const identSeries: HTMLElement[] = [];

let seriesBody: HTMLElement = document.getElementById("programas")!;
let PromedioSeasons: HTMLElement = document.getElementById('seasons-average')!;
let detailPop: HTMLElement = document.getElementById('detalles')!;


CargaSeriesEnTabla(datosSeries);
PromedioSeasons.innerHTML = `Seasons average: ${TotalAvgSeasons(datosSeries)}`

desplegarDetalles(identSeries[0].children[1].textContent!,datosSeries)

identSeries.forEach(elemento => {
    elemento.onclick = () => desplegarDetalles(elemento.children[1].textContent!,datosSeries);
  })



function CargaSeriesEnTabla(series: Serie[]): void {
    console.log("Cargando información a la tabla");

    series.forEach((serie) => {
      let trElement = document.createElement("tr");
      trElement.innerHTML = `<td><b>${serie.index}</b></td>
                             <td><a href="${serie.imageURL}" target="_blank">${serie.nombre}</a></td>
                             <td>${serie.source}</td>
                             <td>${serie.seasons}</td>`;
                             
      identSeries.push(trElement)
      seriesBody.appendChild(trElement);


    });
  }
  PromedioSeasons.innerHTML = `Seasons average: ${TotalAvgSeasons(datosSeries)}`

  function TotalAvgSeasons(series: Serie[]): number {
    let avg: number = 0;
    let numSeries: number = 0;
    series.forEach(serie => {
      avg += serie.seasons;
      numSeries += 1;
    })
    return avg/numSeries;
  } 

  function desplegarDetalles(name: string, series: Serie[]) {
    let serie = name === '' ? datosSeries : series.filter( c => c.nombre.match(name));
    console.log(`<img class="card-img-top" src="${serie[0].imageURL}" alt="ERR.">`)
    detailPop.innerHTML = `<img class="card-img-top" src="${serie[0].imageURL}" alt="ERR.">
                              <div class="card-body">
                                <h5 class="card-title">${serie[0].nombre}</h5>
                                <p class="card-text">${serie[0].desc}</p>
                                <a href="${serie[0].serieURL}" target="_blank">${serie[0].serieURL}</a> 
                              </div>`;
  } 
