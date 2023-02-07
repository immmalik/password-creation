import { Component } from '@angular/core';
// import { SlButton, SlDropdown, SlMenu, SlMenuItem } from '@shoelace-style/shoelace/dist/react';

const feather = require('feather-icons')

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title = 'password creation';
  public name = 'example';
  public options = [
    {
      value: '1',
      formula: [
        {
          type: 'name',
          value: '2*',
          hint: '2 digits from last of name'
        },
        {
          type: 'input',
          value: 'AU',
          hint: 'character input'
        },
        {
          type: 'name',
          value: '*3',
          hint: '3 digits from first of name'
        },
        {
          type: 'input',
          value: '&3',
          hint: 'character input'
        }],
      label: '** (last 2 digit) + AU + *** (first 3 digit) + &3',
    },
    {
      value: '2',
      formula: [
        {
          type: 'name',
          value: '3*',
          hint: '3 digits from last of name'
        },
        {
          type: 'input',
          value: 'AF',
          hint: 'character input'
        },
        {
          type: 'name',
          value: '*2',
          hint: '2 digits from first of name'
        },
        {
          type: 'input',
          value: '/3',
          hint: 'character input'
        }],
      label: '*** (last 3 digit) + AF + ** (first 2 digit) + /3',
    }
  ];
  public formulaSelected: any = [];
  public isShowPassword = true;
  public resultPassword: any = '';
  public createStep = false;
  public rule: any;
  public totalDigit: any;
  public character: any;
  public ruleList = [
    {
      label: 'App / Domain Name',
      type: 'Name',
      sublabel: 'twitter.com'
    },
    {
      label: 'App / Domain Name Length',
      type: 'Length',
      sublabel: 'Domain Length'
    },
    {
      label: 'Input text, number or symbol',
      type: 'Input',
      sublabel: 'Text, number or symbol'
    }
  ];
  public inAction: any;
  ngOninit() {
  }

  chooseFormula(val: any) {
    this.formulaSelected = val;
    console.log(this.formulaSelected);
    setTimeout(() => {
      const textElement = document.querySelector('#text');
      if (textElement) {
        this.resultPassword = textElement.textContent;
      }
    }, 100);
  }

  showRulesHint(text: any) {
    console.log('hover', text);
    const hintElement = document.querySelector('#rules-hint');
    if (hintElement) {
      hintElement.textContent = text.hint;
    }
  }

  leaveRulesHint() {
    const hintElement = document.querySelector('#rules-hint');
    if (hintElement) {
      hintElement.textContent = '';
    }
  }

  tooglePassword() {
    const textElement = document.querySelector('#text');
    if (textElement) {
      console.log(textElement.textContent);
      // -webkit-text-security: disc;
      let lc = 0;
      Array.from(textElement.children).forEach((element:any) => {
        console.log(element.textContent);
        console.log(this.createDot(element.textContent));
        if (this.isShowPassword) {
          element.textContent = this.createDot(element.textContent);
        } else {
          element.textContent = this.resultPassword.substr(lc, element.textContent.length);
        }
        console.log(lc, element.textContent);
        
        lc = lc + element.textContent.length;
      });
    }
    this.isShowPassword = !this.isShowPassword;
  }

  createDot(str:any) {
    let star = '';
    for (let i in str) {
      star = star + '*';
    }
    return star;
  }

  copyClipboard() {
    var copyText: any = document.querySelector('#text') || '';
    if (copyText) {
      navigator.clipboard.writeText(copyText.textContent);
    }
  }

  onDrag(index: number) {
    this.inAction = index;
    console.log(this.inAction);
  }

  createFormula() {
    this.createStep = true;
  }

  saveFormula() {
  }

  chooseRules(ev: any) {
    console.log(ev);
    this.rule = ev;
  }
}
