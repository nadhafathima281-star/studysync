import './emptyState.css'

export default function EmptyState({
    title,
    description,
    actionText,
    onAction
}){
    return(
        <div className='empty-state'>
            <h3 className='empty-title'>{title}</h3>

            
            {description && (
                <p className='empty-description'>{description}</p>
            )}

            {actionText && (
                <button className='empty-action' onClick={onAction}>{actionText}</button>
            )}
        </div>
    )
}