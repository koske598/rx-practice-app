import { Exercise } from '../../../shared/models/exercise.model';

export const EXERCISES: Exercise[] = [
  {
    id: 1,
    title: '基礎：データの加工',
    description: '1から5までの数字を10倍にして出力してください。',
    initialCode: `// 下記の results 配列に結果を push してください
// 使用可能: of, map, filter, etc...

of(1, 2, 3, 4, 5).pipe(
  map(x => x * 10)
).subscribe(val => results.push(val));`,
    expectedOutput: [10, 20, 30, 40, 50],
    explanation: 'RxJSの基本フロー（生成 -> 変換 -> 購読）の形です。',
    difficulty: 'beginner'
  },
  {
    id: 2,
    title: '基礎：フィルタリング',
    description: '1から10までの数字から偶数だけを抽出してください。',
    initialCode: `// 偶数だけを抽出してください
of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10).pipe(
  // ここにコードを書いてください
).subscribe(val => results.push(val));`,
    expectedOutput: [2, 4, 6, 8, 10],
    explanation: 'filterオペレーターを使って条件に合う値だけを通過させます。',
    difficulty: 'beginner'
  },
  {
    id: 3,
    title: '基礎：複数の変換',
    description: '1から5までの数字を2倍にして、さらに3より大きい値だけを抽出してください。',
    initialCode: `// 2倍にして、3より大きい値だけを抽出
of(1, 2, 3, 4, 5).pipe(
  // ここにコードを書いてください
).subscribe(val => results.push(val));`,
    expectedOutput: [4, 6, 8, 10],
    explanation: 'pipe内で複数のオペレーターをチェーンできます。',
    difficulty: 'beginner'
  },
  {
    id: 4,
    title: '中級：非同期処理',
    description: '1から3までの数字を、それぞれ1秒遅延させて順番に出力してください。',
    initialCode: `// delayオペレーターを使って非同期処理を実装
of(1, 2, 3).pipe(
  // ここにコードを書いてください
).subscribe(val => results.push(val));`,
    expectedOutput: [1, 2, 3],
    explanation: 'delayオペレーターで非同期処理を実現できます。実際の実行では順番に出力されます。',
    difficulty: 'intermediate'
  },
  {
    id: 5,
    title: '中級：エラーハンドリング',
    description: '1から5までの数字を処理し、3の場合はエラーを発生させ、catchErrorで0に置き換えてください。',
    initialCode: `// エラーハンドリングを実装
of(1, 2, 3, 4, 5).pipe(
  // ここにコードを書いてください
).subscribe(val => results.push(val));`,
    expectedOutput: [1, 2, 0, 4, 5],
    explanation: 'catchErrorオペレーターでエラーをキャッチし、代替値を返すことができます。',
    difficulty: 'intermediate'
  },
  {
    id: 6,
    title: '基礎：take/skip',
    description: '1から10までの数字から、最初の3個をスキップして、次の5個を取得してください。',
    initialCode: `// takeとskipを使って実装
of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10).pipe(
  // ここにコードを書いてください
).subscribe(val => results.push(val));`,
    expectedOutput: [4, 5, 6, 7, 8],
    explanation: 'skipで最初のN個をスキップし、takeで次のN個を取得できます。',
    difficulty: 'beginner'
  },
  {
    id: 7,
    title: '基礎：first',
    description: '1から10までの数字から、最初の値だけを取得してください。',
    initialCode: `// firstを使って最初の値だけを取得
of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10).pipe(
  // ここにコードを書いてください
).subscribe(val => results.push(val));`,
    expectedOutput: [1],
    explanation: 'firstオペレーターで最初の値だけを取得できます。Observableは最初の値を発行した後に完了します。',
    difficulty: 'beginner'
  },
  {
    id: 8,
    title: '基礎：distinct',
    description: '重複した値を含む配列から、重複を除去してください。',
    initialCode: `// distinctを使って重複を除去
of(1, 2, 2, 3, 3, 3, 4, 5, 5).pipe(
  // ここにコードを書いてください
).subscribe(val => results.push(val));`,
    expectedOutput: [1, 2, 3, 4, 5],
    explanation: 'distinctオペレーターで重複した値を自動的に除去できます。',
    difficulty: 'beginner'
  },
  {
    id: 9,
    title: '基礎：tap',
    description: '1から5までの数字を2倍にし、tapを使ってデバッグ情報を出力してください（tapは結果に影響しません）。',
    initialCode: `// tapを使ってデバッグ情報を出力
of(1, 2, 3, 4, 5).pipe(
  // ここにコードを書いてください
).subscribe(val => results.push(val));`,
    expectedOutput: [2, 4, 6, 8, 10],
    explanation: 'tapオペレーターは副作用（ログ出力など）を実行できますが、値の流れには影響しません。',
    difficulty: 'beginner'
  },
  {
    id: 10,
    title: '中級：switchMap',
    description: '1から3までの数字それぞれに対して、その数字を2倍した値を発行するObservableに切り替えてください。',
    initialCode: `// switchMapを使って実装
of(1, 2, 3).pipe(
  // ここにコードを書いてください
).subscribe(val => results.push(val));`,
    expectedOutput: [2, 4, 6],
    explanation: 'switchMapは各値に対して新しいObservableを作成し、最新のものに切り替えます。',
    difficulty: 'intermediate'
  },
  {
    id: 11,
    title: '中級：mergeMap',
    description: '1から3までの数字それぞれに対して、その数字を3回繰り返すObservableをマージしてください。',
    initialCode: `// mergeMapを使って実装
of(1, 2, 3).pipe(
  // ここにコードを書いてください
).subscribe(val => results.push(val));`,
    expectedOutput: [1, 1, 1, 2, 2, 2, 3, 3, 3],
    explanation: 'mergeMapは各値に対して新しいObservableを作成し、それらをマージします。',
    difficulty: 'intermediate'
  },
  {
    id: 12,
    title: '中級：combineLatest',
    description: '2つのObservable（[1, 2]と[10, 20]）を結合し、それぞれの最新値を組み合わせてください。',
    initialCode: `// combineLatestを使って実装
const obs1 = of(1, 2);
const obs2 = of(10, 20);
combineLatest([obs1, obs2]).subscribe(val => results.push(val));`,
    expectedOutput: [[1, 10], [2, 10], [2, 20]],
    explanation: 'combineLatestは複数のObservableの最新値を組み合わせて発行します。各Observableが少なくとも1つの値を発行した後、いずれかが新しい値を発行するたびに最新の組み合わせを発行します。',
    difficulty: 'intermediate'
  },
  {
    id: 13,
    title: '中級：scan',
    description: '1から5までの数字の累積和を計算してください。',
    initialCode: `// scanを使って累積和を計算
of(1, 2, 3, 4, 5).pipe(
  // ここにコードを書いてください
).subscribe(val => results.push(val));`,
    expectedOutput: [1, 3, 6, 10, 15],
    explanation: 'scanオペレーターは累積値を計算します。reduceと似ていますが、各ステップで値を発行します。',
    difficulty: 'intermediate'
  },
  {
    id: 14,
    title: '上級：throttleTime',
    description: '1から5までの数字を連続して発行し、throttleTimeを使って最初の値だけを通過させてください。',
    initialCode: `// throttleTimeを使って実装
// ヒント: throttleTime(0)を使うと、最初の値だけが通過します
of(1, 2, 3, 4, 5).pipe(
  // ここにコードを書いてください
).subscribe(val => results.push(val));`,
    expectedOutput: [1],
    explanation: 'throttleTimeは指定時間内に最初の値だけを通過させます。同期的な実行では最初の値のみが出力されます。',
    difficulty: 'advanced'
  },
  {
    id: 15,
    title: '上級：retry',
    description: '1から3までの数字を処理し、2の場合はエラーを発生させ、retryを使って1回再試行してください。',
    initialCode: `// retryを使って実装
of(1, 2, 3).pipe(
  map(x => {
    if (x === 2) throw new Error('Error');
    return x;
  }),
  // ここにコードを書いてください
).subscribe(val => results.push(val));`,
    expectedOutput: [1, 2, 3],
    explanation: 'retryオペレーターはエラーが発生した場合、指定回数まで再試行します。エラーが解決されれば、正常に値を発行します。',
    difficulty: 'advanced'
  },
  {
    id: 16,
    title: '上級：複合問題',
    description: '1から10までの数字から、偶数だけを抽出し、それぞれを2倍にして、最初の3個だけを取得してください。',
    initialCode: `// 複数のオペレーターを組み合わせて実装
of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10).pipe(
  // ここにコードを書いてください
).subscribe(val => results.push(val));`,
    expectedOutput: [4, 8, 12],
    explanation: '複数のオペレーターを組み合わせることで、複雑なデータ処理を実現できます。',
    difficulty: 'advanced'
  }
];
