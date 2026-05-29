export type PropertyStatus = 'active' | 'sold' | 'paused';
export type UnitStatus = 'occupied' | 'vacant' | 'recruiting' | 'unavailable';
export type RepairStatus = 'planned' | 'in_progress' | 'completed' | 'cancelled';
export type TaskPriority = 'high' | 'medium' | 'low';
export type TaskStatus = 'open' | 'in_progress' | 'done' | 'cancelled';

export interface Property {
    id: string;
    name: string;
    type: string;
    address: string;
    purchaseDate: string;
    purchasePrice: number;
    ownershipStatus: PropertyStatus;
    note: string;
}

export interface Unit {
    id: string;
    propertyId: string;
    roomNumber: string;
    layout: string;
    floorArea: number;
    rentAmount: number;
    commonFee: number;
    status: UnitStatus;
    vacantSince?: string;
    contractEndDate?: string;
    note?: string;
}

export interface Income {
    id: string;
    propertyId: string;
    unitId?: string;
    incomeDate: string;
    targetMonth: string;
    category: string;
    amount: number;
    memo?: string;
}

export interface Expense {
    id: string;
    propertyId: string;
    unitId?: string;
    expenseDate: string;
    targetMonth: string;
    category: string;
    amount: number;
    vendor?: string;
    memo?: string;
}

export interface RepairRecord {
    id: string;
    propertyId: string;
    unitId?: string;
    occurredOn?: string;
    repairedOn?: string;
    repairCategory: string;
    description: string;
    cost?: number;
    status: RepairStatus;
    memo?: string;
}

export interface Task {
    id: string;
    propertyId: string;
    unitId?: string;
    taskType: string;
    title: string;
    dueDate?: string;
    priority: TaskPriority;
    status: TaskStatus;
    memo?: string;
}

export interface PortfolioData {
    properties: Property[];
    units: Unit[];
    incomes: Income[];
    expenses: Expense[];
    repairs: RepairRecord[];
    tasks: Task[];
}

export interface AttentionItem {
    id: string;
    type: string;
    propertyId: string;
    propertyName: string;
    roomNumber: string;
    dueLabel: string;
    status: string;
    priority: TaskPriority;
    title: string;
}

export interface PropertySummary {
    propertyId: string;
    propertyName: string;
    propertyType: string;
    address: string;
    totalUnits: number;
    vacantUnits: number;
    occupancyRate: number;
    monthlyIncome: number;
    monthlyExpense: number;
    monthlyBalance: number;
    attentionCount: number;
    note: string;
}

export interface DashboardSnapshot {
    targetMonth: string;
    totalProperties: number;
    totalUnits: number;
    vacantUnits: number;
    totalIncome: number;
    totalExpense: number;
    cashflow: number;
    attentionCount: number;
    attentionItems: AttentionItem[];
    propertySummaries: PropertySummary[];
    monthlyIncomes: Income[];
    monthlyExpenses: Expense[];
    repairs: RepairRecord[];
    units: Array<Unit & {propertyName: string}>;
}

export const DEFAULT_TARGET_MONTH = '2026-05';
export const DEFAULT_REFERENCE_DATE = '2026-05-22';

const priorityWeight: Record<TaskPriority, number> = {
    high: 0,
    medium: 1,
    low: 2,
};

const emptyUnitStatuses = new Set<UnitStatus>(['vacant', 'recruiting']);

