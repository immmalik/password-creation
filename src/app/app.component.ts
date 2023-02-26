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
  public name: any = 'example.com';
  public nameApp: any = 'example.com';
  public options = [
    {
      value: '1',
      formula: [
        {
          type: 'name',
          value: '2*',
          hint: 'The last 2 digits of the app name'
        },
        {
          type: 'input',
          value: 'AU',
          hint: 'character input'
        },
        {
          type: 'name',
          value: '*3',
          hint: 'The last 3 digits of the app name'
        },
        {
          type: 'input',
          value: '&3',
          hint: 'character input'
        }],
      label: '** (last 2 digits) + AU + *** (first 3 digits) + &3',
    },
    {
      value: '2',
      formula: [
        {
          type: 'name',
          value: '3*',
          hint: 'The last 3 digits of the app name'
        },
        {
          type: 'input',
          value: 'AF',
          hint: 'character input'
        },
        {
          type: 'name',
          value: '*2',
          hint: 'The first 2 digits of the app name'
        },
        {
          type: 'input',
          value: '/3',
          hint: 'character input'
        }],
      label: '*** (last 3 digits) + AF + ** (first 2 digits) + /3',
    }
  ];
  public formulaSelected: any = [];
  public formulaResult: any = {
    label: '',
    formula: []
  };
  public isShowPassword = true;
  public resultPassword: any = '';
  public createStep = false;
  public rule: any;
  public rulesHint: any = '';
  public totalDigit: any;
  public character: any;
  public lastname = false;
  public uppercase = false;
  public rules = '';
  public ruleList = [
    {
      label: 'App / Domain Name',
      type: 'name',
      sublabel: 'twitter.com'
    },
    {
      label: 'App / Domain Name Length',
      type: 'length',
      sublabel: 'Domain length'
    },
    {
      label: 'Input text, number or symbol',
      type: 'input',
      sublabel: 'Text, number or symbol'
    }
  ];
  public inAction: any;
  ngOninit() {
  }

  changeName(ev: any) {
    this.name = ev.target.value;
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
      // hintElement.textContent = text.hint;
    }
    this.rulesHint = text.hint;
  }

  leaveRulesHint() {
    const hintElement = document.querySelector('#rules-hint');
    if (hintElement) {
      // hintElement.textContent = '';
    }
    this.rulesHint = '';
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
      copyText = copyText.textContent.replace(/\s/g, '');
      navigator.clipboard.writeText(copyText);
    }
  }

  onDrag(index: number) {
    this.inAction = index;
    console.log(this.inAction);
  }

  changeRules(ev: any, type: string) {
    switch (type) {
      case 'name':
        this.nameApp = ev.target.value;
        console.log(ev, this.nameApp);
        if (this.rule.type === 'name') {
          this.checkRules();
        }
        break;
      case 'totalDigit':
        console.log('totalDigit', ev.target.value);
        this.totalDigit = ev.target.value;
        this.checkRules();
        break;
      case 'character':
        console.log('character', ev.target.value);
        this.rules = ev.target.value;
        break;
      case 'lastname':
        console.log('lastname', ev.target.__checked);
        this.lastname = ev.target.__checked;
        this.checkRules();
        break;
      case 'uppercase':
        console.log('uppercase', ev.target.__checked);
        this.uppercase = ev.target.__checked;
        this.checkRules();
        break;
    }
    console.log(ev);
  }

  checkRules() {
    if (this.lastname) {
      this.rules = this.nameApp.substr(this.nameApp.length - this.totalDigit);
    } else {
      this.rules = this.nameApp.substr(0, this.totalDigit);
    }
    if (this.uppercase) {
      this.rules = this.rules.toUpperCase();
    } else {
      this.rules = this.rules.toLowerCase();
    }
  }

  isertRules() {
    let value = '';
    let hint = '';
    if (this.rule.type === 'length') {
      value = this.rules;
      hint = 'character length from app name';
    } else if (this.rule.type === 'name') {
      if (this.lastname) {
        value = this.totalDigit + '*';
        hint = 'The last ' + this.totalDigit +' digits of the app name';
        if (this.uppercase) {
          hint = 'The last ' + this.totalDigit +' digits of the app name (uppercase)';
        }
      } else {
        value = '*' + this.totalDigit;
        hint = 'The first ' + this.totalDigit +' digits of the app name';
        if (this.uppercase) {
          hint = 'The first ' + this.totalDigit +' digits of the app name (uppercase)';
        }
      }
    } else if (this.rule.type === 'input') {
      value = this.rules;
      hint = 'character input';
    }
    let item = {
      type: this.rule.type,
      value: value,
      rules: this.rules,
      hint: hint,
    };
    this.formulaResult.formula.push(item);
    console.log(this.formulaResult, 'this.formulaResult');
  }

  removeRules(index: number) {
    this.formulaResult.formula.splice(index, 1);
    this.rulesHint = '';
    this.inAction = '';
  }

  createFormula() {
    this.createStep = true;
    this.rulesHint = '';
  }

  saveFormula() {
    this.formulaResult.label = '';
    // label: '*** (last 3 digits) + AF + ** (first 2 digits) + /3',
    let label = '';
    this.formulaResult.formula.forEach((element: any, index: number) => {
      if (element.type == 'name') {
        if (element.value.substr(0, 1) == '*') { // first of the string
          const digit = element.value.substr(1);
          let star = '';
          for (let index = 0; index < digit; index++) {
            star = star + '*';
          }
          label = label + star + ' (first '+ digit +' digits)';
        } else { // last of the string
          const digit = element.value.substr(0, element.value.length - 1);
          let star = '';
          for (let index = 0; index < digit; index++) {
            star = star + '*';
          }
          label = label + star + ' (last '+ digit +' digits)';
        }
      }

      if (element.type == 'input') {
        label = label + element.value;
      }

      if (element.type == 'length') {
        label = label + element.value;
      }

      if (index < this.formulaResult.formula.length - 1) {
        label = label + ' + ';
      }
    });
    this.formulaResult.label = label;
    this.formulaResult.value = this.options.length + 1;
    console.log(this.formulaResult, 'this.formulaResult');
    this.options.push(this.formulaResult);
    this.createStep = false;
  }

  chooseRules(ev: any) {
    console.log(ev);
    this.rule = ev;
    if (this.rule.type === 'length') {
      this.rules = this.nameApp.length;
      console.log(ev, this.nameApp);
    } else if (this.rule.type === 'name') {
      this.rules = '';
      this.totalDigit = '';
      this.lastname = false;
      this.uppercase = false;
    } else if (this.rule.type === 'input') {
      this.rules = '';
    }
  }
}
