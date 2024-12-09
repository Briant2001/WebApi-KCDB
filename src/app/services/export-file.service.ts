import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

@Injectable({providedIn: 'root'})
export class ExportInXlsxService {
  private _worbook?:XLSX.WorkBook;

  constructor() { }
  convertToCSV(objArray: any[],title: string): string {
    const header = Object.keys(objArray[0]);
    const csv = [
      title,
      header.join(','), // header row
      ...objArray.map(row => header.map(fieldName => JSON.stringify(row[fieldName], (key, value) => value === null ? '' : value)).join(','))
    ].join('\r\n');
    return csv;
  }

  downloadCSV(objArray: any[], filename: string, title: string): void {
    const csvData = this.convertToCSV(objArray,title);
    const bom = "\uFEFF";

    const blob = new Blob([bom + csvData], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, filename);
  }

  exportToExcel(objArray: any[], filename: string, title: string): void {
    // Crear una hoja de trabajo vacía
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet([[]]);

    // Agregar el título en la primera fila
    XLSX.utils.sheet_add_aoa(ws, [[title]], { origin: 'A1' });

    // Agregar los encabezados en la segunda fila
    const headers = Object.keys(objArray[0]);
    XLSX.utils.sheet_add_aoa(ws, [headers], { origin: 'A2' });

    // Agregar los datos en la tercera fila
    XLSX.utils.sheet_add_json(ws, objArray, { header: headers, skipHeader: true, origin: 'A3' });

    // Aplicar estilos: centrar y aumentar el tamaño de la fuente
    const cellStyle = {
        alignment: {
            horizontal: "center",
            vertical: "center"
        },
        font: {
            sz: 14, // Tamaño de fuente
            bold: true
        }
    };

    // Aplicar estilos a todas las celdas, incluyendo título y datos
    for (let R = 0; R <= objArray.length + 1; R++) { // +1 para incluir título y encabezado
        for (let C = 0; C < headers.length; C++) {
            const cellRef = XLSX.utils.encode_cell({ r: R, c: C });
            if (!ws[cellRef]) continue;
            ws[cellRef].s = cellStyle;
        }
    }

    // Crear un libro de trabajo
    const wb: XLSX.WorkBook = XLSX.utils.book_new();

    // Agregar la hoja de trabajo al libro
    XLSX.utils.book_append_sheet(wb, ws, 'Datos');

    // Guardar el libro como archivo Excel
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([wbout], { type: 'application/octet-stream' });
    saveAs(blob, filename);
}

 dow(){

 }

}