export const samplePortfolio: PortfolioData = {
    properties: [
        {
            id: 'prop-1',
            name: 'サンライズマンション',
            type: '区分マンション',
            address: '東京都新宿区西新宿1-10-1',
            purchaseDate: '2022-03-15',
            purchasePrice: 28500000,
            ownershipStatus: 'active',
            note: '駅徒歩5分。更新月の部屋があり、募集条件の見直し候補あり。',
        },
        {
            id: 'prop-2',
            name: 'グリーンヒルズ柏',
            type: '一棟アパート',
            address: '千葉県柏市末広町2-8',
            purchaseDate: '2021-11-20',
            purchasePrice: 64200000,
            ownershipStatus: 'active',
            note: '全室稼働中。共用部の軽微修繕を継続監視。',
        },
        {
            id: 'prop-3',
            name: 'ベイサイドテラス横浜',
            type: '一棟アパート',
            address: '神奈川県横浜市中区海岸通3-4',
            purchaseDate: '2024-02-01',
            purchasePrice: 51800000,
            ownershipStatus: 'active',
            note: '修繕計画と賃料改定の候補がある新規取得物件。',
        },
    ],
    units: [
        {
            id: 'unit-1',
            propertyId: 'prop-1',
            roomNumber: '101',
            layout: '1K',
            floorArea: 25.1,
            rentAmount: 82000,
            commonFee: 5000,
            status: 'occupied',
            contractEndDate: '2026-06-30',
        },
        {
            id: 'unit-2',
            propertyId: 'prop-1',
            roomNumber: '102',
            layout: '1K',
            floorArea: 24.8,
            rentAmount: 79000,
            commonFee: 5000,
            status: 'vacant',
            vacantSince: '2026-04-10',
            note: '内見数が少ないため募集条件再確認',
        },
        {
            id: 'unit-3',
            propertyId: 'prop-2',
            roomNumber: '201',
            layout: '2DK',
            floorArea: 41.3,
            rentAmount: 94000,
            commonFee: 6000,
            status: 'occupied',
            contractEndDate: '2027-03-31',
        },
        {
            id: 'unit-4',
            propertyId: 'prop-2',
            roomNumber: '202',
            layout: '2DK',
            floorArea: 41.3,
            rentAmount: 94000,
            commonFee: 6000,
            status: 'occupied',
            contractEndDate: '2026-07-15',
        },
        {
            id: 'unit-5',
            propertyId: 'prop-3',
            roomNumber: '301',
            layout: '1LDK',
            floorArea: 36.5,
            rentAmount: 118000,
            commonFee: 8000,
            status: 'occupied',
            contractEndDate: '2026-12-31',
        },
        {
            id: 'unit-6',
            propertyId: 'prop-3',
            roomNumber: '302',
            layout: '1LDK',
            floorArea: 36.5,
            rentAmount: 115000,
            commonFee: 8000,
            status: 'recruiting',
            vacantSince: '2026-05-05',
            note: '原状回復完了、募集開始済み',
        },
    ],
    incomes: [
        {id: 'inc-1', propertyId: 'prop-1', unitId: 'unit-1', incomeDate: '2026-05-05', targetMonth: '2026-05', category: 'rent', amount: 82000},
        {id: 'inc-2', propertyId: 'prop-1', unitId: 'unit-1', incomeDate: '2026-05-05', targetMonth: '2026-05', category: 'common_fee', amount: 5000},
        {id: 'inc-3', propertyId: 'prop-2', unitId: 'unit-3', incomeDate: '2026-05-04', targetMonth: '2026-05', category: 'rent', amount: 94000},
        {id: 'inc-4', propertyId: 'prop-2', unitId: 'unit-3', incomeDate: '2026-05-04', targetMonth: '2026-05', category: 'common_fee', amount: 6000},
        {id: 'inc-5', propertyId: 'prop-2', unitId: 'unit-4', incomeDate: '2026-05-04', targetMonth: '2026-05', category: 'rent', amount: 94000},
        {id: 'inc-6', propertyId: 'prop-2', unitId: 'unit-4', incomeDate: '2026-05-04', targetMonth: '2026-05', category: 'common_fee', amount: 6000},
        {id: 'inc-7', propertyId: 'prop-3', unitId: 'unit-5', incomeDate: '2026-05-06', targetMonth: '2026-05', category: 'rent', amount: 118000},
        {id: 'inc-8', propertyId: 'prop-3', unitId: 'unit-5', incomeDate: '2026-05-06', targetMonth: '2026-05', category: 'common_fee', amount: 8000},
        {id: 'inc-9', propertyId: 'prop-3', incomeDate: '2026-05-11', targetMonth: '2026-05', category: 'parking', amount: 12000, memo: '月極駐車場'},
    ],
    expenses: [
        {id: 'exp-1', propertyId: 'prop-1', expenseDate: '2026-05-10', targetMonth: '2026-05', category: 'management_fee', amount: 18000, vendor: '管理会社A'},
        {id: 'exp-2', propertyId: 'prop-1', expenseDate: '2026-05-18', targetMonth: '2026-05', category: 'cleaning', amount: 22000, vendor: '清掃会社B'},
        {id: 'exp-3', propertyId: 'prop-2', expenseDate: '2026-05-12', targetMonth: '2026-05', category: 'management_fee', amount: 26000, vendor: '管理会社A'},
        {id: 'exp-4', propertyId: 'prop-2', expenseDate: '2026-05-20', targetMonth: '2026-05', category: 'repair_cost', amount: 15000, vendor: '設備会社C'},
        {id: 'exp-5', propertyId: 'prop-3', expenseDate: '2026-05-15', targetMonth: '2026-05', category: 'utility_cost', amount: 9000, vendor: '電力会社D'},
        {id: 'exp-6', propertyId: 'prop-3', expenseDate: '2026-05-21', targetMonth: '2026-05', category: 'insurance', amount: 12000, vendor: '保険会社E'},
    ],
    repairs: [
        {
            id: 'rep-1',
            propertyId: 'prop-1',
            unitId: 'unit-2',
            occurredOn: '2026-04-12',
            repairCategory: '原状回復',
            description: '退去後クリーニングとクロス補修',
            cost: 88000,
            status: 'in_progress',
            memo: '見積もり確定済み',
        },
        {
            id: 'rep-2',
            propertyId: 'prop-2',
            occurredOn: '2026-05-01',
            repairedOn: '2026-05-09',
            repairCategory: '共用灯交換',
            description: '共用部照明をLEDへ交換',
            cost: 15000,
            status: 'completed',
        },
        {
            id: 'rep-3',
            propertyId: 'prop-3',
            occurredOn: '2026-05-08',
            repairCategory: '給湯器点検',
            description: '給湯器の異音確認と部品交換待ち',
            cost: 42000,
            status: 'planned',
            memo: '部材入荷待ち',
        },
    ],
    tasks: [
        {
            id: 'task-1',
            propertyId: 'prop-1',
            unitId: 'unit-2',
            taskType: 'vacancy_followup',
            title: '102号室の募集条件を見直す',
            dueDate: '2026-05-27',
            priority: 'high',
            status: 'open',
            memo: '写真差し替えとAD条件再確認',
        },
        {
            id: 'task-2',
            propertyId: 'prop-2',
            unitId: 'unit-4',
            taskType: 'contract_renewal',
            title: '202号室の更新打診',
            dueDate: '2026-06-10',
            priority: 'medium',
            status: 'in_progress',
        },
        {
            id: 'task-3',
            propertyId: 'prop-3',
            taskType: 'repair_followup',
            title: '給湯器点検の見積承認',
            dueDate: '2026-05-30',
            priority: 'medium',
            status: 'open',
        },
    ],
};

