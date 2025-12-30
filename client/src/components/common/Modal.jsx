import "./modal.css"

export default function Modal({
    title,
    children,
    onClose,
    footer,
}){
    return(
        <div className="modal-backdrop" onClick={onClose}>
            <div
                className="modal-card"
                onClick={(e)=>e.stopPropagation()}
            >
                {title && (
                    <div className="modal-header">
                        <h3>{title}</h3>
                        <button className="modal-close" onClick={onClose}>
                            x
                        </button>
                    </div>
                )}

                <div className="modal-body">
                    {children}
                </div>

                {footer && (
                    <div className="modal-footer">
                        {footer}
                    </div>
                )}
            </div>
        </div>
    )
}