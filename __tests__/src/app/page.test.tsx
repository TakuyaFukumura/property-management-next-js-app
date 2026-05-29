import React from 'react';
import {render, screen} from '@testing-library/react';
import Home from '../../../src/app/page';

describe('Home', () => {
    it('賃貸管理システムの主要セクションが表示される', () => {
        render(<Home/>);

        expect(screen.getByRole('heading', {name: '賃貸管理システム'})).toBeInTheDocument();
        expect(screen.getByRole('heading', {name: '物件一覧・物件詳細サマリー'})).toBeInTheDocument();
        expect(screen.getByRole('heading', {name: '部屋一覧・稼働状況'})).toBeInTheDocument();
        expect(screen.getByRole('heading', {name: '月次収支サマリー'})).toBeInTheDocument();
        expect(screen.getByRole('heading', {name: '修繕履歴'})).toBeInTheDocument();
        expect(screen.getByRole('heading', {name: '要対応一覧'})).toBeInTheDocument();
    });

    it('仕様に沿った主要データが確認できる', () => {
        render(<Home/>);

        expect(screen.getAllByText('サンライズマンション').length).toBeGreaterThan(0);
        expect(screen.getAllByText('グリーンヒルズ柏').length).toBeGreaterThan(0);
        expect(screen.getAllByText('ベイサイドテラス横浜').length).toBeGreaterThan(0);
        expect(screen.getByText('総物件数')).toBeInTheDocument();
        expect(screen.getByText('3棟')).toBeInTheDocument();
        expect(screen.getByText('当月総収入')).toBeInTheDocument();
        expect(screen.getAllByText('要対応件数').length).toBeGreaterThan(0);
    });
});
