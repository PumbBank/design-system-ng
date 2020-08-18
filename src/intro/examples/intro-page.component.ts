import { Component } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'mill-intro-overview',
  templateUrl: './intro-page.component.html',
  styleUrls: ['./intro-page.component.scss']
})

export class IntroGuidelineComponent {
  private static parseGroups(lines: string[]): {title: string, content: string}[] {
    const isTitle = (text) => {return text.indexOf('####') > -1};
    let result = [];
    for (let i = 0; i < lines.length; i++) {
      if (isTitle(lines[i])) {
        const title = lines[i];
        let lineContent = [];
        for (let j = i; j < lines.length; j++) {
          const nextLine = lines[++j];
          if (isTitle(nextLine)) {
            break;
          }
          lineContent.push(nextLine);
        }
        result.push({title, content: lineContent.join('\n')});
      }
    }

    return result.map(m => {
      return {
        title: m.title.replace(/#/g, ''),
        content: m.content
      };
    });
  }

  public whatsNew: {title: string, content: string}[];

  constructor(private _http: HttpClient) {
    this._http.get('/CHANGELOG.md', {responseType: 'text'}).toPromise().then((response: string) => {
      const lines = response.split(/\r\n|\r|\n/g).filter(f => f);
      this.whatsNew = IntroGuidelineComponent.parseGroups(lines);
    }).catch(console.error);
  }
}
