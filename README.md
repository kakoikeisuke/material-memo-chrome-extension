# Material Memo
3DCGのマテリアル情報をメモするためのChrome拡張機能です。  
サイドパネルとして展開されるため, 調べ物などで複数のタブを横断しながら情報を記録することができます。

## インストール
`Releases`から`zip`ファイルをダウンロードすることができます。  
ダウンロードしたファイルを解凍し, 以下のページを参考に, 拡張機能を有効化してください。  

Hello World 拡張機能  |  Chrome Extensions  |  Chrome for Developers パッケージ化されていない拡張機能を読み込む  
[https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world?hl=ja#load-unpacked](https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world?hl=ja#load-unpacked)

## 使用方法
### 起動方法
Chromeの拡張機能アイコンをクリックし, この拡張機能を選択すると実行されます。  
ピン留めしておくと, 素早くアクセスできるようになります。
### 保存できる項目  
サイドパネル内の設定アイコンから保存したい項目を追加・削除できます。  
MaterialX 1.38時点のStandard Surfaceを参考に各項目を用意しています。  
### 書き出し  
保存した情報をMaterialX (`.mtlx`) ファイルとして取得することができます。  
情報は`standard_surface`タグ内に記述されます。  
また, ノード名(name)は「`SR_`+`指定した名前`」, 型(type)は「`surfaceshader`」となります。  
メモを作成した際の情報のみ書き出されるため, 他の項目の値によって左右される際には, その項目も保存しておくべき場合があります。  
具体的な例としては, 以下のような場合です。
![](/README_resource/exampleEmission.png)
上の「exampleEmission」では, `emission_color`が指定されているものの, `emission`の値が指定されておらず, レンダリング結果に反映されていません。  
下の「exampleEmission_v2」では, `emission_color`に加え, `emission`自体の値も指定されており, 意図した通りにレンダリングできています。  
※レンダリング結果は, 書き出した`.mtlx`ファイルをAutodesk Maya 2026の`aiMaterialXShader`で読み込み, Arnoldでレンダリングしたものです。
## 動作確認環境
Windows 11 Pro 24H2  
Google Chrome バージョン 136.0.7103.114（Official Build） （64 ビット）  
## ライセンス情報
本ツールでは以下のApache License 2.0のソフトウェア/リソースを使用しています：
- Google Fonts（アイコン）
    - Copyright © Google LLC
    - Apache License 2.0の下で使用
    - [https://fonts.google.com/](https://fonts.google.com/)

Apache License 2.0の全文は[こちら](https://www.apache.org/licenses/LICENSE-2.0)でご覧いただけます。