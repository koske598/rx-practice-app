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
  execute(code: string): ExecutionResult {
    const results: any[] = [];
    let error: string | undefined;

    try {
      const runner = new Function('Rx', 'op', 'results', `
        const { ${Object.keys(Rx).join(', ')} } = Rx;
        const { ${Object.keys(op).join(', ')} } = op;
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