const jpyCurrencyFormatter = new Intl.NumberFormat('ja-JP', {
    style: 'currency',
    currency: 'JPY',
    maximumFractionDigits: 0,
});

export function formatCurrency(amount: number): string {
    return jpyCurrencyFormatter.format(amount);
}

export function formatPercentage(value: number): string {
    return `${value.toFixed(1)}%`;
}

export function formatMonthLabel(targetMonth: string): string {
    const [year, month] = targetMonth.split('-');
    return `${year}年${month}月`;
}

export function formatDateLabel(date?: string): string {
    if (!date) {
        return '未設定';
    }

    const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(date);
    if (match) {
        return `${match[1]}/${match[2]}/${match[3]}`;
    }

    return date;
}

export function getStatusLabel(status: PropertyStatus | UnitStatus | RepairStatus | TaskStatus): string {
    const labels: Record<string, string> = {
        active: '運用中',
        sold: '売却済み',
        paused: '一時停止',
        occupied: '入居中',
        vacant: '空室',
        recruiting: '募集中',
        unavailable: '募集停止',
        planned: '未着手',
        in_progress: '対応中',
        completed: '完了',
        cancelled: '取消',
        open: '未対応',
        done: '完了',
    };

    return labels[status] ?? status;
}

export function getPriorityLabel(priority: TaskPriority): string {
    const labels: Record<TaskPriority, string> = {
        high: '高',
        medium: '中',
        low: '低',
    };

    return labels[priority];
}

function sumAmounts<T extends {amount: number}>(items: T[]): number {
    return items.reduce((total, item) => total + item.amount, 0);
}

function getDayDiff(from: Date, to: Date): number {
    const milliseconds = 1000 * 60 * 60 * 24;
    return Math.floor((to.getTime() - from.getTime()) / milliseconds);
}

