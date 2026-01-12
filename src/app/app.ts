import { Component, PLATFORM_ID, Inject, OnInit } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';
import * as Rx from 'rxjs';
import * as ops from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, MonacoEditorModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  title = 'rx-practice-app';
  isBrowser: boolean;
  
  // エディタの設定
  editorOptions = { 
    theme: 'vs-dark', 
    language: 'typescript',
    automaticLayout: true 
  };
  
  // ユーザーが入力するコード（初期値）
  code: string = `map(x => x * 10)`;

  // 実行結果を格納する配列
  results: any[] = [];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    // SSR（サーバーサイド）でのエラーを防ぐため、ブラウザかどうかを判定
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {}

  // 【心臓部】コードを実行するメソッド
  runCode() {
    this.results = []; // 前回の結果をクリア
    try {
      // ユーザーの入力した文字列をRxJSのパイプ処理として実行
      // new Function(引数名, 関数本体)
      const runner = new Function('Rx', 'op', `
        const { of } = Rx;
        const { ${Object.keys(ops).join(', ')} } = op;
        return of(1, 2, 3, 4, 5).pipe(${this.code});
      `);

      const userObservable$: Rx.Observable<any> = runner(Rx, ops);

      userObservable$.subscribe({
        next: (val) => {
          console.log('Value:', val);
          this.results.push(val);
        },
        error: (err) => this.results.push('Error: ' + err),
        complete: () => this.results.push('Completed!')
      });
    } catch (e) {
      this.results.push('Syntax Error: ' + e);
    }
  }
}