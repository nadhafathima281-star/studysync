const Flashcard=require("../models/Flashcard")
const FlashcardDeck=require("../models/FlashcardDeck")

// DECK CONTROLLERS

// create a new flashcard deck
// route:POST /api/flashcards/decks
exports.createDeck=async(req,res)=>{
    try{
        const{title,description}=req.body;
        // extract deck in db
        const deck=await FlashcardDeck.create({
            title,
            description,
            user:req.user.id, //user id comes from auth middleware
        });

        // send created deck as response
        res.status(201).json(deck);
    }catch(error){
        res.status(500).json({message:"Failed to create deck"});
    }
};

// get all decks created by the logged-in user
// route:GET /api/flashcards/decks
exports.getDecks=async(req,res)=>{
    try{
        // find decks belonging to the user
        const decks=await FlashcardDeck.find({user:req.user.id})
        .sort({createdAt:-1}); //latest decks first

        res.json(decks);
    }catch(error){
        res.status(500).json({message:'Failed to fetch decks'});
    }
};

// delete a deck and all  flashcards inside it
// route: DELETE /api/flashcards/decks/:id
exports.deleteDeck=async(req,res)=>{
    try{
        // find and delete deck only if it belongs to user
        const deck=await FlashcardDeck.findOneAndDelete({
            _id:req.params.id,
            user:req.user.id,
        });

        // if deck not found ,return error
        if(!deck){
            return res.status(404).json({message:"Deck not found"});
        }

        // delete all flashcards linked to this deck
        await Flashcard.deleteMany({deck:deck._id});

        res.json({message:"Deck and flashcards deleted successfully"});
    }catch(error){
        res.status(500).json({message:"Failed to delete deck"});
    }
};


// FLASHCARD CONTROLLERS

// create a new flashcard inside a deck
// route: POST /api/flashcards
exports.createCard=async(req,res)=>{
    try{
        // extract card data from current body
        const{question,answer,deckId}=req.body;

        // create a flashcard in db
        const card=await Flashcard.create({
            question,
            answer,
            deck:deckId,
            user:req.user.id, //ensures ownership
        });

        res.status(201).json(card);
    }catch(error){
        res.status(500).json({message:"Failed to create flashcard"});
    }
};

// get all flashcards of a specific deck
// route: GET /api/flashcards/deck/:deckId
exports.getCardsByDeck=async(req,res)=>{
    try{
        // find cards by deck id and user id
        const cards=await Flashcard.find({
            deck:req.params.deckId,
            user:req.user.id,
        }).sort({createdAt:-1});

        res.json(cards);
    }catch(error){
        res.status(500).json({message:"Failed to fetch flashcards"});
    }
};

// update a flashcard (edit question or answer)
// route : PUT /api/flashcards/:id
exports.updateCard=async(req,res)=>{
    try{
        const{question,answer}=req.body;

        // finf flashcard and update only id=f owned by user
        const card=await Flashcard.findOneAndUpdate(
            {_id:req.params.id, user:req.user.id},
            {question,answer},
            // {new:true} return updated document
        );

        if(!card){
            return res.status(404).json({message:"Flashcard not found"});
        }

        res.json(card);
    }catch(error){
        res.status(500).json({message:"Failed to update flashcard"});
    }
};

// delete a flashcard
// route : DELETE /api/flashcards/:id
exports.deleteCard=async(req,res)=>{
    try{
        // find and delete card only id it belongs to user
        const card=await Flashcard.findOneAndDelete({
            _id:req.params.id,
            user:req.user.id,
        });

        if(!card){
            return res.status(404).json({message:"Flashcard not found"});
        }

        res.json({message:"Flashcard deleted successfully"});
    }catch(error){
        res.status(500).json({message:"Failed to delete flashcard"});
    }
};



