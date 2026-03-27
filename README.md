# 2000年前後の日本の個人ホームページ風ジェネレータ

Vite + React + TypeScript で作った、GitHub Pages に載せやすい静的サイト向けのホームページジェネレータです。2000年前後の日本の個人サイト文化をモチーフに、キリ番、掲示板、更新履歴、バナー、背景タイル、工事中表示などをまとめて生成できます。

## できること

- カスタムモードで各項目を編集し、`この内容で生成` でプレビューを更新
- おまかせモードでテーマ重み付きランダム生成
- おまかせ生成結果をそのままカスタム編集へ引き継ぎ
- 仮実装のアクセスカウンタ、キリ番案内、掲示板、更新履歴、リンク集を表示
- 生成結果を `index.html` など一式入りの ZIP としてダウンロード

## 技術構成

- Vite
- React
- TypeScript
- 素の CSS
- JSZip

## セットアップ

```bash
npm install
npm run dev
```

Windows では [dev.bat](C:\work\retro-homepage-generator\dev.bat) をダブルクリックして起動できます。

## ビルド

```bash
npm run build
```

Windows では [build.bat](C:\work\retro-homepage-generator\build.bat) でビルドできます。

`dist/` を GitHub Pages に配置すれば、アプリ本体を静的サイトとして公開できます。

## 使い方

1. 左側の設定エリアでサイトタイトル、管理人名、配色、表示パーツを調整します。
2. `この内容で生成` を押すと、右側のプレビューが更新されます。
3. `もう一回生成` を押すと、おまかせテーマで新しい案を作ります。
4. `ZIPダウンロード` を押すと、生成済みプレビューをもとに静的 HTML 一式を保存できます。

## データ構造

以下のデータを分離しています。

- `src/data/themes.ts`: テーマ定義
- `src/data/components.ts`: 背景パターンやUI用パーツ名
- `src/data/phrases.ts`: 昔風の定型文やダミー文言
- `src/data/weights.ts`: おまかせ生成で使う重み

## GitHub Pages で公開する手順

### アプリ本体を公開する場合

1. `npm install`
2. `npm run build`
3. 生成された `dist/` の中身を公開対象ブランチへ配置
4. GitHub の Repository Settings から Pages を開く
5. 公開元ブランチとフォルダを選択
6. 数分待って公開URLへアクセス

このプロジェクトでは `vite.config.ts` の `base` を `./` にしているため、GitHub Pages 配下でも相対パスで動きやすい構成です。

### GitHub Actions で自動公開する場合

このリポジトリには [deploy-pages.yml](C:\work\retro-homepage-generator\.github\workflows\deploy-pages.yml) を含めています。GitHub 側で Pages の公開元を `GitHub Actions` に切り替えると、`main` ブランチへ push したタイミングで自動デプロイできます。

### 生成した昔風サイトを公開する場合

1. アプリ上で `ZIPダウンロード` を実行
2. ZIP を展開
3. 中にある `index.html`, `profile.html`, `bbs.html`, `link.html`, `diary.html`, `style.css`, `script.js`, `assets/` を任意の公開先へ配置
4. GitHub Pages であれば、新しいリポジトリや `docs/` 配下へそのまま置いて公開

## 今後の拡張案

- バナー画像や背景タイル画像の追加
- 同盟バナー、Web拍手、メールフォーム風パーツの追加
- 生成HTMLのテンプレート切り替え
- 複数ページを個別編集できる詳細モード
- 実際の画像アップロードに対応したアセット差し替え
