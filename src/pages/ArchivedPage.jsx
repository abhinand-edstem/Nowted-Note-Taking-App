import { useLocation } from 'react-router-dom';

const ArchivedPage = () => {
    const location = useLocation();
    return (
        <div className='full_view'>
            <h1>{location?.state?.archivedData?.title}</h1>
            <p>{location?.state?.archivedData?.text}</p>
        </div>
    )
}

export default ArchivedPage