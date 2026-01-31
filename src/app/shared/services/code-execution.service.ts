import { Injectable } from '@angular/core';
import * as Rx from 'rxjs';
import * as op from 'rxjs/operators';

export interface ExecutionResult {
  results: any[];
  error?: string;
  success: boolean;
}

@Injectable({ providedIn: 'root' })
export class CodeExecutionService {
  // 使用可能なRxJS関数のリスト（重複を避ける）
  private readonly rxFunctions = [
    'of', 'from', 'fromEvent', 'interval', 'timer', 
    'range', 'empty', 'throwError', 'never', 'combineLatest',
    'merge', 'concat', 'zip', 'forkJoin', 'race', 'startWith',
    'delay', 'debounceTime', 'throttleTime', 'auditTime', 'sampleTime'
  ];

  private readonly opFunctions = [
    'map', 'filter', 'tap', 'take', 'skip', 'first', 'last',
    'takeWhile', 'skipWhile', 'takeUntil', 'skipUntil',
    'distinct', 'distinctUntilChanged', 'distinctUntilKeyChanged',
    'debounce', 'debounceTime', 'throttle', 'throttleTime',
    'audit', 'auditTime', 'sample', 'sampleTime',
    'delay', 'delayWhen', 'timeout', 'timeoutWith',
    'catchError', 'retry', 'retryWhen', 'repeat', 'finalize',
    'startWith', 'endWith', 'concat', 'merge', 'switchMap',
    'mergeMap', 'concatMap', 'exhaustMap', 'combineLatest',
    'withLatestFrom', 'zip', 'race', 'forkJoin',
    'scan', 'reduce', 'count', 'max', 'min', 'find', 'findIndex',
    'every', 'some', 'isEmpty', 'defaultIfEmpty',
    'toArray', 'buffer', 'bufferCount', 'bufferTime', 'bufferWhen',
    'window', 'windowCount', 'windowTime', 'windowWhen',
    'pairwise', 'groupBy', 'partition', 'pluck', 'share', 'shareReplay'
  ];

  execute(code: string): ExecutionResult {
    const results: any[] = [];
    let error: string | undefined;

    try {
      // 重複を除去して使用可能な関数のみを展開
      const rxKeys = [...new Set(this.rxFunctions.filter(key => key in Rx))];
      const opKeys = [...new Set(this.opFunctions.filter(key => key in op))];
      
      // opKeysに存在する関数をrxKeysから除外（operatorsを優先）
      const filteredRxKeys = rxKeys.filter(key => !opKeys.includes(key));
      
      const runner = new Function('Rx', 'op', 'results', `
        const { ${filteredRxKeys.join(', ')} } = Rx;
        const { ${opKeys.join(', ')} } = op;
        ${code}
      `);
      
      runner(Rx, op, results);
      
      return { results, success: true };
    } catch (err: any) {
      error = err.message || 'コードの実行中にエラーが発生しました';
      return { results, error, success: false };
    }
  }

  checkAnswer(actual: any[], expected: any[]): boolean {
    return JSON.stringify(actual) === JSON.stringify(expected);
  }
}