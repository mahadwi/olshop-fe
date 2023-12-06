import './highlight-title.scoped.scss'

export default function HighlightTitleComponent({ background, title }) {
    return (
        <div style={{ background: background }}>
            <h2>{title}</h2>
        </div>
    )
}