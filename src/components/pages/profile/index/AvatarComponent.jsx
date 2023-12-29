import './avatar.scoped.scss';
import NoPhotoImage from './../../../../images/icons/no-photo.png'

export default function AvatarComponent({ user }) {
    return (
        <div className='profile-avatar'>
            <img src={NoPhotoImage} alt={user.name} />
            <span>{user.name}</span>
        </div>
    )
}
