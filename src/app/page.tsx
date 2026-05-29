import Link from 'next/link';
import {
    buildDashboardSnapshot,
    DEFAULT_TARGET_MONTH,
    formatCurrency,
    formatDateLabel,
    formatMonthLabel,
    formatPercentage,
    getPriorityLabel,
    getStatusLabel,
    samplePortfolio,
} from '../../lib/property-management';

const dashboard = buildDashboardSnapshot(samplePortfolio, DEFAULT_TARGET_MONTH);
const propertySummaryMap = new Map(dashboard.propertySummaries.map((s) => [s.propertyId, s]));

const kpiCards = [
    {label: '総物件数', value: `${dashboard.totalProperties}棟`},
    {label: '総部屋数', value: `${dashboard.totalUnits}室`},
    {label: '空室数', value: `${dashboard.vacantUnits}室`},
    {label: '当月総収入', value: formatCurrency(dashboard.totalIncome)},
    {label: '当月総支出', value: formatCurrency(dashboard.totalExpense)},
    {label: '当月収支差額', value: formatCurrency(dashboard.cashflow)},
    {label: '要対応件数', value: `${dashboard.attentionCount}件`},
];

const linkClassName = 'rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-medium text-blue-700 transition hover:border-blue-300 hover:bg-blue-50 dark:border-blue-800 dark:bg-gray-900 dark:text-blue-200 dark:hover:bg-gray-800';

const badgeClassNames = {
    high: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-200',
    medium: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-200',
    low: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-200',
};

