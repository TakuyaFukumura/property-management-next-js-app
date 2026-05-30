import {samplePortfolio} from '../../../../../lib/property-management';

const expenseCategories = Array.from(new Set(samplePortfolio.expenses.map((expense) => expense.category)));

export default function ExpenseFormPage() {
    return (
        <main className="min-h-[calc(100vh-4rem)] bg-slate-50 px-4 py-8 text-slate-900 dark:bg-slate-950 dark:text-slate-100 sm:px-6 lg:px-8">
            <div className="mx-auto flex max-w-4xl flex-col gap-6">
                <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">支出登録</h1>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                        管理費や修繕費などの支出を登録します。保存後は月次収支画面に反映される想定です。
                    </p>
                </section>

                <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <form className="space-y-4">
                        <div className="grid gap-4 sm:grid-cols-2">
                            <label className="block text-sm font-medium">
                                物件 <span className="text-rose-500">*</span>
                                <select className="mt-1 block w-full rounded-xl border border-slate-300 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-950" required>
                                    <option value="">選択してください</option>
                                    {samplePortfolio.properties.map((property) => (
                                        <option key={property.id} value={property.id}>{property.name}</option>
                                    ))}
                                </select>
                            </label>
                            <label className="block text-sm font-medium">
                                部屋（任意）
                                <input className="mt-1 block w-full rounded-xl border border-slate-300 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-950"/>
                            </label>
                            <label className="block text-sm font-medium">
                                支出日 <span className="text-rose-500">*</span>
                                <input type="date" className="mt-1 block w-full rounded-xl border border-slate-300 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-950" required/>
                            </label>
                            <label className="block text-sm font-medium">
                                対象月 <span className="text-rose-500">*</span>
                                <input type="month" className="mt-1 block w-full rounded-xl border border-slate-300 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-950" required/>
                            </label>
                            <label className="block text-sm font-medium">
                                支出カテゴリ <span className="text-rose-500">*</span>
                                <select className="mt-1 block w-full rounded-xl border border-slate-300 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-950" required>
                                    <option value="">選択してください</option>
                                    {expenseCategories.map((category) => (
                                        <option key={category} value={category}>{category}</option>
                                    ))}
                                </select>
                            </label>
                            <label className="block text-sm font-medium">
                                金額（円） <span className="text-rose-500">*</span>
                                <input type="number" min="0" step="1" className="mt-1 block w-full rounded-xl border border-slate-300 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-950" required/>
                            </label>
                            <label className="block text-sm font-medium sm:col-span-2">
                                支払先
                                <input className="mt-1 block w-full rounded-xl border border-slate-300 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-950"/>
                            </label>
                        </div>
                        <label className="block text-sm font-medium">
                            メモ
                            <textarea rows={4} className="mt-1 block w-full rounded-xl border border-slate-300 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-950"/>
                        </label>
                        <button type="submit" className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-500">
                            登録
                        </button>
                    </form>
                </section>
            </div>
        </main>
    );
}
