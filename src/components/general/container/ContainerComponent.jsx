import './Container.scoped.scss'

export default function ContainerComponent({ children }) {
    return (
        <div className='olshop-container'>
            {children}
        </div>
    )
}