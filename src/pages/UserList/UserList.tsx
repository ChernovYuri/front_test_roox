import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchUsersAsync} from '../../features/UsersSlice';
import {AppDispatch, RootState} from '../../store/store';
import UserSnippet from "../../components/userSnippet/UserSnippet";
import './UserList.scss';

const UserList: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {users, loading, error, sortBy} = useSelector((state: RootState) => state.users);

    useEffect(() => {
        if (!users.length) {
            dispatch(fetchUsersAsync());
        }
    }, [dispatch]);

    // Сортировка массива пользователей
    const sortedUsers = [...users].sort((a, b) => {
        if (sortBy === 'city') {
            return a.address.city.localeCompare(b.address.city);
        } else if (sortBy === 'company') {
            return a.company.name.localeCompare(b.company.name);
        }
        return 0;
    });

    if (loading) return <div>Загрузка...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <div className='header'>Список пользователей</div>
            {sortedUsers.map((user) => (
                <UserSnippet key={user.id} user={user}/>
            ))}
            {sortedUsers.length > 0 && (
                <div className='footer'>
                    Найдено {sortedUsers.length} пользователей
                </div>
            )}
        </div>
    );
};
export default UserList;


