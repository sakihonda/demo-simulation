# Vue 3 + Typescript + Vite  
yarn dev ...開発サーバー立ち上げ  

## ファイル構成  
コードは `src` フォルダにすべて入ってます。  
基本的には、下記で触れていないファイルや関数は計算ロジックに関係ありません。  

特にロジックに関係あるファイルはハイライトしてます。  

### src/App.vue  
・ページ全体のHTML。  
・ページをつくる各パーツ=コンポーネント(テーブルやチャート等)をこのページで呼び出しています。  

### src/components　　
・ `CarTable.vue` ...ページ左部分のテーブルHTML&JS  
・CompareTable.vue...ページ右上の比較テーブル  

### src/charts チャートコンポーネント  
・CarProfitChart.vue...各車種の利益グラフ  
・ProfitChart.vue...全体の売上高と売上原価グラフ  
・RoiChart.vue...全体のROIグラフ  

### src/stores データ管理センター  
現在データベースを使ってないのでその代わりに使用中。  
・cars.ts...各車種のデータ  
・ `costDefaults.ts` ...コスト初期値のデータと `コスト計算コード`  
・dataAll.ts ...車種全体の売上、利益等データと計算コード  

### src/use 各コンポーネントで共通して使う関数等を格納  
・priceLine.ts...各車種の上限価格を決める計算ロジック  

## (メモ)visual studio code コマンド  
command k + command c 選択行コメントアウト  
command k + command u コメントアウト解除  