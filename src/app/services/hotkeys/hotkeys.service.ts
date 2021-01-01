import { DOCUMENT } from "@angular/common";
import { Inject, Injectable } from "@angular/core";
import { EventManager } from "@angular/platform-browser";
import { Observable } from "rxjs";



@Injectable({
    providedIn: "root"
})

export class HotkeysService {

    defaults: Partial<Options> = {
        element: this.document
    };

    constructor(
        public eventManager: EventManager,
        @Inject(DOCUMENT) private document: Document) {
    }

    addShortcut(options: Partial<Options>): Observable<Event> {
        const merged = { ...this.defaults, ...options };
        const event: string = `keydown.${merged.keys}`;

        return new Observable((observer) => {
            const handler = (e: Event) => {
                e.preventDefault();
                observer.next(e);
            };

            const dispose: Function = this.eventManager.addEventListener(
                merged.element, event, handler
            );

            return () => {
                dispose();
            };
        });
    }
}