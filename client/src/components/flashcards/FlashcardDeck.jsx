export default function FlashcardDeck({deck,onClick}){
    return(
        <div
            onClick={onClick}
            style={{
                border:"1px solid #ccc",
                padding:"12px",
                marginBottom:"10px",
                cursor:"pointer",
            }}>
                <h3>{deck.title}</h3>
                <p>{deck.description}</p>
        </div>
    )
}