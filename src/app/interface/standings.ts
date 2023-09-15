export interface Standings {

    rank: Number,
    team: {
        id: Number,
        name: String,
        logo:String
    },
    points: Number,
    goalsDiff: Number,
  
   
    all: {
        played: Number,
        win: Number,
        draw: Number,
        lose: Number,
       
    },
   
  
   
}

  