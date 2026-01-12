import { Component, PLATFORM_ID, Inject, OnInit } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';
import * as Rx from 'rxjs';
import * as op from 'rxjs/operators';

export interface Exercise {
  id: number;
  title: string;
  description: string;
  initialCode: string;
  expectedOutput: any[];
  explanation: string;
}

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
  isCorrect: boolean | null = null;
  currentExerciseIndex = 0;
  code: string = `filter(x => x % 2 === 0)`;
  results: any[] = [];

  exercises: Exercise[] = [
    {
      id: 1,
      title: '基礎：データの加工',
      description: '1から5までの数字を10倍にして出力してください。',
      initialCode: 
  `// 下記の results 配列に結果を push してください
  // 使用可能: of, map, filter, etc...
  
  of(1, 2, 3, 4, 5).pipe(
    map(x => x * 10)
  ).subscribe(val => results.push(val));`,
      expectedOutput: [10, 20, 30, 40, 50],
      explanation: 'RxJSの基本フロー（生成 -> 変換 -> 購読）の形です。'
    }
  ];
  
  editorOptions = { 
    theme: 'vs-dark', 
    language: 'typescript',
    readOnly: false,
    automaticLayout: true,
    fontSize: 14,
    scrollBeyondLastLine: false
  };

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {}

  runCode() {
    this.results = [];
    this.isCorrect = null;
  
    try {
      const runner = new Function('Rx', 'op', 'results', `
        const { ${Object.keys(Rx).join(', ')} } = Rx;
        const { ${Object.keys(op).join(', ')} } = op;
        ${this.code}
      `);
        runner(Rx, op, this.results);
      this.checkAnswer();
    } catch (err) {
      console.error('Runtime Error:', err);
    }
  }
  
  checkAnswer() {
    const expected = JSON.stringify(this.currentExercise.expectedOutput);
    const actual = JSON.stringify(this.results);
    this.isCorrect = (expected === actual);
  }

  get currentExercise() {
    return this.exercises[this.currentExerciseIndex];
  }

  onEditorInit(editor: any) {
    const monaco = (window as any).monaco;
    monaco.languages.typescript.typescriptDefaults.addExtraLib(`
      declare const of: (...args: any[]) => any;
      declare const map: (fn: (val: any) => any) => any;
      declare const results: any[];
    `, 'filename/facts.d.ts');
    monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: false,
      noSyntaxValidation: false
    });
  }
}