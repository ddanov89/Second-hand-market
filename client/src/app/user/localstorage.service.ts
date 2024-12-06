// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class LocalstorageService {

//   constructor() {}
//   // Set a value in local storage
//   setItem(key: string, value: string): void {
//     localStorage.setItem(key, value);
//   }

//   // Get a value from local storage
//   getItem(key: string): string | null {
//     return localStorage.getItem(key);
//   }

//   // Remove a value from local storage
//   removeItem(key: string): void {
//     localStorage.removeItem(key);
//   }

//   // Clear all items from local storage
//   clear(): void {
//     localStorage.clear();
//   }
// }


// import { Injectable } from '@angular/core'
// import { Subject } from 'rxjs/Subject'


// @Injectable()
// export class SessionService {
//     public session: Subject<string>
//     constructor() {
//         this.session = new Subject<string>()
//     }

//     setVal(key: string, value: string): void {
//         this.session.next(value)
//         sessionStorage.setItem(key, value)
//     }

//     getVal(key: string): string {
//         return sessionStorage.getItem(key)
//     }
// }