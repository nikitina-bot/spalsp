import React, { FC } from 'react';

type GridProps = {
    children: any;
    columns: number;
};

const Grid: FC<GridProps> = ({ children, columns }) => {
    return (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${columns}, 1fr)`,
                gridGap: 10,
                maxWidth: '900px',
                marginTop: '20px',
            }}
        >
            {children}
        </div>
    );
};

export default Grid;
