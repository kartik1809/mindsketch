"use client";
import { NewButton } from './new-button';
import { OrgList } from './list';


const Sidebar = () => {
    return (
        <aside className='fixed text-white h-full w-[60px] bg-blue-950 left-0 flex p-3 flex-col gap-y-4'>
            <OrgList />
            <NewButton />
        </aside>
    );
}

export default Sidebar;