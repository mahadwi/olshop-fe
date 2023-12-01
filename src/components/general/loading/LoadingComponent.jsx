import { BeatLoader } from 'react-spinners';

export default function LoadingComponent({ loading }) {
    const cssOverride = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        zIndex: 999999999
    };

    return (
        <BeatLoader
            color={'#E4A951'}
            loading={loading}
            cssOverride={cssOverride}
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
        />
    )
}