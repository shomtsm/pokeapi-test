# PokeAPI Test

実装時間: 2.5時間

## ローカル環境構築手順

### 前提条件
- Node.js (v18以上)
- npm

### Setup
```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev
```


アプリケーションは `http://localhost:3000` でアクセスできます。

## Dockerを用いた起動手順

### 初回起動
```bash
docker compose up --build
```

### 二回目以降
```bash
docker compose up
```

アプリケーションは `http://localhost:3000` でアクセスできます。


