import { ApplicationRef, ComponentFactoryResolver, NgZone, ViewContainerRef, Injector } from '@angular/core';
import { FrameworkDelegate } from '@ionic/core';
import * as i0 from "@angular/core";
export declare class AngularDelegate {
    private zone;
    private appRef;
    constructor(zone: NgZone, appRef: ApplicationRef);
    create(resolver: ComponentFactoryResolver, injector: Injector, location?: ViewContainerRef): AngularFrameworkDelegate;
    static ɵfac: i0.ɵɵFactoryDeclaration<AngularDelegate, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AngularDelegate>;
}
export declare class AngularFrameworkDelegate implements FrameworkDelegate {
    private resolver;
    private injector;
    private location;
    private appRef;
    private zone;
    private elRefMap;
    private elEventsMap;
    constructor(resolver: ComponentFactoryResolver, injector: Injector, location: ViewContainerRef | undefined, appRef: ApplicationRef, zone: NgZone);
    attachViewToDom(container: any, component: any, params?: any, cssClasses?: string[]): Promise<any>;
    removeViewFromDom(_container: any, component: any): Promise<void>;
}
export declare const attachView: (zone: NgZone, resolver: ComponentFactoryResolver, injector: Injector, location: ViewContainerRef | undefined, appRef: ApplicationRef, elRefMap: WeakMap<HTMLElement, any>, elEventsMap: WeakMap<HTMLElement, () => void>, container: any, component: any, params: any, cssClasses: string[] | undefined) => any;
export declare const bindLifecycleEvents: (zone: NgZone, instance: any, element: HTMLElement) => (() => void);
