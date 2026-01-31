import { Component, Input, Output, EventEmitter, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';

@Component({
  selector: 'app-code-editor',
  standalone: true,
  imports: [CommonModule, FormsModule, MonacoEditorModule],
  templateUrl: './code-editor.component.html',
  styleUrl: './code-editor.component.scss'
})
export class CodeEditorComponent implements OnInit {
  @Input() code: string = '';
  @Output() codeChange = new EventEmitter<string>();
  
  isBrowser: boolean;
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

  ngOnInit() {
    if (this.isBrowser) {
      this.setupMonacoEditor();
    }
  }

  onCodeChange(code: string) {
    this.codeChange.emit(code);
  }

  onEditorInit(editor: any) {
    if (this.isBrowser) {
      const monaco = (window as any).monaco;
      if (monaco) {
        monaco.languages.typescript.typescriptDefaults.addExtraLib(`
          declare const of: (...args: any[]) => any;
          declare const from: (...args: any[]) => any;
          declare const timer: (...args: any[]) => any;
          declare const interval: (...args: any[]) => any;
          declare const map: (fn: (val: any) => any) => any;
          declare const filter: (fn: (val: any) => boolean) => any;
          declare const delay: (time: number) => any;
          declare const take: (count: number) => any;
          declare const tap: (fn: (val: any) => void) => any;
          declare const catchError: (fn: (err: any) => any) => any;
          declare const throwError: (err: any) => any;
          declare const results: any[];
        `, 'filename/facts.d.ts');
        monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
          noSemanticValidation: false,
          noSyntaxValidation: false
        });
      }
    }
  }

  private setupMonacoEditor() {
    // Monaco Editorの初期設定はonEditorInitで行う
  }
}