export function buildDashboardSnapshot(
    data: PortfolioData,
    targetMonth: string,
    referenceDate = DEFAULT_REFERENCE_DATE,
): DashboardSnapshot {
    const reference = new Date(referenceDate);
    const propertyMap = new Map(data.properties.map((property) => [property.id, property]));
    const unitMap = new Map(data.units.map((unit) => [unit.id, unit]));
    const monthlyIncomes = data.incomes.filter((income) => income.targetMonth === targetMonth);
    const monthlyExpenses = data.expenses.filter((expense) => expense.targetMonth === targetMonth);

    const attentionItems: AttentionItem[] = [
        ...data.tasks
            .filter((task) => task.status === 'open' || task.status === 'in_progress')
            .map((task) => {
                const property = propertyMap.get(task.propertyId);
                const unit = task.unitId ? unitMap.get(task.unitId) : undefined;

                return {
                    id: task.id,
                    type: task.taskType,
                    propertyId: task.propertyId,
                    propertyName: property?.name ?? '未設定物件',
                    roomNumber: unit?.roomNumber ?? '-',
                    dueLabel: formatDateLabel(task.dueDate),
                    status: getStatusLabel(task.status),
                    priority: task.priority,
                    title: task.title,
                };
            }),
        ...data.units
            .filter((unit) => unit.status === 'vacant' && unit.vacantSince)
            .filter((unit) => getDayDiff(new Date(unit.vacantSince!), reference) >= 30)
            .map((unit) => ({
                id: `alert-vacant-${unit.id}`,
                type: 'vacancy_followup',
                propertyId: unit.propertyId,
                propertyName: propertyMap.get(unit.propertyId)?.name ?? '未設定物件',
                roomNumber: unit.roomNumber,
                dueLabel: `空室${getDayDiff(new Date(unit.vacantSince!), reference)}日`,
                status: getStatusLabel(unit.status),
                priority: 'high' as const,
                title: '空室長期化フォロー',
            })),
        ...data.units
            .filter((unit) => unit.contractEndDate)
            .filter((unit) => {
                const daysUntilEnd = getDayDiff(reference, new Date(unit.contractEndDate!));
                return daysUntilEnd >= 0 && daysUntilEnd <= 60;
            })
            .map((unit) => ({
                id: `alert-contract-${unit.id}`,
                type: 'contract_renewal',
                propertyId: unit.propertyId,
                propertyName: propertyMap.get(unit.propertyId)?.name ?? '未設定物件',
                roomNumber: unit.roomNumber,
                dueLabel: formatDateLabel(unit.contractEndDate),
                status: '更新確認',
                priority: 'medium' as const,
                title: '契約終了が近い部屋',
            })),
        ...data.repairs
            .filter((repair) => repair.status === 'planned' || repair.status === 'in_progress')
            .map((repair) => ({
                id: `alert-repair-${repair.id}`,
                type: 'repair_followup',
                propertyId: repair.propertyId,
                propertyName: propertyMap.get(repair.propertyId)?.name ?? '未設定物件',
                roomNumber: repair.unitId ? unitMap.get(repair.unitId)?.roomNumber ?? '-' : '-',
                dueLabel: formatDateLabel(repair.repairedOn ?? repair.occurredOn),
                status: getStatusLabel(repair.status),
                priority: repair.status === 'in_progress' ? 'high' as const : 'medium' as const,
                title: repair.description,
            })),
    ].sort((left, right) => {
        const priorityComparison = priorityWeight[left.priority] - priorityWeight[right.priority];
        if (priorityComparison !== 0) {
            return priorityComparison;
        }
        return left.propertyName.localeCompare(right.propertyName, 'ja');
    });

    const propertySummaries = data.properties.map((property) => {
        const units = data.units.filter((unit) => unit.propertyId === property.id);
        const incomes = monthlyIncomes.filter((income) => income.propertyId === property.id);
        const expenses = monthlyExpenses.filter((expense) => expense.propertyId === property.id);
        const totalUnits = units.length;
        const vacantUnits = units.filter((unit) => emptyUnitStatuses.has(unit.status)).length;
        const occupiedUnits = units.filter((unit) => unit.status === 'occupied').length;

        return {
            propertyId: property.id,
            propertyName: property.name,
            propertyType: property.type,
            address: property.address,
            totalUnits,
            vacantUnits,
            occupancyRate: totalUnits === 0 ? 0 : (occupiedUnits / totalUnits) * 100,
            monthlyIncome: sumAmounts(incomes),
            monthlyExpense: sumAmounts(expenses),
            monthlyBalance: sumAmounts(incomes) - sumAmounts(expenses),
            attentionCount: attentionItems.filter((item) => item.propertyId === property.id).length,
            note: property.note,
        };
    });

    return {
        targetMonth,
        totalProperties: data.properties.length,
        totalUnits: data.units.length,
        vacantUnits: data.units.filter((unit) => emptyUnitStatuses.has(unit.status)).length,
        totalIncome: sumAmounts(monthlyIncomes),
        totalExpense: sumAmounts(monthlyExpenses),
        cashflow: sumAmounts(monthlyIncomes) - sumAmounts(monthlyExpenses),
        attentionCount: attentionItems.length,
        attentionItems,
        propertySummaries,
        monthlyIncomes,
        monthlyExpenses,
        repairs: data.repairs,
        units: data.units.map((unit) => ({
            ...unit,
            propertyName: propertyMap.get(unit.propertyId)?.name ?? '未設定物件',
        })),
    };
}
