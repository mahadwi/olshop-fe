import './highlight-title.scoped.scss'

export default function HighlightTitleComponent(props) {
    return (
        <div style={{ background: props.background }}>
            <h2>{props.title}</h2>
        </div>
    )
}