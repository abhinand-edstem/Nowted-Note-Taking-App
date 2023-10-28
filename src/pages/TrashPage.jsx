import { useLocation } from 'react-router-dom';

const TrashPage = () => {
    const location = useLocation();
    return (
        <div className='full_view'>
            <h1>{location?.state?.trashDatas?.title}</h1>
            <p>{location?.state?.trashDatas?.text}</p>F
        </div>
    )
}

export default TrashPage