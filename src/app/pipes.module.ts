import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormulaPipe } from './formula/formula.pipe';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        FormulaPipe
    ],
    exports: [
        FormulaPipe,
    ],
    providers: []
})

export class PipesModule {
}
