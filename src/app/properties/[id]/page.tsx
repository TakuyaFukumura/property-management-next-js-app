import {notFound} from 'next/navigation';
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
} from '../../../../lib/property-management';

const dashboard = buildDashboardSnapshot(samplePortfolio, DEFAULT_TARGET_MONTH);

export function generateStaticParams() {
    return samplePortfolio.properties.map((p) => ({id: p.id}));
}

export default async function PropertyDetailPage({params}: {params: Promise<{id: string}>}) {
    const {id} = await params;
    const property = samplePortfolio.properties.find((p) => p.id === id);
    if (!property) {
        notFound();
    }

    const summary = dashboard.propertySummaries.find((s) => s.propertyId === id);
    const units = dashboard.units.filter((u) => u.propertyId === id);
    const repairs = dashboard.repairs.filter((r) => r.propertyId === id);
    const attentionItems = dashboard.attentionItems.filter((a) => a.propertyId === id);
    const monthlyIncomes = dashboard.monthlyIncomes.filter((i) => i.propertyId === id);
    const monthlyExpenses = dashboard.monthlyExpenses.filter((e) => e.propertyId === id);

    const badgeClassNames = {
        high: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-200',
        medium: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-200',
        low: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-200',
    };

    return (
        <main className="min-h-[calc(100vh-4rem)] bg-slate-50 px-4 py-8 text-slate-900 dark:bg-slate-950 dark:text-slate-100 sm:px-6 lg:px-8">
            <div className="mx-auto flex max-w-7xl flex-col gap-8">
                {/* ヘッダー */}
                <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div className="space-y-2">
                            <div className="flex items-center gap-3">
                                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{property.name}</h1>
                                <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-200">
                                    {getStatusLabel(property.ownershipStatus)}
                                </span>
                            </div>
                            <p className="text-sm text-slate-500 dark:text-slate-400">{property.type} ・ {property.address}</p>
                        </div>
                    </div>
                </section>

                {/* 基本情報 + 収支サマリー */}
                <div className="grid gap-6 lg:grid-cols-2">
                    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                        <h2 className="mb-4 text-lg font-semibold">基本情報</h2>
                        <dl className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <dt className="text-slate-500 dark:text-slate-400">購入価格</dt>
                                <dd className="mt-1 font-semibold">{formatCurrency(property.purchasePrice)}</dd>
                            </div>
                            <div>
                                <dt className="text-slate-500 dark:text-slate-400">購入日</dt>
                                <dd className="mt-1 font-semibold">{formatDateLabel(property.purchaseDate)}</dd>
                            </div>
                            <div>
                                <dt className="text-slate-500 dark:text-slate-400">総部屋数</dt>
                                <dd className="mt-1 font-semibold">{summary?.totalUnits ?? 0}室</dd>
                            </div>
                            <div>
                                <dt className="text-slate-500 dark:text-slate-400">空室数</dt>
                                <dd className="mt-1 font-semibold">{summary?.vacantUnits ?? 0}室</dd>
                            </div>
                            <div>
                                <dt className="text-slate-500 dark:text-slate-400">稼働率</dt>
                                <dd className="mt-1 font-semibold">{formatPercentage(summary?.occupancyRate ?? 0)}</dd>
                            </div>
                            <div>
                                <dt className="text-slate-500 dark:text-slate-400">要対応件数</dt>
                                <dd className="mt-1 font-semibold">{summary?.attentionCount ?? 0}件</dd>
                            </div>
                        </dl>
                        {property.note && (
                            <p className="mt-4 rounded-xl border border-dashed border-slate-300 p-3 text-sm text-slate-600 dark:border-slate-700 dark:text-slate-300">
                                {property.note}
                            </p>
                        )}
                    </section>

                    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                        <h2 className="mb-4 text-lg font-semibold">
                            {formatMonthLabel(dashboard.targetMonth)} 収支サマリー
                        </h2>
                        <div className="grid grid-cols-3 gap-4">
                            <article className="rounded-2xl bg-emerald-50 p-4 dark:bg-emerald-900/20">
                                <p className="text-xs text-emerald-700 dark:text-emerald-200">収入</p>
                                <p className="mt-2 text-lg font-semibold">{formatCurrency(summary?.monthlyIncome ?? 0)}</p>
                            </article>
                            <article className="rounded-2xl bg-rose-50 p-4 dark:bg-rose-900/20">
                                <p className="text-xs text-rose-700 dark:text-rose-200">支出</p>
                                <p className="mt-2 text-lg font-semibold">{formatCurrency(summary?.monthlyExpense ?? 0)}</p>
                            </article>
                            <article className="rounded-2xl bg-blue-50 p-4 dark:bg-blue-900/20">
                                <p className="text-xs text-blue-700 dark:text-blue-200">収支</p>
                                <p className="mt-2 text-lg font-semibold">{formatCurrency(summary?.monthlyBalance ?? 0)}</p>
                            </article>
                        </div>

                        <div className="mt-4 space-y-2">
                            <div>
                                <p className="mb-2 text-sm font-medium text-slate-500 dark:text-slate-400">収入内訳</p>
                                {monthlyIncomes.length === 0 ? (
                                    <p className="text-sm text-slate-400">データなし</p>
                                ) : (
                                    <ul className="space-y-1 text-sm">
                                        {monthlyIncomes.map((inc) => (
                                            <li key={inc.id} className="flex justify-between">
                                                <span className="text-slate-600 dark:text-slate-300">{inc.category}{inc.memo ? `（${inc.memo}）` : ''}</span>
                                                <span className="font-medium">{formatCurrency(inc.amount)}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                            <div>
                                <p className="mb-2 text-sm font-medium text-slate-500 dark:text-slate-400">支出内訳</p>
                                {monthlyExpenses.length === 0 ? (
                                    <p className="text-sm text-slate-400">データなし</p>
                                ) : (
                                    <ul className="space-y-1 text-sm">
                                        {monthlyExpenses.map((exp) => (
                                            <li key={exp.id} className="flex justify-between">
                                                <span className="text-slate-600 dark:text-slate-300">{exp.category}{exp.vendor ? `（${exp.vendor}）` : ''}</span>
                                                <span className="font-medium">{formatCurrency(exp.amount)}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    </section>
                </div>

                {/* 部屋一覧 */}
                <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <h2 className="mb-4 text-lg font-semibold">部屋一覧</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-slate-200 text-left text-sm dark:divide-slate-800">
                            <thead>
                            <tr className="text-slate-500 dark:text-slate-400">
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
                            {units.map((unit) => (
                                <tr key={unit.id} className="align-top">
                                    <td className="px-3 py-3 font-medium">{unit.roomNumber}</td>
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

                {/* 修繕履歴 */}
                <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <h2 className="mb-4 text-lg font-semibold">修繕履歴</h2>
                    {repairs.length === 0 ? (
                        <p className="text-sm text-slate-400">修繕履歴はありません。</p>
                    ) : (
                        <div className="space-y-4">
                            {repairs.map((repair) => {
                                const unit = repair.unitId ? units.find((u) => u.id === repair.unitId) : undefined;
                                return (
                                    <article key={repair.id} className="rounded-2xl border border-slate-200 p-4 dark:border-slate-800">
                                        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                                            <div>
                                                <h3 className="font-semibold">{repair.description}</h3>
                                                {unit && (
                                                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{unit.roomNumber}号室</p>
                                                )}
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
                    )}
                </section>

                {/* 要対応一覧 */}
                <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <h2 className="mb-4 text-lg font-semibold">要対応事項</h2>
                    {attentionItems.length === 0 ? (
                        <p className="text-sm text-slate-400">要対応事項はありません。</p>
                    ) : (
                        <div className="space-y-3">
                            {attentionItems.map((item) => (
                                <article key={item.id} className="rounded-2xl border border-slate-200 p-4 dark:border-slate-800">
                                    <div className="flex items-start justify-between gap-3">
                                        <div>
                                            <p className="text-sm text-slate-500 dark:text-slate-400">{item.roomNumber}</p>
                                            <h3 className="mt-1 font-semibold">{item.title}</h3>
                                        </div>
                                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${badgeClassNames[item.priority]}`}>
                                            優先度 {getPriorityLabel(item.priority)}
                                        </span>
                                    </div>
                                    <dl className="mt-3 grid grid-cols-2 gap-3 text-sm">
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
                    )}
                </section>
            </div>
        </main>
    );
}
