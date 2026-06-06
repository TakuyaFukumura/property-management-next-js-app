import {samplePortfolio} from '../../../lib/property-management';

const incomeCategories = Array.from(new Set(samplePortfolio.incomes.map((income) => income.category)));
const expenseCategories = Array.from(new Set(samplePortfolio.expenses.map((expense) => expense.category)));

export default function SettingsPage() {
    return (
        <main className="min-h-[calc(100vh-4rem)] bg-slate-50 px-4 py-8 text-slate-900 dark:bg-slate-950 dark:text-slate-100 sm:px-6 lg:px-8">
            <div className="mx-auto flex max-w-5xl flex-col gap-8">
                <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">設定画面</h1>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                        収入カテゴリ・支出カテゴリ・基本設定を確認できます。
                    </p>
                </section>

                <section className="grid gap-6 md:grid-cols-2">
                    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                        <h2 className="text-lg font-semibold">収入カテゴリ設定</h2>
                        <ul className="mt-3 space-y-2 text-sm">
                            {incomeCategories.map((category) => (
                                <li key={category} className="rounded-xl bg-slate-50 px-3 py-2 dark:bg-slate-950">{category}</li>
                            ))}
                        </ul>
                    </article>
                    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                        <h2 className="text-lg font-semibold">支出カテゴリ設定</h2>
                        <ul className="mt-3 space-y-2 text-sm">
                            {expenseCategories.map((category) => (
                                <li key={category} className="rounded-xl bg-slate-50 px-3 py-2 dark:bg-slate-950">{category}</li>
                            ))}
                        </ul>
                    </article>
                </section>

                <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <h2 className="text-lg font-semibold">基本設定</h2>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                        物件種別設定は将来拡張として実装予定です。
                    </p>
                </section>
            </div>
        </main>
    );
}
