# 松永研究室ホームページ (Hugo)

## 概要

松永研究室のホームページは **Hugo** 静的サイトジェネレータで管理されています。

- **本番URL**: https://www.bio.ics.saitama-u.ac.jp/
- **管理リポジトリ**: https://github.com/matsunagalab/hugo
- **公開リポジトリ**: https://github.com/matsunagalab/matsunagalab.github.io

## ディレクトリ構成

```
hugo/
├── content/             # ★コンテンツ（主な編集対象）
│   ├── _index.md        # トップページ
│   ├── research/        # 研究内容
│   ├── member/          # メンバー
│   ├── publication/     # 論文リスト
│   ├── teaching/        # 授業情報
│   ├── recruiting/      # 学生募集
│   ├── resource/        # リソース
│   └── lab/             # 研究室向け
├── static/              # 静的ファイル（画像など）
├── themes/congo/        # テーマ（Blowfish系）
├── layouts/             # カスタムレイアウト
├── public/              # ★生成された静的サイト（別Gitリポジトリ）
├── config/              # サイト設定（_default/配下にTOMLファイル）
├── assets/css/          # カスタムCSS
└── .gitmodules          # サブモジュール設定
```

## 重要な注意事項

- `public/` ディレクトリは **別のGitリポジトリ** (matsunagalab.github.io) として管理されている
- コンテンツ編集は `content/` ディレクトリ内の `_index.md` ファイルを編集
- 画像は `static/` ディレクトリに配置し、Markdownでは `/img/photo.jpg` のように参照
- **CNAME**: カスタムドメイン用の `static/CNAME` ファイル（内容: `www.bio.ics.saitama-u.ac.jp`）は削除しないこと。`hugo` コマンドで自動的に `public/` へコピーされる

## コマンド

### ローカルプレビュー
```bash
hugo server -D
# ブラウザで http://localhost:1313 を開く
```

### 静的サイト生成
```bash
hugo
# public/ ディレクトリに出力される
```

### 本番デプロイ
```bash
# 1. 静的ファイル生成
hugo

# 2. publicディレクトリでコミット＆プッシュ
cd public
git add .
git commit -m "Update: 変更内容"
git push origin master

# 3. メインリポジトリも更新
cd ..
git add content/
git commit -m "Update: 変更内容"
git push origin master
```

## Markdownファイルの構造

```markdown
---
title: "ページタイトル"
date: 2025-01-01T00:00:00+09:00
draft: false
categories: ["カテゴリー名"]
---

ここから本文（Markdown記法）
```

- `draft: true` の記事は本番に公開されない（プレビューでは `-D` オプションで表示可能）

## コミットメッセージ規則

- `Update: 2025年1月のニュース追加`
- `Add: 新メンバーのプロフィール追加`
- `Fix: リンク修正`
- `Update: 論文リスト更新`

## トラブルシューティング

### テーマが表示されない
```bash
git submodule update --init --recursive
```

### publicディレクトリにpushできない
```bash
rm -rf public
git clone https://github.com/matsunagalab/matsunagalab.github.io.git public
```

### ページが更新されない
- ブラウザのスーパーリロード (Cmd+Shift+R / Ctrl+Shift+R)
- GitHub Pagesの更新は1〜5分かかる場合がある
