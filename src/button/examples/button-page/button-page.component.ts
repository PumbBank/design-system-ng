import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button-overview',
  templateUrl: './button-page.component.html',
  styleUrls: ['./button-page.component.scss']
})

export class ButtonOverview {
  @Input() label;
  icon = 'home';
  types = [
    {
      type: 'filled',
      title: 'З заливкою',
      subtitle: 'Filled button',
      description: 'Високий пріоритет. Веде на цільову сторінку або дозволяє зробити цільове дію, наприклад, зареєструватися або підтвердити транзакцію.'
    },
    {
      type: 'ghost',
      title: 'З обведенням',
      subtitle: 'Ghost button',
      description: 'Середній пріоритет. Веде на альтернативну цільової страніце або дозволяє зробити вторинне дію, наприклад, прочитати умови кредитування або надрукувати договір.'
    }, {
      type: 'hidden',
      title: 'Без обведення',
      subtitle: 'Hidden button',
      description: 'Низький пріоритет. Використовуєтьсядля самих фонових дій: скасування операції, перегляд звіту дзвінка і т.п.'
    }
  ];
}
