import React from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import './Sidebar.scss';
import {useDispatch, useSelector} from "react-redux";
import {setSortBy} from "../../features/UsersSlice";
import {RootState} from "../../store/store";

const Sidebar: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const storeSortBy = useSelector((state: RootState) => state.users.sortBy);

    const isHomePage = location.pathname === '/';

    const handleGoHome = () => {
        navigate('/');
    };

    const handleSetSortBy = (sortBy: string) => {
        if (storeSortBy === sortBy) {
            dispatch(setSortBy(null));
        } else {
            dispatch(setSortBy(sortBy));
        }
    };

    return (
        <div className="sidebar">
            {isHomePage ? (
                <div className="sort">
                    <div className="sortTitle">Сортировка</div>
                    <div className="sortButtons">
                        <button className={`sidebarButton ${storeSortBy === 'city' && 'active'}`}
                                onClick={() => handleSetSortBy('city')}>
                            по городу
                        </button>
                        <button className={`sidebarButton ${storeSortBy === 'company' && 'active'}`}
                                onClick={() => handleSetSortBy('company')}>
                            по компании
                        </button>
                    </div>
                </div>
            ) : (
                <button className="sidebarButton" onClick={handleGoHome}>На главную</button>
            )}
        </div>
    );
};

export default Sidebar;
