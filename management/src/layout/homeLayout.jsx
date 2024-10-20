import React, { useState, useEffect, useRef } from 'react';
import SideNav from '../components/sideNav.jsx';
import { Outlet } from 'react-router-dom';

function useElementSize() {
    const ref = useRef(null);
    const [size, setSize] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const observeTarget = ref.current;
        const resizeObserver = new ResizeObserver((entries) => {
            entries.forEach(entry => {
                setSize({
                    width: entry.contentRect.width,
                    height: entry.contentRect.height
                });
            });
        });

        if (observeTarget) {
            resizeObserver.observe(observeTarget);
        }

        return () => {
            if (observeTarget) {
                resizeObserver.unobserve(observeTarget);
            }
        };
    }, []);

    return [ref, size];
}

function HomeLayout() {
    const [ref, size] = useElementSize(); 

    return (
        <div className='flex flex-row flex-1 w-full h-full'>

            <div ref={ref} className='sideLayout fixed top-0 left-0 overflow-hidden w-[180px] z-10 h-full'>
                <SideNav />
            </div>

            <div className='w-full h-full bg-slate-400' style={{ marginLeft: `${size.width}px` }}>
                <Outlet />
            </div>
        </div>
    );
}

export default HomeLayout;
