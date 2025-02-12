//@ts-nocheck
import { FileTypes } from '../Data/Enums/FileTypes.js';

export class BrowserDownload{

    static Download(data: object, fileType: FileTypes){
            

            const  csv = 'data:text/json;charset=utf-8,' + JSON.stringify(data);
      
            const filename = BrowserDownload.SetFileName('export', fileType)

            data = encodeURI(csv);
    
            const link = document.createElement('a');
            link.setAttribute('href', data);
            link.setAttribute('download', filename);
            link.click();
    }
    private static SetFileName(filename: string){

        return filename  + '.csv'
    }

}