# API要件定義

## 1. 文書の目的

本書は、画面とデータを接続するためのAPI要件を整理し、フロントエンドとバックエンドの責務分離をしやすくすることを目的とする。

---

## 2. API設計方針

- MVPでは、画面で必要な一覧・詳細・登録・更新APIを優先する
- できるだけリソース指向で設計する
- 将来の外部連携や複数クライアント利用に耐えやすい構成を意識する
- 認証方式は将来拡張前提としつつ、初期は本人利用を前提にする

---

## 3. API一覧

| API ID | 名称 | メソッド | エンドポイント |
|---|---|---|---|
| API-DASH-001 | ダッシュボード取得 | GET | `/api/dashboard` |
| API-PROP-001 | 物件一覧取得 | GET | `/api/properties` |
| API-PROP-002 | 物件詳細取得 | GET | `/api/properties/{propertyId}` |
| API-PROP-003 | 物件登録 | POST | `/api/properties` |
| API-PROP-004 | 物件更新 | PUT | `/api/properties/{propertyId}` |
| API-UNIT-001 | 部屋一覧取得 | GET | `/api/units` |
| API-UNIT-002 | 部屋登録 | POST | `/api/units` |
| API-UNIT-003 | 部屋更新 | PUT | `/api/units/{unitId}` |
| API-INC-001 | 収入登録 | POST | `/api/incomes` |
| API-EXP-001 | 支出登録 | POST | `/api/expenses` |
| API-SUM-001 | 月次収支取得 | GET | `/api/monthly-summaries` |
| API-REP-001 | 修繕履歴一覧取得 | GET | `/api/repairs` |
| API-REP-002 | 修繕履歴登録 | POST | `/api/repairs` |
| API-TASK-001 | 要対応一覧取得 | GET | `/api/tasks/attention` |
| API-CSV-001 | CSV出力 | GET | `/api/export/csv` |

---

## 4. API詳細

## 4.1 API-DASH-001 ダッシュボード取得
### 概要
トップ画面に表示する全体サマリーを返す。

### リクエスト
- query:
  - targetMonth（任意）

### レスポンス例
```json
{
  "targetMonth": "2026-05",
  "propertyCount": 6,
  "unitCount": 18,
  "vacantCount": 2,
  "incomeTotal": 820000,
  "expenseTotal": 240000,
  "cashflow": 580000,
  "attentionCount": 4,
  "attentionProperties": [
    {
      "propertyId": "prop_001",
      "propertyName": "○○アパート",
      "attentionReason": "空室2件"
    }
  ]
}
```

## 4.2 API-PROP-001 物件一覧取得
### リクエスト
- query:
  - keyword
  - propertyType
  - sortBy
  - page
  - pageSize

### レスポンス項目
- items[]
  - propertyId
  - propertyName
  - propertyType
  - address
  - unitCount
  - vacantCount
  - occupancyRate
  - monthlyCashflow
  - attentionCount
- pagination

## 4.3 API-PROP-002 物件詳細取得
### レスポンス項目
- property
- units[]
- monthlySummary
- repairRecords[]
- attentionItems[]

## 4.4 API-PROP-003 物件登録
### リクエスト項目
- propertyName
- propertyType
- postalCode
- address
- purchaseDate
- purchasePrice
- ownershipStatus
- note

### レスポンス
- propertyId
- message

## 4.5 API-PROP-004 物件更新
### リクエスト項目
API-PROP-003に準ずる。

---

## 4.6 API-UNIT-001 部屋一覧取得
### リクエスト
- query:
  - propertyId
  - status
  - keyword

### レスポンス項目
- unitId
- propertyId
- propertyName
- roomNumber
- layout
- floorArea
- rentAmount
- commonFee
- status
- contractEndDate

## 4.7 API-UNIT-002 部屋登録
### リクエスト項目
- propertyId
- roomNumber
- layout
- floorArea
- rentAmount
- commonFee
- status
- recruitingStartDate
- note

## 4.8 API-UNIT-003 部屋更新
### リクエスト項目
API-UNIT-002に準ずる。

---

## 4.9 API-INC-001 収入登録
### リクエスト項目
- propertyId
- unitId
- incomeDate
- targetMonth
- category
- amount
- memo

## 4.10 API-EXP-001 支出登録
### リクエスト項目
- propertyId
- unitId
- expenseDate
- targetMonth
- category
- amount
- vendor
- memo

---

## 4.11 API-SUM-001 月次収支取得
### リクエスト
- query:
  - targetMonth（必須）
  - propertyId（任意）

### レスポンス項目
- targetMonth
- incomeTotal
- expenseTotal
- cashflow
- propertySummaries[]

---

## 4.12 API-REP-001 修繕履歴一覧取得
### リクエスト
- query:
  - propertyId
  - unitId
  - status

### レスポンス項目
- repairRecordId
- propertyId
- propertyName
- unitId
- roomNumber
- repairCategory
- description
- cost
- status
- repairedOn

## 4.13 API-REP-002 修繕履歴登録
### リクエスト項目
- propertyId
- unitId
- occurredOn
- repairedOn
- repairCategory
- description
- cost
- status
- memo

---

## 4.14 API-TASK-001 要対応一覧取得
### リクエスト
- query:
  - type
  - priority
  - propertyId

### レスポンス項目
- attentionType
- propertyId
- propertyName
- unitId
- roomNumber
- title
- dueDate
- priority
- status

---

## 4.15 API-CSV-001 CSV出力
### リクエスト
- query:
  - target（properties / incomes / expenses / repairs）
  - targetMonth
  - propertyId

### レスポンス
- CSVファイル

---

## 5. エラー設計方針

| HTTPステータス | 用途 |
|---|---|
| 200 | 正常取得 |
| 201 | 正常登録 |
| 400 | 入力不正 |
| 401 | 未認証（将来対応） |
| 403 | 権限不足（将来対応） |
| 404 | 対象なし |
| 500 | サーバー内部エラー |

### エラーレスポンス例
```json
{
  "code": "VALIDATION_ERROR",
  "message": "入力内容に誤りがあります",
  "details": [
    {
      "field": "propertyName",
      "message": "物件名は必須です"
    }
  ]
}
```

---

## 6. ページング・検索方針

- 物件一覧、部屋一覧、修繕履歴一覧はページングを考慮する
- キーワード検索、種別絞り込み、並び替えに対応する
- 初期データ量が小さくても将来拡張を妨げない仕様にする

---

## 7. フェーズ9時点の結論

APIは、**ダッシュボード・一覧・詳細・登録**を中心とした最小構成で定義し、MVPの画面要件を過不足なく支えることを目的とする。