export default function Home() {
    return (
        <main className="min-h-[calc(100vh-4rem)] bg-slate-50 px-4 py-8 text-slate-900 dark:bg-slate-950 dark:text-slate-100 sm:px-6 lg:px-8">
            <div className="mx-auto flex max-w-7xl flex-col gap-8">
                <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                        <div className="space-y-4">
                            <p className="text-sm font-semibold tracking-[0.2em] text-blue-600 dark:text-blue-300">
                                RENTAL MANAGEMENT MVP
                            </p>
                            <div className="space-y-3">
                                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                                    賃貸管理システム
                                </h1>
                                <p className="max-w-3xl text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base">
                                    物件・部屋・収支・修繕・要対応事項をひとつの画面で把握できる、
                                    不動産投資家向けのMVPダッシュボードです。仕様書に沿って、
                                    {formatMonthLabel(dashboard.targetMonth)}
                                    の運営状況を一覧化しています。
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <Link className={linkClassName} href="/properties">物件一覧</Link>
                            <Link className={linkClassName} href="/units">部屋一覧</Link>
                            <Link className={linkClassName} href="/finance">月次収支</Link>
                            <Link className={linkClassName} href="/repairs">修繕履歴</Link>
                            <Link className={linkClassName} href="/tasks">要対応一覧</Link>
                        </div>
                    </div>
                </section>

                <section aria-label="主要KPI" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {kpiCards.map((card) => (
                        <article
                            key={card.label}
                            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
                        >
                            <p className="text-sm text-slate-500 dark:text-slate-400">{card.label}</p>
                            <p className="mt-3 text-2xl font-semibold">{card.value}</p>
                        </article>
                    ))}
                </section>

                <section
                    id="properties"
                    className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
                >
                    <div className="mb-6 flex flex-col gap-2">
                        <h2 className="text-2xl font-semibold">物件一覧・物件詳細サマリー</h2>
                        <p className="text-sm text-slate-600 dark:text-slate-300">
                            物件ごとの稼働率、当月収支、要対応件数を比較できます。
                        </p>
                    </div>

                    <div className="grid gap-4 lg:grid-cols-3">
                        {samplePortfolio.properties.map((property) => {
                            const summary = propertySummaryMap.get(property.id);

                            return (
                                <article
                                    key={property.id}
                                    className="flex h-full flex-col gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950"
                                >
                                    <div className="space-y-2">
                                        <div className="flex items-start justify-between gap-4">
                                            <div>
                                                <h3 className="text-xl font-semibold">{property.name}</h3>
                                                <p className="text-sm text-slate-500 dark:text-slate-400">{property.type}</p>
                                            </div>
                                            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-200">
                                                {getStatusLabel(property.ownershipStatus)}
                                            </span>
                                        </div>
                                        <p className="text-sm text-slate-600 dark:text-slate-300">{property.address}</p>
                                    </div>

                                    <dl className="grid grid-cols-2 gap-3 text-sm">
                                        <div className="rounded-xl bg-white p-3 dark:bg-slate-900">
                                            <dt className="text-slate-500 dark:text-slate-400">購入価格</dt>
                                            <dd className="mt-1 font-semibold">{formatCurrency(property.purchasePrice)}</dd>
                                        </div>
                                        <div className="rounded-xl bg-white p-3 dark:bg-slate-900">
                                            <dt className="text-slate-500 dark:text-slate-400">購入日</dt>
                                            <dd className="mt-1 font-semibold">{formatDateLabel(property.purchaseDate)}</dd>
                                        </div>
                                        <div className="rounded-xl bg-white p-3 dark:bg-slate-900">
                                            <dt className="text-slate-500 dark:text-slate-400">稼働率</dt>
                                            <dd className="mt-1 font-semibold">{formatPercentage(summary?.occupancyRate ?? 0)}</dd>
                                        </div>
                                        <div className="rounded-xl bg-white p-3 dark:bg-slate-900">
                                            <dt className="text-slate-500 dark:text-slate-400">当月収支</dt>
                                            <dd className="mt-1 font-semibold">{formatCurrency(summary?.monthlyBalance ?? 0)}</dd>
                                        </div>
                                        <div className="rounded-xl bg-white p-3 dark:bg-slate-900">
                                            <dt className="text-slate-500 dark:text-slate-400">空室/総部屋</dt>
                                            <dd className="mt-1 font-semibold">
                                                {summary?.vacantUnits ?? 0}/{summary?.totalUnits ?? 0}
                                            </dd>
                                        </div>
                                        <div className="rounded-xl bg-white p-3 dark:bg-slate-900">
                                            <dt className="text-slate-500 dark:text-slate-400">要対応件数</dt>
                                            <dd className="mt-1 font-semibold">{summary?.attentionCount ?? 0}件</dd>
                                        </div>
                                    </dl>

                                    <p className="mt-auto rounded-xl border border-dashed border-slate-300 p-3 text-sm text-slate-600 dark:border-slate-700 dark:text-slate-300">
                                        {summary?.note}
                                    </p>
                                    <Link
                                        href={`/properties/${property.id}`}
                                        className="mt-2 block rounded-xl bg-blue-50 px-4 py-2 text-center text-sm font-medium text-blue-700 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-200 dark:hover:bg-blue-900/40"
                                    >
                                        詳細を見る
                                    </Link>
                                </article>
                            );
                        })}
                    </div>
                </section>

                <section
                    id="units"
                    className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
                >
                    <div className="mb-6 flex flex-col gap-2">
                        <h2 className="text-2xl font-semibold">部屋一覧・稼働状況</h2>
                        <p className="text-sm text-slate-600 dark:text-slate-300">
                            部屋単位で賃料、ステータス、契約終了予定日を確認できます。
                        </p>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-slate-200 text-left text-sm dark:divide-slate-800">
                            <thead>
                            <tr className="text-slate-500 dark:text-slate-400">
                                <th scope="col" className="px-3 py-3 font-medium">物件名</th>
                                <th scope="col" className="px-3 py-3 font-medium">部屋番号</th>
                                <th scope="col" className="px-3 py-3 font-medium">間取り</th>
                                <th scope="col" className="px-3 py-3 font-medium">面積</th>
                                <th scope="col" className="px-3 py-3 font-medium">賃料</th>
                                <th scope="col" className="px-3 py-3 font-medium">共益費</th>
                                <th scope="col" className="px-3 py-3 font-medium">ステータス</th>
                                <th scope="col" className="px-3 py-3 font-medium">契約終了予定日</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                            {dashboard.units.map((unit) => (
                                <tr key={unit.id} className="align-top">
                                    <td className="px-3 py-3 font-medium">{unit.propertyName}</td>
                                    <td className="px-3 py-3">{unit.roomNumber}</td>
                                    <td className="px-3 py-3">{unit.layout}</td>
                                    <td className="px-3 py-3">{unit.floorArea.toFixed(1)}㎡</td>
                                    <td className="px-3 py-3">{formatCurrency(unit.rentAmount)}</td>
                                    <td className="px-3 py-3">{formatCurrency(unit.commonFee)}</td>
                                    <td className="px-3 py-3">
                                            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                                                {getStatusLabel(unit.status)}
                                            </span>
                                    </td>
                                    <td className="px-3 py-3">{formatDateLabel(unit.contractEndDate)}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                <section
                    id="finance"
                    className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
                >
                    <div className="mb-6 flex flex-col gap-2">
                        <h2 className="text-2xl font-semibold">月次収支サマリー</h2>
                        <p className="text-sm text-slate-600 dark:text-slate-300">
                            {formatMonthLabel(dashboard.targetMonth)}
                            の収入・支出・キャッシュフローを物件別に確認できます。
                        </p>
                    </div>

                    <div className="grid gap-4 md:grid-cols-3">
                        <article className="rounded-2xl bg-emerald-50 p-5 dark:bg-emerald-900/20">
                            <p className="text-sm text-emerald-700 dark:text-emerald-200">総収入</p>
                            <p className="mt-3 text-2xl font-semibold">{formatCurrency(dashboard.totalIncome)}</p>
                        </article>
                        <article className="rounded-2xl bg-rose-50 p-5 dark:bg-rose-900/20">
                            <p className="text-sm text-rose-700 dark:text-rose-200">総支出</p>
                            <p className="mt-3 text-2xl font-semibold">{formatCurrency(dashboard.totalExpense)}</p>
                        </article>
                        <article className="rounded-2xl bg-blue-50 p-5 dark:bg-blue-900/20">
                            <p className="text-sm text-blue-700 dark:text-blue-200">収支差額</p>
                            <p className="mt-3 text-2xl font-semibold">{formatCurrency(dashboard.cashflow)}</p>
                        </article>
                    </div>

                    <div className="mt-6 overflow-x-auto">
                        <table className="min-w-full divide-y divide-slate-200 text-left text-sm dark:divide-slate-800">
                            <thead>
                            <tr className="text-slate-500 dark:text-slate-400">
                                <th scope="col" className="px-3 py-3 font-medium">物件名</th>
                                <th scope="col" className="px-3 py-3 font-medium">当月収入</th>
                                <th scope="col" className="px-3 py-3 font-medium">当月支出</th>
                                <th scope="col" className="px-3 py-3 font-medium">当月収支</th>
                                <th scope="col" className="px-3 py-3 font-medium">要対応件数</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                            {dashboard.propertySummaries.map((summary) => (
                                <tr key={summary.propertyId}>
                                    <td className="px-3 py-3 font-medium">{summary.propertyName}</td>
                                    <td className="px-3 py-3">{formatCurrency(summary.monthlyIncome)}</td>
                                    <td className="px-3 py-3">{formatCurrency(summary.monthlyExpense)}</td>
                                    <td className="px-3 py-3">{formatCurrency(summary.monthlyBalance)}</td>
                                    <td className="px-3 py-3">{summary.attentionCount}件</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                <div className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
                    <section
                        id="repairs"
                        className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
                    >
                        <div className="mb-6 flex flex-col gap-2">
                            <h2 className="text-2xl font-semibold">修繕履歴</h2>
                            <p className="text-sm text-slate-600 dark:text-slate-300">
                                未完了修繕を含む履歴を時系列で確認できます。
                            </p>
                        </div>

                        <div className="space-y-4">
                            {dashboard.repairs.map((repair) => {
                                const property = samplePortfolio.properties.find((item) => item.id === repair.propertyId);
                                const unit = repair.unitId ? dashboard.units.find((item) => item.id === repair.unitId) : undefined;

                                return (
                                    <article
                                        key={repair.id}
                                        className="rounded-2xl border border-slate-200 p-4 dark:border-slate-800"
                                    >
                                        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                                            <div>
                                                <h3 className="font-semibold">{repair.description}</h3>
                                                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                                    {property?.name}
                                                    {unit ? ` / ${unit.roomNumber}号室` : ''}
                                                </p>
                                            </div>
                                            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                                                {getStatusLabel(repair.status)}
                                            </span>
                                        </div>
                                        <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-3">
                                            <div>
                                                <dt className="text-slate-500 dark:text-slate-400">カテゴリ</dt>
                                                <dd className="mt-1 font-medium">{repair.repairCategory}</dd>
                                            </div>
                                            <div>
                                                <dt className="text-slate-500 dark:text-slate-400">発生日</dt>
                                                <dd className="mt-1 font-medium">{formatDateLabel(repair.occurredOn)}</dd>
                                            </div>
                                            <div>
                                                <dt className="text-slate-500 dark:text-slate-400">費用</dt>
                                                <dd className="mt-1 font-medium">{repair.cost != null ? formatCurrency(repair.cost) : '未設定'}</dd>
                                            </div>
                                        </dl>
                                    </article>
                                );
                            })}
                        </div>
                    </section>

                    <section
                        id="tasks"
                        className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
                    >
                        <div className="mb-6 flex flex-col gap-2">
                            <h2 className="text-2xl font-semibold">要対応一覧</h2>
                            <p className="text-sm text-slate-600 dark:text-slate-300">
                                空室、契約更新、未完了修繕、手動タスクをまとめて確認できます。
                            </p>
                        </div>

                        <div className="space-y-3">
                            {dashboard.attentionItems.map((item) => (
                                <article
                                    key={item.id}
                                    className="rounded-2xl border border-slate-200 p-4 dark:border-slate-800"
                                >
                                    <div className="flex items-start justify-between gap-3">
                                        <div>
                                            <p className="text-sm text-slate-500 dark:text-slate-400">{item.propertyName} / {item.roomNumber}</p>
                                            <h3 className="mt-1 font-semibold">{item.title}</h3>
                                        </div>
                                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${badgeClassNames[item.priority]}`}>
                                            優先度 {getPriorityLabel(item.priority)}
                                        </span>
                                    </div>
                                    <dl className="mt-3 grid grid-cols-2 gap-3 text-sm">
                                        <div>
                                            <dt className="text-slate-500 dark:text-slate-400">種別</dt>
                                            <dd className="mt-1 font-medium">{item.type}</dd>
                                        </div>
                                        <div>
                                            <dt className="text-slate-500 dark:text-slate-400">期限/基準日</dt>
                                            <dd className="mt-1 font-medium">{item.dueLabel}</dd>
                                        </div>
                                        <div>
                                            <dt className="text-slate-500 dark:text-slate-400">ステータス</dt>
                                            <dd className="mt-1 font-medium">{item.status}</dd>
                                        </div>
                                    </dl>
                                </article>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}
