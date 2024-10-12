import React, {useState} from 'react';
import UserProfileForm from "../../components/userProfile/UserProfileForm";
import './UserProfile.scss';

const UserProfile: React.FC = () => {
    const [isEditorMode, setIsEditorMode] = useState(false);

    const handleEditClick = () => {
        setIsEditorMode(!isEditorMode);
    };

    return (
        <div className="userProfile">
            <div className="profileHeader">
                <div className="profileHeader__title">Профиль пользователя</div>
                <button className={`button ${isEditorMode ? 'cancel' : 'edit'}`} onClick={handleEditClick}>
                    {isEditorMode ? 'Отмена' : 'Редактировать'}
                </button>
            </div>
            <UserProfileForm isEditorMode={isEditorMode}/>
        </div>
    );
};

export default UserProfile;
