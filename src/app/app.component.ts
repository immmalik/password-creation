import { Component } from '@angular/core';
// import { SlButton, SlDropdown, SlMenu, SlMenuItem } from '@shoelace-style/shoelace/dist/react';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'password-creation';

  ngOninit() {
    // const container = document.querySelector('.dropdown-selection');
    // let dropdown = null;
    // if (container) {
    //   dropdown = container.querySelector('sl-dropdown');
    // }

    // if (dropdown) {
    //   dropdown.addEventListener('sl-select', event => {
    //     // const selectedItem = event.detail.item;
    //     // console.log(selectedItem.value);
    //     console.log(event);
    //   });
    // }
  }
}
