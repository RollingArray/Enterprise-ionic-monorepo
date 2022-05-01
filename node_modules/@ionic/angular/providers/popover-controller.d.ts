import { ComponentFactoryResolver, Injector } from '@angular/core';
import { PopoverOptions } from '@ionic/core';
import { OverlayBaseController } from '../util/overlay';
import { AngularDelegate } from './angular-delegate';
import * as i0 from "@angular/core";
export declare class PopoverController extends OverlayBaseController<PopoverOptions, HTMLIonPopoverElement> {
    private angularDelegate;
    private resolver;
    private injector;
    constructor(angularDelegate: AngularDelegate, resolver: ComponentFactoryResolver, injector: Injector);
    create(opts: PopoverOptions): Promise<HTMLIonPopoverElement>;
    static ɵfac: i0.ɵɵFactoryDeclaration<PopoverController, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<PopoverController>;
}
