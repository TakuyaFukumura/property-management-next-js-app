import {samplePortfolio} from '../../../../lib/property-management';

const unitStatuses = [
    {value: 'occupied', label: '入居中'},
    {value: 'vacant', label: '空室'},
    {value: 'reserved', label: '募集停止'},
];

export default function UnitFormPage() {
    return (
        <main className="min-h-[calc(100vh-4rem)] bg-slate-50 px-4 py-8 text-slate-900 dark:bg-slate-950 dark:text-slate-100 sm:px-6 lg:px-8">
            <div className="mx-auto flex max-w-4xl flex-col gap-6">
                <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">部屋登録・編集</h1>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                        部屋情報を登録または編集します。必須項目を入力して保存してください。
                    </p>
                </section>

                <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <form className="space-y-4">
                        <label className="block text-sm font-medium">
                            物件 <span className="text-rose-500">*</span>
                            <select className="mt-1 block w-full rounded-xl border border-slate-300 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-950" required>
                                <option value="">選択してください</option>
                                {samplePortfolio.properties.map((property) => (
                                    <option key={property.id} value={property.id}>{property.name}</option>
                                ))}
                            </select>
                        </label>
                        <div className="grid gap-4 sm:grid-cols-2">
                            <label className="block text-sm font-medium">
                                部屋番号 <span className="text-rose-500">*</span>
                                <input className="mt-1 block w-full rounded-xl border border-slate-300 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-950" required/>
                            </label>
                            <label className="block text-sm font-medium">
                                間取り <span className="text-rose-500">*</span>
                                <input className="mt-1 block w-full rounded-xl border border-slate-300 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-950" required/>
                            </label>
                            <label className="block text-sm font-medium">
                                面積（㎡） <span className="text-rose-500">*</span>
                                <input type="number" min="0" step="0.1" className="mt-1 block w-full rounded-xl border border-slate-300 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-950" required/>
                            </label>
                            <label className="block text-sm font-medium">
                                ステータス <span className="text-rose-500">*</span>
                                <select className="mt-1 block w-full rounded-xl border border-slate-300 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-950" required>
                                    {unitStatuses.map((status) => (
                                        <option key={status.value} value={status.value}>{status.label}</option>
                                    ))}
                                </select>
                            </label>
                            <label className="block text-sm font-medium">
                                賃料（円） <span className="text-rose-500">*</span>
                                <input type="number" min="0" step="1" className="mt-1 block w-full rounded-xl border border-slate-300 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-950" required/>
                            </label>
                            <label className="block text-sm font-medium">
                                共益費（円）
                                <input type="number" min="0" step="1" className="mt-1 block w-full rounded-xl border border-slate-300 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-950"/>
                            </label>
                            <label className="block text-sm font-medium">
                                募集開始日
                                <input type="date" className="mt-1 block w-full rounded-xl border border-slate-300 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-950"/>
                            </label>
                        </div>
                        <label className="block text-sm font-medium">
                            備考
                            <textarea rows={4} className="mt-1 block w-full rounded-xl border border-slate-300 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-950"/>
                        </label>
                        <button type="submit" className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-500">
                            保存
                        </button>
                    </form>
                </section>
            </div>
        </main>
    );
}
