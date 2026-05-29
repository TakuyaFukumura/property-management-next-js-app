import {
    buildDashboardSnapshot,
    DEFAULT_TARGET_MONTH,
    formatCurrency,
    formatDateLabel,
    formatMonthLabel,
    samplePortfolio,
} from '../../../lib/property-management';

const dashboard = buildDashboardSnapshot(samplePortfolio, DEFAULT_TARGET_MONTH);

export default function FinancePage() {
    return (
        <main className="min-h-[calc(100vh-4rem)] bg-slate-50 px-4 py-8 text-slate-900 dark:bg-slate-950 dark:text-slate-100 sm:px-6 lg:px-8">
            <div className="mx-auto flex max-w-7xl flex-col gap-8">
                <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">月次収支</h1>
                        <p className="text-sm text-slate-600 dark:text-slate-300">
                            {formatMonthLabel(dashboard.targetMonth)}の収入・支出・キャッシュフローを確認できます。
                        </p>
                    </div>
                </section>

                {/* KPIカード */}
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

                {/* 物件別収支 */}
                <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <h2 className="mb-4 text-lg font-semibold">物件別収支</h2>
                    <div className="overflow-x-auto">
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
                                <tr key={summary.propertyId} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
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

                {/* 収入明細 */}
                <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <h2 className="mb-4 text-lg font-semibold">収入明細</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-slate-200 text-left text-sm dark:divide-slate-800">
                            <thead>
                            <tr className="text-slate-500 dark:text-slate-400">
                                <th scope="col" className="px-3 py-3 font-medium">入金日</th>
                                <th scope="col" className="px-3 py-3 font-medium">物件名</th>
                                <th scope="col" className="px-3 py-3 font-medium">カテゴリ</th>
                                <th scope="col" className="px-3 py-3 font-medium">金額</th>
                                <th scope="col" className="px-3 py-3 font-medium">メモ</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                            {dashboard.monthlyIncomes.map((income) => {
                                const property = samplePortfolio.properties.find((p) => p.id === income.propertyId);
                                return (
                                    <tr key={income.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                                        <td className="px-3 py-3">{formatDateLabel(income.incomeDate)}</td>
                                        <td className="px-3 py-3 font-medium">{property?.name ?? '-'}</td>
                                        <td className="px-3 py-3">{income.category}</td>
                                        <td className="px-3 py-3">{formatCurrency(income.amount)}</td>
                                        <td className="px-3 py-3 text-slate-500 dark:text-slate-400">{income.memo ?? '-'}</td>
                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* 支出明細 */}
                <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <h2 className="mb-4 text-lg font-semibold">支出明細</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-slate-200 text-left text-sm dark:divide-slate-800">
                            <thead>
                            <tr className="text-slate-500 dark:text-slate-400">
                                <th scope="col" className="px-3 py-3 font-medium">支出日</th>
                                <th scope="col" className="px-3 py-3 font-medium">物件名</th>
                                <th scope="col" className="px-3 py-3 font-medium">カテゴリ</th>
                                <th scope="col" className="px-3 py-3 font-medium">金額</th>
                                <th scope="col" className="px-3 py-3 font-medium">支払先</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                            {dashboard.monthlyExpenses.map((expense) => {
                                const property = samplePortfolio.properties.find((p) => p.id === expense.propertyId);
                                return (
                                    <tr key={expense.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                                        <td className="px-3 py-3">{formatDateLabel(expense.expenseDate)}</td>
                                        <td className="px-3 py-3 font-medium">{property?.name ?? '-'}</td>
                                        <td className="px-3 py-3">{expense.category}</td>
                                        <td className="px-3 py-3">{formatCurrency(expense.amount)}</td>
                                        <td className="px-3 py-3 text-slate-500 dark:text-slate-400">{expense.vendor ?? '-'}</td>
                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </main>
    );
}
