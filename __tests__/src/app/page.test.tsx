import React from 'react';
import {render, screen, waitFor} from '@testing-library/react';
import Home from '../../../src/app/page';

describe('Home', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        (global.fetch as jest.Mock).mockResolvedValue({
            ok: true,
            json: async () => ({message: 'Hello, world.'}),
        });
    });

    it('リポジトリ名が表示される', async () => {
        render(<Home/>);

        expect(screen.getByRole('heading', {name: 'property-management-next-js-app'})).toBeInTheDocument();

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledWith('/api/message');
        });
    });
});
