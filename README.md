# Microsoft Learn Documentation Extension

Microsoft Learn ドキュメントページを拡張するChrome拡張機能です。各ドキュメントページに GitHub ソースリンクとコミットフィードへのアクセスボタンを追加します。

## 機能

- Microsoft Learn ドキュメントページ（`https://learn.microsoft.com/*`）にアクセス時に自動的に機能します
- ページヘッダーに以下のボタンを追加します：
  - **GitHubボタン**: ドキュメントのMarkdownソースをGitHubで開きます
  - **フィードボタン**: ドキュメントのコミット履歴のAtomフィードを開きます
- 多言語ページから英語版ページに自動変換してGitHubリンクを取得します

## インストール

### 開発版のビルドとインストール

1. 依存関係をインストール：

```bash
npm install
```

2. 拡張機能をビルド：

```bash
npm run build
```

3. Chromeで `chrome://extensions/` を開き、「デベロッパーモード」を有効にします

4. 「パッケージ化されていない拡張機能を読み込む」をクリックし、`dist` フォルダを選択します

### 開発モード

開発中にリアルタイムで変更を反映する場合：

```bash
npm run dev
```

## 技術仕様

- **フレームワーク**: React + TypeScript + Vite
- **拡張機能**: Chrome Extension Manifest V3
- **ビルドツール**: CRXJS Vite プラグイン
- **対象サイト**: `https://learn.microsoft.com/*`
- **権限**: `scripting`, `tabs`

## プロジェクト構成

```
src/
├── background/           # バックグラウンドサービスワーカー
│   └── index.ts         # タブ更新の監視とコンテンツスクリプトの挿入
├── content/             # コンテンツスクリプト
│   └── contentScript.ts # ページにボタンを追加する処理
manifest.config.ts       # Chrome拡張機能の設定
```

## 動作原理

1. バックグラウンドスクリプトがMicrosoft Learnページのタブ更新を監視
2. 該当ページでコンテンツスクリプトを実行
3. ページのヘッダー部分（`#article-header-page-actions`）にボタンを挿入
4. GitHubボタン押下時：
   - 現在のURLを英語版に変換
   - ページのHTMLを取得してGitHub編集リンクを抽出
   - GitHubページを新しいタブで開く
5. フィードボタン押下時：
   - 同様にGitHubリンクを取得
   - コミット履歴のAtomフィード（`.atom`）を新しいタブで開く

## ライセンス

MIT License - 詳細は [LICENSE](LICENSE) ファイルを参照してください。
