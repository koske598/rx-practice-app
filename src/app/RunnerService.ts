import { Injectable } from '@angular/core';
import * as Rx from 'rxjs';
import * as ops from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class RunnerService {
  run(userCode: string): Rx.Observable<any> {
    // ユーザーが 'map(x => x * 2)' と書いた場合、それを関数化する
    // RxJSの主要な関数を引数として渡せるようにする
    const runner = new Function('Rx', 'op', `
      const { of, from, timer, interval } = Rx;
      const { map, filter, delay, take, tap } = op;
      return of(1, 2, 3, 4, 5).pipe(${userCode});
    `);

    return runner(Rx, ops);
  }
}