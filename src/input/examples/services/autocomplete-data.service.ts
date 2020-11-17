import { Injectable } from '@angular/core';
import { IDataAutocomplete } from 'src/autocomplete/models/data-autocomplete';

@Injectable()
export class AutoCompleteDataService {

  getDataFromAPI(): IDataAutocomplete {

    return {
      getData(inputValue: string): Promise<Array<string>> {
        return new Promise((resolve, reject) => {

          setTimeout(() => {
            const autocompleteOptions =
              ['Mike', 'Matt', 'Nancy', 'Adam', 'Jenny', 'Nancy', 'Carl', 'Nancy11', 'Carl11', 'Nancy22', 'Carl22']
                .filter(option => option.toUpperCase().indexOf(inputValue.toUpperCase()) === 0)
                .sort();
            resolve(autocompleteOptions);
          }, 2000);

        });
      }
    }


  }


}
