import React from 'react';
import {User} from "../../types/types";
import {useNavigate} from 'react-router-dom';
import './UserSnippet.scss';

interface UserCardProps {
    user: User;
}

const UserSnippet: React.FC<UserCardProps> = ({user}) => {
    const navigate = useNavigate();

    const handleProfileClick = () => {
        navigate(`/user/${user.id}`);
    };

    return (
        <div className="card">
            <div className="info">
                <div className="infoItem">
                    <span className="label">ФИО:</span>
                    <span className="value">{user.name}</span>
                </div>
                <div className="infoItem">
                    <span className="label">город:</span>
                    <span className="value">{user.address.city}</span>
                </div>
                <div className="infoItem">
                    <span className="label">компания:</span>
                    <span className="value">{user.company.name}</span>
                </div>
            </div>
            <button className="button" onClick={handleProfileClick}>Подробнее</button>
        </div>
    );
};

export default UserSnippet;
