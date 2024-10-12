import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store/store";
import {User} from "../../types/types";
import './UserProfileForm.scss';
import {fetchUsersAsync, updateUser} from "../../features/UsersSlice";

interface UserProfileFormProps {
    isEditorMode: boolean;
}

const UserProfileForm: React.FC<UserProfileFormProps> = ({isEditorMode}) => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const {userId} = useParams<{ userId: string }>();

    const users = useSelector((state: RootState) => state.users.users);
    const user = users.find((user: User) => user.id.toString() === userId);

    const [initialData, setInitialData] = useState({
        name: '',
        username: '',
        email: '',
        street: '',
        city: '',
        zipcode: '',
        phone: '',
        website: '',
        comment: ''
    });

    const [formData, setFormData] = useState(initialData);

    useEffect(() => {
        if (user) {
            const userData = {
                name: user.name,
                username: user.username,
                email: user.email,
                street: user.address.street,
                city: user.address.city,
                zipcode: user.address.zipcode,
                phone: user.phone,
                website: user.website,
                comment: user.comment
            };
            setInitialData(userData);
            setFormData(userData);
        }
    }, [user]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const [errors, setErrors] = useState<{ [key: string]: boolean }>({});

    const validateForm = () => {
        const newErrors: { [key: string]: boolean } = {};
        if (!formData.name) newErrors.name = true;
        if (!formData.username) newErrors.username = true;
        if (!formData.email) newErrors.email = true;
        if (!formData.street) newErrors.street = true;
        if (!formData.city) newErrors.city = true;
        if (!formData.zipcode) newErrors.zipcode = true;
        if (!formData.phone) newErrors.phone = true;
        if (!formData.website) newErrors.website = true;

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const isValid = validateForm();
        if (isValid) {
            const updatedUser: User = {
                ...user!,
                name: formData.name,
                username: formData.username,
                email: formData.email,
                address: {
                    street: formData.street,
                    city: formData.city,
                    zipcode: formData.zipcode,
                },
                phone: formData.phone,
                website: formData.website,
                comment: formData.comment
            };

            dispatch(updateUser(updatedUser));
            navigate('/');
        }
    };

    // Возвращение формы к исходным значениям при отмене редактирования
    useEffect(() => {
        if (!isEditorMode) {
            setFormData(initialData);
            setErrors({})
        }
    }, [isEditorMode, initialData]);

    useEffect(() => {
        if (!user) {
            dispatch(fetchUsersAsync());
        }
    }, []);

    if (!user) {
        return <div>Загрузка...</div>;
    }

    return (
        <div className="userProfileForm">
            <div className="form">
                <form>
                    <div className="formItem">
                        <label className="label">Name</label>
                        <input
                            className={`input ${isEditorMode ? 'editable' : 'readOnly'} ${errors.name ? 'error' : ''}`}
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            readOnly={!isEditorMode}
                        />
                    </div>
                    <div className="formItem">
                        <label className="label">User name</label>
                        <input
                            className={`input ${isEditorMode ? 'editable' : 'readOnly'} ${errors.username ? 'error' : ''}`}
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            readOnly={!isEditorMode}
                        />
                    </div>
                    <div className="formItem">
                        <label className="label">E-mail</label>
                        <input
                            className={`input ${isEditorMode ? 'editable' : 'readOnly'} ${errors.email ? 'error' : ''}`}
                            type="text"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            readOnly={!isEditorMode}
                        />
                    </div>
                    <div className="formItem">
                        <label className="label">Street</label>
                        <input
                            className={`input ${isEditorMode ? 'editable' : 'readOnly'} ${errors.street ? 'error' : ''}`}
                            type="text"
                            name="street"
                            value={formData.street}
                            onChange={handleInputChange}
                            readOnly={!isEditorMode}
                        />
                    </div>
                    <div className="formItem">
                        <label className="label">City</label>
                        <input
                            className={`input ${isEditorMode ? 'editable' : 'readOnly'} ${errors.city ? 'error' : ''}`}
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            readOnly={!isEditorMode}
                        />
                    </div>
                    <div className="formItem">
                        <label className="label">Zip code</label>
                        <input
                            className={`input ${isEditorMode ? 'editable' : 'readOnly'} ${errors.zipcode ? 'error' : ''}`}
                            type="text"
                            name="zipcode"
                            value={formData.zipcode}
                            onChange={handleInputChange}
                            readOnly={!isEditorMode}
                        />
                    </div>
                    <div className="formItem">
                        <label className="label">Phone</label>
                        <input
                            className={`input ${isEditorMode ? 'editable' : 'readOnly'} ${errors.phone ? 'error' : ''}`}
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            readOnly={!isEditorMode}
                        />
                    </div>
                    <div className="formItem">
                        <label className="label">Website</label>
                        <input
                            className={`input ${isEditorMode ? 'editable' : 'readOnly'} ${errors.website ? 'error' : ''}`}
                            type="text"
                            name="website"
                            value={formData.website}
                            onChange={handleInputChange}
                            readOnly={!isEditorMode}
                        />
                    </div>
                    <div className="formItem">
                        <label className="label">Comment</label>
                        <textarea
                            className={`textArea ${isEditorMode ? 'editable' : 'readOnly'}`}
                            name="comment"
                            value={formData.comment}
                            onChange={handleInputChange}
                            readOnly={!isEditorMode}
                        />
                    </div>
                </form>
            </div>
            <div className="profileFormFooter">
                <button className={`button ${isEditorMode ? 'active' : 'disabled'}`} onClick={handleSubmit}>Отправить
                </button>
            </div>
        </div>
    );
};

export default UserProfileForm;
