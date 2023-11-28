import './screen-container.scoped.scss'

export default function ScreenContainerComponent({ children }) {
    return (
        <div className="screen-container">
            {children}
        </div>
    )
}