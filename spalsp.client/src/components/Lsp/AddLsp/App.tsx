import React, { FC, useState, useCallback } from 'react';
import {
    DndContext,
    closestCenter,
    MouseSensor,
    TouchSensor,
    DragOverlay,
    useSensor,
    useSensors,
    DragStartEvent,
    DragEndEvent,
    UniqueIdentifier,
} from '@dnd-kit/core';
import { arrayMove, SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import Grid from './Grid';
import SortableItem from './SortableItem';
import Item from './Item';
import { Input } from './Input/Input';
import { Box } from '@chakra-ui/react';

const App: FC = () => {
    const [items, setItems] = useState([
      { id: 1, title: "NP" },
      { id: 2, title: "such as" },
      { id: 3, title: "NP" },
    ]);
    const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
    const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

    const handleDragStart = useCallback((event: DragStartEvent) => {
        setActiveId(event.active.id);
    }, []);
    const handleDragEnd = useCallback((event: DragEndEvent) => {
        const { active, over } = event;
        console.log(active, over);

        if (active.id !== over?.id) {
            setItems((items) => {
                const oldIndex = items.indexOf(items.find((item) =>item.id===active.id) ?? {id: -1, title: ''});
                const newIndex = items.indexOf(items.find((item) =>item.id===over!.id) ?? {id: -1, title: ''});

                return arrayMove(items, oldIndex, newIndex);
            });
        }
        setActiveId(null);
    }, []);

    const handleDragCancel = useCallback(() => {
        setActiveId(null);
    }, []);

    const addTask = (title: any) => {
      setItems((items) => [...items, { id: items.length + 1, title }]);
    };

    console.log(activeId);
    return (
      <Box marginTop={'20px'}>
        {false&&(<Box ><Input onSubmit={addTask}/></Box>)}
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragCancel={handleDragCancel}
        >
            <SortableContext items={items} strategy={rectSortingStrategy}>
                <Grid columns={30}>
                    {items.map((item) => (
                        <SortableItem key={item.id} id={item.id.toString()} title={item.title}/>
                    ))}
                </Grid>
            </SortableContext>
            <DragOverlay adjustScale style={{ transformOrigin: '0 0 ' }}>
                {activeId ? <Item  title={items.find((item) =>item.id===activeId)?.title ?? ''} isDragging /> : null}
            </DragOverlay>
        </DndContext>
      </Box>
    );
};

export default App;
