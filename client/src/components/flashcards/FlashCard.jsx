export default function FlashCard({card}){
    return(
        <div
            style={{
                border:"1px solid #999",
                padding:"12px",
                marginBottom:"10px",
            }}>
                <strong>Q:</strong> {card.question}
                <br />
                <strong>A:</strong> {card.answer}
            </div>
    )
}