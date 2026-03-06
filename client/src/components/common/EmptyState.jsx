import './emptyState.css'

export default function EmptyState({
    icon,
    title,
    description,
    actionText,
    onAction
}){
    return(
        <div className='empty-state'>

            {icon && (
                <div className="empty-icon">
                    {icon}
                </div>
            )}
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